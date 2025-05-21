import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'Nombre completo del usuario',
    example: 'Juan Pérez',
  })
  nombre_usuario: string;

  @ApiProperty({
    description: 'Correo electrónico único del usuario',
    example: 'juan.perez@example.com',
  })
  correo_usuario: string;

  @ApiProperty({
    description: 'Contraseña para acceso',
    example: 'MiContraseña123',
  })
  contrasenia_usuario: string;

  @ApiProperty({
    description: 'Teléfono de contacto (opcional)',
    example: '+573001112233',
    required: false,
  })
  telefono_usuario?: string;
}
