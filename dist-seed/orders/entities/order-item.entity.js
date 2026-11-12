var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity.js';
import { Order } from './order.entity.js';
let OrderItem = class OrderItem {
    orderId;
    productId;
    quantity;
    priceAtPurchase;
    order;
    product;
};
__decorate([
    PrimaryColumn('uuid', { name: 'order_id' }),
    __metadata("design:type", String)
], OrderItem.prototype, "orderId", void 0);
__decorate([
    PrimaryColumn('int', { name: 'product_id' }),
    __metadata("design:type", Number)
], OrderItem.prototype, "productId", void 0);
__decorate([
    Column({ type: 'int' }),
    __metadata("design:type", Number)
], OrderItem.prototype, "quantity", void 0);
__decorate([
    Column({
        name: 'price_at_purchase',
        type: 'decimal',
        precision: 12,
        scale: 2,
    }),
    __metadata("design:type", Number)
], OrderItem.prototype, "priceAtPurchase", void 0);
__decorate([
    ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' }),
    JoinColumn({ name: 'order_id' }),
    __metadata("design:type", Object)
], OrderItem.prototype, "order", void 0);
__decorate([
    ManyToOne(() => Product, (product) => product.orderItems, {
        onDelete: 'RESTRICT',
    }),
    JoinColumn({ name: 'product_id' }),
    __metadata("design:type", Object)
], OrderItem.prototype, "product", void 0);
OrderItem = __decorate([
    Entity('order_items')
], OrderItem);
export { OrderItem };
