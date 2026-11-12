import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { OrdersService } from './orders.service.js';
import { CreateOrderDto } from './dto/create-order.dto.js';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto.js';

// Controller untuk menangani seluruh endpoint pengelolaan pesanan.
@Controller('orders')
export class OrdersController {
  // Menghubungkan controller dengan OrdersService untuk menjalankan proses pengelolaan pesanan.
  constructor(private readonly ordersService: OrdersService) {}

  // Membuat pesanan baru berdasarkan data yang dikirim melalui request body.
  @Post()
  create(@Body() dto: CreateOrderDto) {
    return this.ordersService.create(dto);
  }

  // Mengambil seluruh data pesanan dari database.
  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  // Mengambil detail pesanan berdasarkan ID berbentuk UUID.
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.findOne(id);
  }

  // Memperbarui status pesanan berdasarkan ID dan status yang dikirim.
  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() dto: UpdateOrderStatusDto
  ) {
    return this.ordersService.updateStatus(id, dto);
  }

  // Menghapus pesanan berdasarkan ID berbentuk UUID.
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.ordersService.remove(id);
  }
}