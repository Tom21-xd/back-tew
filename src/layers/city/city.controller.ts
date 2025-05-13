// src/city/city.controller.ts
import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common';
import { CityService } from './city.service';
import { get } from 'http';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get('getAllCitiesSparql')
  async getCitySparql() {
    try {
      const data = await this.cityService.getAllCitiesSparql();
      if (!data || data.length === 0) {
        throw new HttpException(
          'No se encontraron ciudades en el repositorio SPARQL',
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Ciudades obtenidas exitosamente desde SPARQL',
        data,
      };
    } catch (error) {
      console.error('Error al obtener ciudades desde SPARQL:', error);
      throw new HttpException(
        'Error al obtener las ciudades desde SPARQL',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('getAllCitiesWithGeometries')
  async getAllCitiesWithGeometries() {
    try {
      const data = await this.cityService.getAllCitiesOnlyGeometries();
      if (!data || data.length === 0) {
        throw new HttpException(
          'No se encontraron ciudades con geometría en la base de datos',
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Ciudades con geometría obtenidas exitosamente desde la base de datos',
        data,
      };
    } catch (error) {
      console.error('Error al obtener geometrías de ciudades:', error);
      throw new HttpException(
        'Error al obtener las geometrías de las ciudades',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('getAllCitiesDatabase')
  async getCityDatabase() {
    try {
      const data = await this.cityService.getCitiesFromDatabase();
      if (!data || data.length === 0) {
        throw new HttpException(
          'No se encontraron ciudades en la base de datos',
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Ciudades obtenidas exitosamente desde la base de datos',
        data,
      };
    } catch (error) {
      console.error('Error al obtener ciudades desde la base de datos:', error);
      throw new HttpException(
        'Error al obtener las ciudades desde la base de datos',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
