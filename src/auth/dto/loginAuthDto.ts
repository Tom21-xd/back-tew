// src/auth/dto/login-auth.dto.ts
import { IsString, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginAuthDto {
  @ApiProperty({
    example: 'example@domain.com',
    description: 'Correo del usuario para iniciar sesión',
  })
  @IsEmail()
  correo_usuario: string;

  @ApiProperty({
    example: 'password123',
    description: 'Contraseña del usuario',
  })
  @IsString()
  contrasenia_usuario: string;
}
