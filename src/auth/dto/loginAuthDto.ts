import { IsString } from 'class-validator';

export class loginAuthDto {
  @IsString()
  correo_usuario: string;

  @IsString()
  contrasenia_usuario: string;
}
