// src/modules/orders/dto/update-order-status.dto.ts
import { IsEnum } from 'class-validator';
import { OrderStatus } from '../entities/order.entity.js';

// DTO untuk memperbarui status pesanan berdasarkan pilihan status yang tersedia.
export class UpdateOrderStatusDto {
    // Memastikan status yang dikirim sesuai dengan nilai pada enum OrderStatus.
    @IsEnum(OrderStatus)
    status: OrderStatus;
}