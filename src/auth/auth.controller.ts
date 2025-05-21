import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { authService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginAuthDto } from './dto/loginAuthDto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { userService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/create-user.dto';

@Controller('auth')
export class authController {
  constructor(
    private readonly authService: authService,
    private readonly userService: userService,
  ) { }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión con correo y contraseña' })
  @ApiBody({ type: LoginAuthDto })
  @ApiResponse({
    status: 200,
    description: 'Usuario autenticado correctamente',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        user: {
          id_usuario: 1,
          correo_usuario: 'example@domain.com',
          nombre_usuario: 'Juan Pérez',
          telefono_usuario: '1234567890',
          fecharegistro_usuario: '2023-05-15',
          estado_usuario: true,
        },
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Correo o contraseña incorrectos',
  })
  async login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @Post('register')
  @ApiOperation({ summary: 'Registro de un nuevo usuario' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'Usuario creado correctamente',
    schema: {
      example: {
        id_usuario: 1,
        nombre_usuario: 'Juan Pérez',
        correo_usuario: 'juan.perez@example.com',
        telefono_usuario: '+573001112233',
        fecharegistro_usuario: '2025-05-20T14:00:00.000Z',
        estado_usuario: true,
      },
    },
  })
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    const { contrasenia_usuario, ...result } = user;
    return result;
  }

}
