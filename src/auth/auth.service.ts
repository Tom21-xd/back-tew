import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { userService } from '../user/user.service';
import { LoginAuthDto } from './dto/loginAuthDto';

@Injectable()
export class authService {
  constructor(
    private usersService: userService,
    private jwtService: JwtService,
  ) {}

  async validateUser(correo_usuario: string, contrasenia_usuario: string): Promise<any> {
    const user = await this.usersService.findByCorreo(correo_usuario);
    if (user && user.contrasenia_usuario === contrasenia_usuario) { // luego puedes usar bcrypt
      const { contrasenia_usuario, ...result } = user;
      return result;
    }
    return null;
  }

  async login( user: LoginAuthDto) {
    const { correo_usuario, contrasenia_usuario } = user;
    const validUser = await this.validateUser(correo_usuario, contrasenia_usuario);
    if (!validUser) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }
    const payload = { username: validUser.correo_usuario, sub: validUser.id_usuario };
    return {
      access_token: this.jwtService.sign(payload),
      user: validUser,
    };
  }

  
}
