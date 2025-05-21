import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './create-user.dto';


@Injectable()
export class userService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async findByCorreo(correo_usuario: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { correo_usuario } });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {


    const newUser = this.usersRepository.create({
      nombre_usuario: createUserDto.nombre_usuario,
      correo_usuario: createUserDto.correo_usuario,
      telefono_usuario:createUserDto.telefono_usuario,
      contrasenia_usuario: createUserDto.contrasenia_usuario,
      fecharegistro_usuario: new Date(),
      estado_usuario: true,
    });

    return this.usersRepository.save(newUser);
  }
}
