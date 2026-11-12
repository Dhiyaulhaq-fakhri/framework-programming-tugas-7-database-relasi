import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity.js';
import { Order } from './order.entity.js';
import type { Relation } from 'typeorm';

@Entity('order_items')
export class OrderItem {
    @PrimaryColumn('uuid', { name: 'order_id' })
    orderId: string; 

    @PrimaryColumn('int', { name: 'product_id' })
    productId: number; 

    @Column({ type: 'int' })
    quantity: number;

    @Column({
        name: 'price_at_purchase',
        type: 'decimal',
        precision: 12,
        scale: 2,
    })
    priceAtPurchase: number;

    @ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'order_id' })
    order: Relation<Order>;

    @ManyToOne(() => Product, (product) => product.orderItems, {
        onDelete: 'RESTRICT',
    })
    
    @JoinColumn({ name: 'product_id' })
    product: Relation<Product>;
}
