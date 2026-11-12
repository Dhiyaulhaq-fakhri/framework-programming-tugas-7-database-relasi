import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Order } from '../../orders/entities/order.entity.js';

// Entity Customer untuk merepresentasikan tabel customers pada database.
@Entity('customers')
export class Customer {
  // Primary key sebagai identitas unik setiap pelanggan.
  @PrimaryGeneratedColumn()
  id: number;

  // Menyimpan nama pelanggan dengan maksimal 100 karakter.
  @Column({ length: 100 })
  name: string;

  // Menyimpan email pelanggan yang harus unik dan maksimal 150 karakter.
  @Column({ unique: true, length: 150 })
  email: string;

  // Menyimpan nomor telepon pelanggan yang boleh bernilai kosong.
  @Column({ length: 15, nullable: true })
  phone: string;

  // Menyimpan alamat pelanggan dalam bentuk teks dan bersifat opsional.
  @Column({ type: 'text', nullable: true })
  address: string;

  // Mencatat waktu ketika data pelanggan pertama kali dibuat.
  @CreateDateColumn()
  created_at: Date;

  // Relasi one-to-many, satu pelanggan dapat memiliki banyak pesanan.
  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];
}