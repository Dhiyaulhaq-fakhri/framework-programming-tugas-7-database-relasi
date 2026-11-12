import { Type } from 'class-transformer';
import { IsInt, IsUUID, Min } from 'class-validator';

// DTO untuk menentukan data produk dan jumlahnya dalam sebuah pesanan.
export class CreateOrderItemDto {
    // Memvalidasi ID produk sebagai bilangan bulat dan mengubah input menjadi Number.
    @IsInt()
    @Type(() => Number)    
    productId: number;

    // Memvalidasi jumlah produk agar berupa bilangan bulat dengan nilai minimal 1.
    @IsInt()
    @Min(1)
    @Type(() => Number)
    quantity: number;
}