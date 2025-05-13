import { Module } from '@nestjs/common';
import { airportsService } from './airport.service';
import { airportsController } from './airport.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AeropuertoEntity } from './entity/airport.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AeropuertoEntity])],  // Importamos la entidad de la base de datos para consultas
  controllers: [airportsController],
  providers: [airportsService],
})
export class airportsModule { }
