import { AeropuertoEntity } from 'src/layers/airport/entity/airport.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
} from 'typeorm';

@Entity({ name: 'reporte' })
export class ReporteEntity {
  @PrimaryGeneratedColumn({ name: 'id_reporte' })
  idReporte: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'fk_id_usuario' })
  usuario: User;

  @ManyToOne(() => AeropuertoEntity)
  @JoinColumn({ name: 'fk_gid_aeropuerto' })
  aeropuerto: AeropuertoEntity;

  @Column({ name: 'fecha_reporte', type: 'timestamp' })
  fechaReporte: Date;
}
