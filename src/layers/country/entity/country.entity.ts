// src/country/country.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('country')
export class Country {
  @PrimaryGeneratedColumn()
  gid: number;  // ID del país

  @Column()
  name: string;  // Nombre del país

  @Column('geometry', { nullable: true })
  geometry: string;  // Geometría (GeoJSON o WKT) para la localización del país
}
