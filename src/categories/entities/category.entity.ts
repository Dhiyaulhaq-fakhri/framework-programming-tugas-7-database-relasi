import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Product } from '../../products/entities/product.entity.js';

// Entity Category untuk merepresentasikan tabel categories pada database.
@Entity('categories')
export class Category {
  // Primary key sebagai identitas unik setiap kategori.
  @PrimaryGeneratedColumn()
  id: number;

  // Menyimpan nama kategori dengan batas maksimal 100 karakter.
  @Column({ length: 100 })
  name: string;

  // Menyimpan deskripsi kategori yang boleh bernilai kosong.
  @Column({ type: 'text', nullable: true })
  description: string;

  // Mencatat waktu ketika kategori pertama kali dibuat.
  @CreateDateColumn()
  created_at: Date;

  // Mencatat waktu terakhir kategori diperbarui.
  @UpdateDateColumn()
  updated_at: Date;

  // Relasi one-to-many, satu kategori dapat memiliki banyak produk.
  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}