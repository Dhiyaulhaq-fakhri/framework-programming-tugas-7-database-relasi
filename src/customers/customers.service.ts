import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Customer } from './entities/customer.entity.js';
import { CreateCustomerDto } from './dto/create-customer.dto.js';
import { UpdateCustomerDto } from './dto/update-customer.dto.js';

// Service untuk menangani proses pengelolaan data pelanggan menggunakan TypeORM.
@Injectable()
export class CustomersService {
  // Menghubungkan repository Customer agar service dapat mengakses database.
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  // Menambahkan customer baru dengan memeriksa apakah email sudah digunakan.
  async create(createCustomerDto: CreateCustomerDto) {
    const existingCustomer = await this.customerRepository.findOne({
      where: { email: createCustomerDto.email },
    });

    if (existingCustomer) {
      throw new ConflictException('Email sudah digunakan');
    }

    const customer = this.customerRepository.create(createCustomerDto);

    return this.customerRepository.save(customer);
  }


  // Mengambil dan menampilkan seluruh data customer dari database.
  findAll() {
    return this.customerRepository.find();
  }

  // Mencari data customer berdasarkan ID dan menampilkan error jika tidak ditemukan.
  async findOne(id: number) {
    const customer = await this.customerRepository.findOne({
      where: { id },
    });

    if (!customer) {
      throw new NotFoundException('Customer tidak ditemukan');
    }

    return customer;
  }


  // Memperbarui data customer berdasarkan ID dengan memeriksa keunikan email.
  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.findOne(id);

    if (
      updateCustomerDto.email &&
      updateCustomerDto.email !== customer.email
    ) {
      const existingCustomer = await this.customerRepository.findOne({
        where: { email: updateCustomerDto.email },
      });

      if (existingCustomer) {
        throw new ConflictException('Email sudah digunakan');
      }
    }

    Object.assign(customer, updateCustomerDto);

    return this.customerRepository.save(customer);
  }

  // Menghapus data customer berdasarkan ID dan mengembalikan pesan keberhasilan.
  async remove(id: number) {
    const customer = await this.findOne(id);

    await this.customerRepository.remove(customer);

    return {
      message: 'Customer berhasil dihapus',
    };
  }
}