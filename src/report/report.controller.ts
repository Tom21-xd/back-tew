import { Controller, Post, Body, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { ReportService } from './report.service';
import { CreateReportDto } from './dto/create-report.dto';
import { ReporteEntity } from './entities/report.entity';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Post('createReport')
  async create(@Body() dto: CreateReportDto): Promise<ReporteEntity> {
    return this.reportService.create(dto);
  }
  @Get('getReportAll')
  async findAll() {
    return this.reportService.findAll();
  }

  @Get('getReport:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.reportService.findOne(id);
  }

  @Get('getReportUsuario/:userId')
  async findByUsuario(@Param('userId', ParseIntPipe) userId: number) {
    return this.reportService.findByUsuario(userId);
  }

  @Get('getReportAeropuerto/:airportId')
  async findByAeropuerto(@Param('airportId', ParseIntPipe) airportId: number) {
    return this.reportService.findByAeropuerto(airportId);
  }

  // GET /reportes/fecha?start=2025-01-01&end=2025-12-31
  @Get('getReportFecha')
  async findByDateRange(
    @Query('start') start: string,
    @Query('end') end: string,
  ) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    return this.reportService.findByDateRange(startDate, endDate);
  }
}
