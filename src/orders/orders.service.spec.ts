import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service.js';

// Kumpulan pengujian untuk OrdersService.
describe('OrdersService', () => {
  let service: OrdersService;

  // Menyiapkan modul pengujian dan mengambil instance OrdersService sebelum setiap pengujian.
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersService],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  // Memastikan OrdersService berhasil dibuat dan tidak bernilai undefined.
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});