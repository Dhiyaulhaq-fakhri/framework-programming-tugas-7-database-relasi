
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from './entities/product.entity.js';
import { Category } from '../categories/entities/category.entity.js';

import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,

    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  // Menambahkan produk
  async create(data: CreateProductDto) {
    const kategori = await this.categoryRepository.findOne({
      where: { id: data.category_id },
    });

    if (!kategori) {
      throw new BadRequestException('Kategori tidak ditemukan');
    }

    const produk = this.productRepository.create({
      ...data,
      category: kategori,
    });

    return this.productRepository.save(produk);
  }

  // Menampilkan semua produk
  async findAll() {
    return this.productRepository.find({
      relations: { category: true },
    });
  }

  // Menampilkan produk berdasarkan ID
  async findOne(id: number) {
    const produk = await this.productRepository.findOne({
      where: { id },
      relations: { category: true },
    });

    if (!produk) {
      throw new NotFoundException('Produk tidak ditemukan');
    }

    return produk;
  }

  // Mengubah produk
  async update(id: number, data: UpdateProductDto) {
    const produk = await this.findOne(id);

    if (data.category_id) {
      const kategori = await this.categoryRepository.findOne({
        where: { id: data.category_id },
      });

      if (!kategori) {
        throw new BadRequestException('Kategori tidak ditemukan');
      }

      produk.category = kategori;
    }

    Object.assign(produk, data);

    return this.productRepository.save(produk);
  }

  // Menghapus produk
  async remove(id: number) {
    const produk = await this.findOne(id);

    await this.productRepository.remove(produk);

    return {
      message: 'Produk berhasil dihapus',
    };
  }
}
