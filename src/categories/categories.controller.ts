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

import { CategoriesService } from './categories.service.js';
import { CreateCategoryDto } from './dto/create-category.dto.js';
import { UpdateCategoryDto } from './dto/update-category.dto.js';

// Controller untuk menangani seluruh endpoint pengelolaan kategori.
@Controller('categories')
export class CategoriesController {
  // Menghubungkan controller dengan CategoriesService untuk menjalankan proses CRUD.
  constructor(
    private readonly categoriesService: CategoriesService,
  ) {}

  // POST /categories
  // Menambahkan kategori baru berdasarkan data yang dikirim melalui request body.
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  // GET /categories
  // Mengambil seluruh data kategori dari database.
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  // GET /categories/:id
  // Mengambil satu kategori berdasarkan ID yang diterima dari URL.
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.findOne(id);
  }

  // PATCH /categories/:id
  // Memperbarui data kategori berdasarkan ID dan data yang dikirim.
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  // DELETE /categories/:id
  // Menghapus kategori berdasarkan ID yang diterima dari URL.
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.categoriesService.remove(id);
  }
}