import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { AeropuertoEntity } from 'src/layers/airport/entity/airport.entity';
import { User } from 'src/user/entities/user.entity';
import { ReporteEntity } from './entities/report.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReporteEntity, User, AeropuertoEntity])],
  providers: [ReportService],
  controllers: [ReportController],
})
export class ReportModule {}
