import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import type { Relation } from 'typeorm';
import { Customer } from '../../customers/entities/customer.entity.js';
import { OrderItem } from './order-item.entity.js';

// Enum untuk menentukan status pesanan yang tersedia dalam sistem.
export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
}

// Entity Order untuk merepresentasikan tabel orders pada database.
@Entity('orders')
export class Order {
  // Primary key menggunakan UUID sebagai identitas unik setiap pesanan.
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Menyimpan total keseluruhan harga dari produk yang dipesan.
  @Column({ type: 'decimal', precision: 12, scale: 2, default: 0 })
  totalAmount: number;

  // Menyimpan status pesanan dengan nilai awal PENDING.
  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  // Relasi many-to-one, setiap pesanan dimiliki oleh satu pelanggan.
  // Pelanggan tidak dapat dihapus jika masih memiliki pesanan.
  @ManyToOne(() => Customer, (customer) => customer.orders, {
    onDelete: 'RESTRICT',
  })
  @JoinColumn({ name: 'customer_id' })
  customer: Relation<Customer>;

  // Menyimpan ID pelanggan sebagai foreign key pada tabel orders.
  @Column({ name: 'customer_id', type: 'int' })
  customerId: number;   

  // Relasi one-to-many, satu pesanan dapat memiliki banyak detail item produk.
  @OneToMany(() => OrderItem, (item) => item.order)
  items: Relation<OrderItem>[];

  // Mencatat waktu ketika pesanan pertama kali dibuat.
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  // Mencatat waktu terakhir data pesanan diperbarui.
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}