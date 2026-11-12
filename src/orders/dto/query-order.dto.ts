import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { OrderStatus } from '../entities/order.entity.js';
import { Type } from 'class-transformer';

export class QueryOrderDto {
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    customerId?: number;

    @IsOptional()
    @IsEnum(OrderStatus)
    status?: OrderStatus;
}