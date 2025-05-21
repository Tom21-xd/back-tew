import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { authService } from '../auth.service';

@Injectable()
export class localStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: authService) {
    super({ usernameField: 'correo_usuario', passwordField: 'contrasenia_usuario' });
  }

  async validate(correo_usuario: string, contrasenia_usuario: string): Promise<any> {
    const user = await this.authService.validateUser(correo_usuario, contrasenia_usuario);
    if (!user) {
      throw new UnauthorizedException('Correo o contraseña incorrectos');
    }
    return user;
  }
}
