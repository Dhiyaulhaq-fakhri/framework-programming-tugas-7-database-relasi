import { DataSource } from 'typeorm';
import { Category } from '../../categories/entities/category.entity.js';
import { Product } from '../../products/entities/product.entity.js';
import { Customer } from '../../customers/entities/customer.entity.js';
import * as dotenv from 'dotenv';

dotenv.config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'ecommerce_db',
  entities: [Category, Product, Customer],
  synchronize: false, // Jangan synchronize saat seed untuk menghindari perubahan skema tak sengaja
});

async function runSeed() {
  try {
    await AppDataSource.initialize();
    console.log('🔗 Database connected!');

    // 1. Seed Categories
    const categoryRepo = AppDataSource.getRepository(Category);
    const catMinuman = categoryRepo.create({ name: 'Minuman', description: 'Aneka minuman segar' });
    const catMakanan = categoryRepo.create({ name: 'Makanan', description: 'Aneka makanan berat' });
    await categoryRepo.save([catMinuman, catMakanan]);
    console.log('✅ Categories seeded');

    // 2. Seed Products
    const productRepo = AppDataSource.getRepository(Product);
    const prodKopi = productRepo.create({ name: 'Kopi Susu', price: 18000, stock: 50, category: catMinuman });
    const prodTeh = productRepo.create({ name: 'Teh Manis', price: 8000, stock: 30, category: catMinuman });
    const prodNasi = productRepo.create({ name: 'Nasi Goreng', price: 25000, stock: 20, category: catMakanan });
    await productRepo.save([prodKopi, prodTeh, prodNasi]);
    console.log('✅ Products seeded');

    // 3. Seed Customers
    const customerRepo = AppDataSource.getRepository(Customer);
    const custBudi = customerRepo.create({ name: 'Budi', email: 'budi@example.com', phone: '0812345', address: 'Jl. Merdeka 1' });
    const custAni = customerRepo.create({ name: 'Ani', email: 'ani@example.com', phone: '0898765', address: 'Jl. Sudirman 2' });
    await customerRepo.save([custBudi, custAni]);
    console.log('✅ Customers seeded');

    console.log('🎉 Seed data berhasil dimasukkan!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error saat seeding:', error);
    process.exit(1);
  }
}

runSeed();