import { Type } from 'class-transformer';
import {
    ArrayMinSize,
    IsArray,
    IsInt,
    ValidateNested,
} from 'class-validator';
import { CreateOrderItemDto } from './create-order-item.dto.js';

// DTO untuk menentukan data yang dibutuhkan dalam pembuatan pesanan baru.
export class CreateOrderDto {
    // Memvalidasi ID pelanggan sebagai bilangan bulat dan mengubah input menjadi Number.
    @IsInt()
    @Type(() => Number)
    customerId: number;

    // Memvalidasi daftar item pesanan agar berbentuk array dan minimal berisi satu item.
    // Setiap item juga divalidasi menggunakan CreateOrderItemDto.
    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({ each: true })
    @Type(() => CreateOrderItemDto)
    items: CreateOrderItemDto[];
}