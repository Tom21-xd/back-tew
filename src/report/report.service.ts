import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CreateReportDto } from './dto/create-report.dto';
import { ReporteEntity } from './entities/report.entity';
import { AeropuertoEntity } from 'src/layers/airport/entity/airport.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ReportService {
  constructor(
    @InjectRepository(ReporteEntity)
    private reportRepository: Repository<ReporteEntity>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(AeropuertoEntity)
    private aeropuertoRepository: Repository<AeropuertoEntity>,
  ) {}

  async create(dto: CreateReportDto): Promise<ReporteEntity> {
    const usuario = await this.userRepository.findOneBy({ id_usuario: dto.fk_id_usuario });
    const aeropuerto = await this.aeropuertoRepository.findOneBy({ id: dto.fk_gid_aeropuerto });

    if (!usuario || !aeropuerto) {
      throw new Error('Usuario o aeropuerto no encontrados');
    }

    const report = this.reportRepository.create({
      usuario,
      aeropuerto,
      fechaReporte: new Date(dto.fecha_reporte),
    });

    return await this.reportRepository.save(report);
  }
  async findAll(): Promise<ReporteEntity[]> {
    return this.reportRepository.find({
      relations: ['usuario', 'aeropuerto'],
    });
  }

  async findOne(idReporte: number): Promise<ReporteEntity | null> {
    return this.reportRepository.findOne({
      where: { idReporte },
      relations: ['usuario', 'aeropuerto'],
    });
  }

  async findByUsuario(idUsuario: number): Promise<ReporteEntity[]> {
    return this.reportRepository.find({
      where: { usuario: { id_usuario: idUsuario } },
      relations: ['usuario', 'aeropuerto'],
    });
  }

  async findByAeropuerto(idAeropuerto: number): Promise<ReporteEntity[]> {
    return this.reportRepository.find({
      where: { aeropuerto: { id: idAeropuerto } },
      relations: ['usuario', 'aeropuerto'],
    });
  }

  async findByDateRange(start: Date, end: Date): Promise<ReporteEntity[]> {
    return this.reportRepository.find({
      where: { fechaReporte: Between(start, end) },
      relations: ['usuario', 'aeropuerto'],
    });
  }
}
