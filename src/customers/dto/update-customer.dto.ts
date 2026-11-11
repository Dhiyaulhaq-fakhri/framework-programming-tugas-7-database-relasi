
import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerDto } from '../dto/create-customer.dto.js';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto){}
