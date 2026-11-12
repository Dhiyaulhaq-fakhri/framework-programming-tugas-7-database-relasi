var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, } from 'typeorm';
import { Category } from '../../categories/entities/category.entity.js';
import { OrderItem } from '../../orders/entities/order-item.entity.js';
let Product = class Product {
    id;
    category_id;
    name;
    description;
    price;
    stock;
    created_at;
    updated_at;
    category;
    orderItems;
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", Number)
], Product.prototype, "category_id", void 0);
__decorate([
    Column({ length: 150 }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    Column({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    Column({ type: 'decimal', precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    Column({ type: 'int', default: 0 }),
    __metadata("design:type", Number)
], Product.prototype, "stock", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], Product.prototype, "created_at", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], Product.prototype, "updated_at", void 0);
__decorate([
    ManyToOne(() => Category, (category) => category.products),
    __metadata("design:type", Category)
], Product.prototype, "category", void 0);
__decorate([
    OneToMany(() => OrderItem, (item) => item.product),
    __metadata("design:type", Array)
], Product.prototype, "orderItems", void 0);
Product = __decorate([
    Entity('products')
], Product);
export { Product };
