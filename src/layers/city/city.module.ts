// src/city/city.module.ts
import { Module } from '@nestjs/common';
import { CityController } from './city.controller';
import { CityService } from './city.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CiudadEntity } from './entity/city.entity';  // Importamos la entidad de la base de datos

@Module({
  imports: [TypeOrmModule.forFeature([CiudadEntity])],  // Importamos la entidad de la base de datos para consultas
  controllers: [CityController],  // Controlador para manejar las rutas
  providers: [CityService],       // Servicio para manejar la lógica de negocio
})
export class CityModule {}
