import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller.js';

// Pengujian unit untuk memastikan CategoriesController dapat dibuat dengan benar.
describe('CategoriesController', () => {
  let controller: CategoriesController;

  // Menyiapkan modul pengujian sebelum setiap test dijalankan.
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
  });

  // Memastikan controller berhasil dibuat dan tidak bernilai undefined.
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});