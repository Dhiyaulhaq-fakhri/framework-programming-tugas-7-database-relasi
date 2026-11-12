import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Order, OrderStatus } from './entities/order.entity.js';
import { Customer } from '../customers/entities/customer.entity.js';
import { Product } from '../products/entities/product.entity.js';
import { OrderItem } from './entities/order-item.entity.js';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto.js';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    private readonly dataSource: DataSource,
  ) {}
  
  async create(dto: CreateOrderDto) {
    return this.dataSource.transaction(async (manager) => {
      // 1. validasi customer
      const customer = await manager.findOne(Customer, {
        where: { id: dto.customerId },
      });
      if (!customer) {
        throw new NotFoundException('Pelanggan tidak ditemukan');
      }

      // 2. siapkan order
      const order = manager.create(Order, {
        customerId: customer.id,
        status: OrderStatus.PENDING,
        totalAmount: 0,
      });
      await manager.save(order);

      let totalAmount = 0;

      // 3. loop item — validasi produk & stok, buat OrderItem
      for (const itemDto of dto.items) {
        const product = await manager.findOne(Product, {
          where: { id: itemDto.productId },
          lock: { mode: 'pessimistic_write' }, // cegah race condition
        });

        if (!product) {
          throw new NotFoundException(
            `Barang dengan id ${itemDto.productId} tidak ditemukan`,
          );
        }
        if (product.stock < itemDto.quantity) {
          throw new BadRequestException(
            `Stok ${product.name} tidak mencukupi (tersedia ${product.stock}, diminta ${itemDto.quantity})`,
          );
        }

        const orderItem = manager.create(OrderItem, {
          orderId: order.id,
          productId: product.id,
          quantity: itemDto.quantity,
          priceAtPurchase: product.price,
        });
        await manager.save(orderItem);

        totalAmount += Number(product.price) * itemDto.quantity;

        // kurangi stok
        await manager.decrement(
          Product,
          { id: product.id },
          'stock',
          itemDto.quantity,
        );
      }

      // 4. update total
      order.totalAmount = totalAmount;
      await manager.save(order);

      // 5. return lengkap
      const result = await manager.findOne(Order, {
        where: { id: order.id },
        relations: {
          customer: true,
          items: {
            product: true,
          },
        },
      });

      return {
        message: 'Pesanan berhasil dibuat',
        data: result,
      };
    });
  }


  async findAll() {
    const orders = await this.orderRepo.find({
      relations: {
        customer: true,
        items: {
          product: true,
        },
      },
      order: { createdAt: 'DESC' },
    });
    return { message: 'Data berhasil diambil', data: orders };
  }

  async findOne(id: string) {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: {
        customer: true,
        items: {
          product: true,
        },
      },
    });
    if (!order) {
      throw new NotFoundException('Pesanan tidak ditemukan');
    }
    return {
      message: 'Data berhasil diambil',
      data: order,
    };
  }

  async updateStatus(id: string, dto: UpdateOrderStatusDto) {
    return this.dataSource.transaction(async (manager) => {
      const order = await manager.findOne(Order, {
        where: { id },
        relations: { items: true },
      });
      if (!order) {
        throw new NotFoundException('Pesanan tidak ditemukan');
      }
      if (order.status === OrderStatus.CANCELLED) {
        throw new BadRequestException(
          'Pesanan yang sudah dibatalkan tidak dapat diubah',
        );
      }
      if (dto.status === order.status) {
        throw new BadRequestException(`Status pesanan sudah ${order.status}`);
      }

      if (dto.status === OrderStatus.CANCELLED) {
        for (const item of order.items) {
          await manager.increment(
            Product,
            { id: item.productId },
            'stock',
            item.quantity,
          );
        }
      }

      order.status = dto.status;
      await manager.save(order);

      const result = await manager.findOne(Order, {
        where: { id: order.id },
        relations: {
          customer: true,
          items: {
            product: true,
          },
        },
      });

      return {
        message: `Status pesanan berhasil diubah menjadi ${dto.status}`,
        data: result,
      };
    });
  }

  async remove(id: string) {
    return this.dataSource.transaction(async (manager) => {
      const order = await manager.findOne(Order, {
        where: { id },
        relations: { items: true },
      });
      if (!order) {
        throw new NotFoundException('Pesanan tidak ditemukan');
      }
      if (order.status !== OrderStatus.CANCELLED) {
        throw new BadRequestException(
          'Hanya pesanan berstatus CANCELLED yang dapat dihapus',
        );
      }
      await manager.remove(order);
      return {
        message: 'Pesanan berhasil dihapus',
        data: { id },
      };
    });
  }
}
