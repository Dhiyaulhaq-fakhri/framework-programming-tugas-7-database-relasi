import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller.js';
import { OrdersService } from './orders.service.js';

// Pengujian unit untuk memastikan OrdersController dapat dibuat dengan benar.
describe('OrdersController', () => {
  let controller: OrdersController;

  // Menyiapkan modul pengujian dengan OrdersController dan OrdersService.
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [OrdersService],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
  });

  // Memastikan controller berhasil dibuat dan tidak bernilai undefined.
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});