import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from './entities/category.entity.js';
import { CreateCategoryDto } from './dto/create-category.dto.js';
import { UpdateCategoryDto } from './dto/update-category.dto.js';

// Service untuk menangani proses pengelolaan data kategori menggunakan TypeORM.
@Injectable()
export class CategoriesService {
  // Menghubungkan repository Category agar service dapat mengakses database.
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  // CREATE CATEGORY
  // Membuat objek kategori baru dan menyimpannya ke database.
  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepository.create(createCategoryDto);

    return await this.categoryRepository.save(category);
  }

  // GET ALL CATEGORIES
  // Mengambil seluruh data kategori dan mengurutkannya berdasarkan ID secara ascending.
  async findAll() {
    return await this.categoryRepository.find({
      order: { id: 'ASC' },
    });
  }

  // GET CATEGORY BY ID
  // Mencari kategori berdasarkan ID dan menampilkan error jika data tidak ditemukan.
  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(
        `Category with ID ${id} not found`,
      );
    }

    return category;
  }

  // UPDATE CATEGORY
  // Mengambil kategori berdasarkan ID, memperbarui datanya, lalu menyimpan perubahan.
  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);

    Object.assign(category, updateCategoryDto);

    return await this.categoryRepository.save(category);
  }

  // DELETE CATEGORY
  // Menghapus kategori jika ditemukan dan tidak memiliki produk yang terhubung.
  async remove(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id },
      relations: { products: true },
    });

    if (!category) {
      throw new NotFoundException(
        `Category with ID ${id} not found`,
      );
    }

    if (category.products && category.products.length > 0) {
      throw new ConflictException(
        'Category cannot be deleted because it still has products',
      );
    }

    await this.categoryRepository.remove(category);

    return {
      message: 'Category deleted successfully',
    };
  }
}