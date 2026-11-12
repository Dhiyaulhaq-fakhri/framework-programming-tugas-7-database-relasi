import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

// DTO untuk membuat data pelanggan baru dengan validasi setiap atribut.
export class CreateCustomerDto {
  // Memvalidasi nama pelanggan agar wajib diisi dan maksimal 100 karakter.
  @IsString()
  @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
  @MaxLength(100)
  name: string;

  // Memvalidasi email agar wajib diisi dan memiliki format email yang benar.
  @IsEmail({}, { message: 'Format email salah' })
  @IsNotEmpty({ message: 'Email tidak boleh kosong' })
  email: string;

  // Memvalidasi nomor telepon sebagai teks dengan maksimal 20 karakter dan bersifat opsional.
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  // Memvalidasi alamat sebagai teks yang boleh tidak diisi.
  @IsOptional()
  @IsString()
  address?: string;
}