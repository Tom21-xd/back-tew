import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { userService } from '../user/user.service';

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

  async login(user: any) {
    const payload = { username: user.correo_usuario, sub: user.id_usuario };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
