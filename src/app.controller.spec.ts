import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';

// Kumpulan pengujian untuk AppController.
describe('AppController', () => {
  let appController: AppController;

  // Menyiapkan modul pengujian dan mengambil instance AppController.
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  // Menguji endpoint utama aplikasi.
  describe('root', () => {
    // Memastikan getHello() mengembalikan teks "Hello World!".
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});