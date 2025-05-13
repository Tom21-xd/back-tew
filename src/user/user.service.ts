import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class userService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // Buscar por correo
  async findByCorreo(correo_usuario: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { correo_usuario } });
  }

  // Crear un usuario nuevo
  async create(userData: Partial<User>): Promise<User> {
    const user = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }
}
