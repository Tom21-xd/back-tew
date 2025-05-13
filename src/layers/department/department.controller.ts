// src/department/department.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartamentoEntity } from './entity/department.entity';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @Get('getAllDepartmentsSparql')
  async getDepartmentData() {
    const data = await this.departmentService.getAllDepartmentsSparql();
    return data;  // Retorna los datos de los departamentos
  }

  @Get('getAllDepartment')
  async getAllDepartamentos(): Promise<DepartamentoEntity[]> {
    return this.departmentService.getAllDepartamentos();
  }

  @Get('getDepartment:id')
  async getDepartamentoById(@Param('id') id: number): Promise<DepartamentoEntity | null> {
    return this.departmentService.getDepartamentoById(id);
  }
}
