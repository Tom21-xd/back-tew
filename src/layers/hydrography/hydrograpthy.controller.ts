import { Controller, Get } from '@nestjs/common';
import { HydrographyService } from './hydrography.service';

@Controller('hydrography')
export class HydrographyController {
  constructor(private readonly hydrographyService: HydrographyService) {}

  @Get('getAllHydrographySparql')
  async getHydrographyData() {
    const data = await this.hydrographyService.getAllHydrographySparql();
    return data;  
  }
}
