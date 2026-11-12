import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service.js';

// Pengujian unit untuk memastikan CategoriesService dapat dibuat dengan benar.
describe('CategoriesService', () => {
  let service: CategoriesService;

  // Menyiapkan modul pengujian dengan CategoriesService sebagai provider.
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesService],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  // Memastikan service berhasil dibuat dan tidak bernilai undefined.
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});