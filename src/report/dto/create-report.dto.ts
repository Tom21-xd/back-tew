import { IsInt, IsDateString } from 'class-validator';

export class CreateReportDto {
  @IsInt()
  fk_id_usuario: number;

  @IsInt()
  fk_gid_aeropuerto: number;

  @IsDateString()
  fecha_reporte: string; // formato ISO (ej: 2025-05-21T15:00:00Z)
}
