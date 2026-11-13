# E-Commerce API Specification

Dokumen ini merupakan spesifikasi API untuk project **E-Commerce System** yang dibangun menggunakan **NestJS**.

Dokumen ini dapat digunakan sebagai acuan antara backend, frontend, mobile application, maupun sebagai materi pembelajaran.

---

## 1. Gambaran Project

### Nama Project
**E-Commerce API**

### Teknologi
- Node.js
- NestJS
- REST API
- JSON
- TypeORM
- PostgreSQL
- Swagger / OpenAPI
- Class Validator

### Base URL
```text
/api
```

Contoh:
```text
http://localhost:3000
```

---

## 2. Konsep API

API menggunakan format JSON.

### Success Response
Contoh response ketika request berhasil:
```json
{
  "success": true,
  "message": "Data berhasil diambil",
  "data": {}
}
```

### Error Response
Contoh response ketika terjadi error:
```json
{
  "success": false,
  "message": "Pesanan tidak ditemukan",
  "error": "NotFoundException",
  "statusCode": 404
}
```

---

## 3. HTTP Status Code

| Status Code | Keterangan |
|---|---|
| `200` | Request berhasil |
| `201` | Data berhasil dibuat |
| `400` | Request tidak valid / Aturan bisnis dilanggar |
| `404` | Data tidak ditemukan |
| `409` | Terjadi conflict (misal hapus kategori yang masih dipakai) |
| `500` | Internal server error |

---

## 4. Category API

Kategori digunakan untuk mengelompokkan produk.

### 4.1 Get Categories
Mengambil daftar kategori.

#### Endpoint
```http
GET /categories
```

#### Response
**HTTP 200 OK**
```json
{
  "success": true,
  "message": "Data berhasil diambil",
  "data": [
    {
      "id": 1,
      "name": "Minuman",
      "description": "Aneka minuman segar"
    }
  ]
}
```

### 4.2 Create Category

```http
POST /categories
```

#### Request Body
```json
{
  "name": "Makanan",
  "description": "Aneka makanan berat"
}
```

#### Response
**HTTP 201 Created**
```json
{
  "success": true,
  "message": "Data berhasil diambil",
  "data": {
    "id": 2,
    "name": "Makanan",
    "description": "Aneka makanan berat"
  }
}
```

### 4.3 Delete Category (Business Validation)
Menghapus kategori. Kategori **tidak boleh dihapus** jika masih memiliki produk terkait.

#### Endpoint
```http
DELETE /categories/:id
```

#### Response (Gagal karena ada produk)
**HTTP 409 Conflict**
```json
{
  "success": false,
  "message": "Category cannot be deleted because it still has products",
  "error": "ConflictException",
  "statusCode": 409
}
```

---

## 5. Product API

Produk merupakan data utama dalam E-Commerce System.

### 5.1 Get Products

```http
GET /products
```

#### Response
**HTTP 200 OK**
```json
{
  "success": true,
  "message": "Data berhasil diambil",
  "data": [
    {
      "id": 1,
      "name": "Kopi Susu",
      "price": 18000,
      "stock": 50,
      "category": {
        "id": 1,
        "name": "Minuman"
      }
    }
  ]
}
```

### 5.2 Create Product

```http
POST /products
```

#### Request Body
```json
{
  "name": "Teh Manis",
  "description": "Teh manis hangat",
  "price": 8000,
  "stock": 30,
  "category_id": 1
}
```

---

## 6. Customer API

Pelanggan yang akan melakukan pemesanan.

### 6.1 Create Customer

```http
POST /customers
```

#### Request Body
```json
{
  "name": "Budi",
  "email": "budi@example.com",
  "phone": "08123456789",
  "address": "Jl. Merdeka 1"
}
```

### 6.2 Get Customers

```http
GET /customers
```

---

## 7. Order API

Order adalah transaksi yang dilakukan oleh Customer. Satu Order dapat memiliki banyak detail item (`OrderItems`).

### 7.1 Get Orders
Mengambil daftar pesanan. Menyertakan relasi ke Customer dan OrderItems.

#### Endpoint
```http
GET /orders
```

#### Response
```json
{
  "success": true,
  "message": "Data berhasil diambil",
  "data": [
    {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "status": "PENDING",
      "totalAmount": 40000,
      "customer": {
        "id": 1,
        "name": "Budi"
      },
      "items": [
        {
          "orderId": "550e8400-e29b-41d4-a716-446655440000",
          "productId": 1,
          "quantity": 2,
          "priceAtPurchase": 18000,
          "product": {
            "id": 1,
            "name": "Kopi Susu"
          }
        }
      ]
    }
  ]
}
```

### 7.2 Create Order
Membuat pesanan baru. **Aturan Bisnis:** Stok produk akan otomatis berkurang. Jika stok tidak cukup, pesanan dibatalkan seluruhnya (rollback).

#### Endpoint
```http
POST /orders
```

#### Request Body
```json
{
  "customerId": 1,
  "items": [
    { "productId": 1, "quantity": 2 },
    { "productId": 2, "quantity": 1 }
  ]
}
```

#### Response (Gagal - Stok Kurang)
**HTTP 400 Bad Request**
```json
{
  "success": false,
  "message": "Stok Kopi Susu tidak mencukupi (tersedia 5, diminta 10)",
  "error": "BadRequestException",
  "statusCode": 400
}
```

### 7.3 Update Order Status
Mengubah status pesanan. **Aturan Bisnis:** Jika status diubah menjadi `CANCELLED`, stok produk akan otomatis dikembalikan.

#### Endpoint
```http
PATCH /orders/:id/status
```

#### Request Body
```json
{
  "status": "CANCELLED"
}
```

### 7.4 Delete Order
Menghapus pesanan. **Aturan Bisnis:** Hanya pesanan dengan status `CANCELLED` yang boleh dihapus.

#### Endpoint
```http
DELETE /orders/:id
```

#### Response (Gagal - Status masih PENDING)
**HTTP 400 Bad Request**
```json
{
  "success": false,
  "message": "Hanya pesanan berstatus CANCELLED yang dapat dihapus",
  "error": "BadRequestException",
  "statusCode": 400
}
```

---

## 8. Relasi Database

1. **Category (1) - (N) Product**  
   Satu kategori dapat memiliki banyak produk.
2. **Customer (1) - (N) Order**  
   Satu pelanggan dapat memiliki banyak pesanan.
3. **Order (1) - (N) OrderItem**  
   Satu pesanan dapat memiliki banyak detail item.
4. **Product (1) - (N) OrderItem**  
   Satu produk dapat muncul di banyak detail pesanan.

---

## 9. Atribut Detail Pesanan (OrderItem)

Sesuai ketentuan, entitas `OrderItem` menyimpan atribut khusus:

- `quantity` (Kuantitas/jumlah produk yang dibeli)
- `priceAtPurchase` (Harga produk pada saat transaksi terjadi, agar histori harga tidak berubah meskipun harga produk di-update di kemudian hari).

---

## 10. Struktur Module NestJS

```text
src/
├── categories/
├── products/
├── customers/
├── orders/
├── common/
│   ├── filters/
│   └── interceptors/
├── app.module.ts
└── main.ts
```

---

## 11. Cara Menjalankan Project

1. Pastikan Docker menyala.
2. Jalankan database: `docker compose up -d`
3. Install dependency: `npm install`
4. Jalankan aplikasi: `npm run start:dev`
5. Buka Swagger UI di: `http://localhost:3000/api-docs`
