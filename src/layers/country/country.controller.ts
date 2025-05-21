// src/country/country.controller.ts
import { Controller, Get } from '@nestjs/common';
import { CountryService } from './country.service';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Get('getAllContriesSparql')
  async getCountryData() {
    const data = await this.countryService.getAllCountriesSparql();
    return data;  
  }

  @Get('getAllCountries')
  async getCountries(){
    const data = await this.countryService.getAllHydrography();
    return data ;
  }
}
