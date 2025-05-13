// src/hydrography/hydrography.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('hydrography')
export class Hydrography {
  @PrimaryGeneratedColumn()
  gid: number;  // ID de la hidrografía

  @Column()
  name: string;  // Nombre de la hidrografía

  @Column('geometry', { nullable: true })
  geometry: string;  // Geometría de la hidrografía (GeoJSON o WKT)
}
