import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from './customers.service.js';

// Pengujian unit untuk memastikan CustomersService dapat dibuat dengan benar.
describe('CustomersService', () => {
  let service: CustomersService;

  // Menyiapkan modul pengujian dengan CustomersService sebagai provider.
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomersService],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
  });

  // Memastikan service berhasil dibuat dan tidak bernilai undefined.
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});