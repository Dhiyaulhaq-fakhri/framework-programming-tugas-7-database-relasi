import { Type } from 'class-transformer';
import { IsInt, IsUUID, Min } from 'class-validator';

export class CreateOrderItemDto {
    @IsInt()
    @Type(() => Number)    
    productId: number;

    @IsInt()
    @Min(1)
    @Type(() => Number)
    quantity: number;
}