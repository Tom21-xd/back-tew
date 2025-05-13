// src/hydrography/hydrography.module.ts
import { Module } from '@nestjs/common';
import { HydrographyController } from './hydrograpthy.controller';
import { HydrographyService } from './hydrography.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Hydrography } from './entity/hydrography.entity';  // Importamos la entidad de la base de datos

@Module({
  imports: [TypeOrmModule.forFeature([Hydrography])],  // Importamos la entidad de la base de datos
  controllers: [HydrographyController],  // Controlador para manejar las rutas de hidrografía
  providers: [HydrographyService],       // Servicio para manejar la lógica de negocio de hidrografía
})
export class HydrographyModule {}
