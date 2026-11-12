import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';

import { CustomersService } from './customers.service.js';
import { CreateCustomerDto } from './dto/create-customer.dto.js';
import { UpdateCustomerDto } from './dto/update-customer.dto.js';

// Controller untuk menangani endpoint pengelolaan data pelanggan.
@Controller('customers')
export class CustomersController {
  // Menghubungkan controller dengan CustomersService untuk menjalankan proses CRUD.
  constructor(private readonly customersService: CustomersService) {}

  // Menambahkan data pelanggan baru berdasarkan request body.
  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  // Mengambil seluruh data pelanggan dari database.
  @Get()
  findAll() {
    return this.customersService.findAll();
  }

  // Mengambil data pelanggan berdasarkan ID yang diterima dari URL.
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number ) {
    return this.customersService.findOne(id);
  }

  // Memperbarui data pelanggan berdasarkan ID dan data yang dikirim.
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(id, updateCustomerDto);
  }

  // Menghapus data pelanggan berdasarkan ID.
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.customersService.remove(id);
  }
}