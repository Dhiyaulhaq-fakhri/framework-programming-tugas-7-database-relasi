import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller.js';

// Pengujian unit untuk memastikan CustomersController dapat dibuat dengan benar.
describe('CustomersController', () => {
  let controller: CustomersController;

  // Menyiapkan modul pengujian sebelum setiap test dijalankan.
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomersController],
    }).compile();

    controller = module.get<CustomersController>(CustomersController);
  });

  // Memastikan controller berhasil dibuat dan tidak bernilai undefined.
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});