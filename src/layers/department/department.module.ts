// src/department/department.module.ts
import { Module } from '@nestjs/common';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepartamentoEntity } from './entity/department.entity';  // Importamos la entidad de la base de datos

@Module({
  imports: [TypeOrmModule.forFeature([DepartamentoEntity])],  // Importamos la entidad de la base de datos
  controllers: [DepartmentController],  // Controlador para manejar las rutas de los departamentos
  providers: [DepartmentService],       // Servicio para manejar la lógica de negocio de los departamentos
})
export class DepartmentModule {}
