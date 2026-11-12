import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { OrderStatus } from '../entities/order.entity.js';
import { Type } from 'class-transformer';

// DTO untuk menentukan parameter filter dalam pencarian data pesanan.
export class QueryOrderDto {
    // Filter pesanan berdasarkan ID pelanggan dan bersifat opsional.
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    customerId?: number;

    // Filter pesanan berdasarkan status yang tersedia pada OrderStatus.
    @IsOptional()
    @IsEnum(OrderStatus)
    status?: OrderStatus;
}