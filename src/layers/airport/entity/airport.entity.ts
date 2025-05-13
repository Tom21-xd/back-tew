import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('aeropuerto')
export class AeropuertoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'geometry', spatialFeatureType: 'Point', srid: 4326 })
  geometry: string;

  @Column({ type: 'integer', nullable: true })
  cartodb_id?: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  featurecla?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  type?: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  abbrev?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  location?: string;

  @Column({ type: 'integer', nullable: true })
  scalerank?: number;

  @Column({ type: 'varchar', length: 10, nullable: true })
  iata_code?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  wikipedia?: string;

  @Column({ type: 'integer', nullable: true })
  natlscale?: number;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  updatedAt: Date;

  @Column({ type: 'varchar', length: 10, nullable: true })
  gps_code?: string;
}
