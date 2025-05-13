import { Controller, Get, Param } from '@nestjs/common';
import { airportsService } from './airport.service';
import { AeropuertoEntity } from './entity/airport.entity';

@Controller('layers/airports')
export class airportsController {
  constructor(private readonly airportsService: airportsService) {}

  @Get('getAllAirportsSparql')
  async findAll() {
    return this.airportsService.getAllAirportsSparql();
  }

  @Get('getAllAirports')
  async getAllAeropuertos(): Promise<AeropuertoEntity[]> {
    return this.airportsService.getAllAeropuertos();
  }

  @Get('getAirport:id')
  async getAeropuertoById(@Param('id') id: number): Promise<AeropuertoEntity | null> {
    return this.airportsService.getAeropuertoById(id);
  }
  
}
