// src/hydrography/hydrography.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('hidrografia')
export class Hydrography {
  @PrimaryGeneratedColumn()
  gid: number; 

  @Column({ type: 'varchar', nullable: true })
  nombre?: string;

  @Column({ type: 'geometry', spatialFeatureType: 'MultiPolygon', srid: 4326, nullable: true })
  geom?: string;
}
