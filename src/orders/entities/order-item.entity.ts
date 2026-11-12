import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity.js';
import { Order } from './order.entity.js';
import type { Relation } from 'typeorm';

// Entity OrderItem untuk merepresentasikan tabel order_items yang menyimpan detail produk dalam pesanan.
@Entity('order_items')
export class OrderItem {
    // Primary key gabungan yang menghubungkan item dengan pesanan berdasarkan UUID.
    @PrimaryColumn('uuid', { name: 'order_id' })
    orderId: string; 

    // Primary key gabungan yang mengidentifikasi produk dalam setiap pesanan.
    @PrimaryColumn('int', { name: 'product_id' })
    productId: number; 

    // Menyimpan jumlah produk yang dipesan.
    @Column({ type: 'int' })
    quantity: number;

    // Menyimpan harga produk pada saat transaksi dilakukan.
    @Column({
        name: 'price_at_purchase',
        type: 'decimal',
        precision: 12,
        scale: 2,
    })
    priceAtPurchase: number;

    // Relasi many-to-one, setiap item pesanan terhubung dengan satu pesanan.
    // Data item otomatis terhapus jika pesanan terkait dihapus.
    @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'order_id' })
    order: Relation<Order>;

    // Relasi many-to-one, setiap item pesanan terhubung dengan satu produk.
    // Produk tidak dapat dihapus jika masih digunakan dalam detail pesanan.
    @ManyToOne(() => Product, (product) => product.orderItems, {
        onDelete: 'RESTRICT',
    })

    @JoinColumn({ name: 'product_id' })
    product: Relation<Product>;
}