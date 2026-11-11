
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

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  // mnambahkan customer baru
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


  // menampilkan semua customer
  findAll() {
    return this.customerRepository.find();
  }

  // menampilkan customer by id
  async findOne(id: number) {
    const customer = await this.customerRepository.findOne({
      where: { id },
    });

    if (!customer) {
      throw new NotFoundException('Customer tidak ditemukan');
    }

    return customer;
  }

  
  // update customers by id
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

  // hapus customers by id
  async remove(id: number) {
    const customer = await this.findOne(id);

    await this.customerRepository.remove(customer);

    return {
      message: 'Customer berhasil dihapus',
    };
  }
}
