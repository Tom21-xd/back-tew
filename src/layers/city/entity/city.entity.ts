import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('ciudad')
export class CiudadEntity {
  @PrimaryGeneratedColumn()
  gid: number;

  @Column({ type: 'varchar', length: 255 })
  ciudad: string;

  @Column({ type: 'varchar', length: 255 })
  pais: string;

  @Column({ type: 'boolean' })
  capital: boolean;

  @Column({ type: 'geometry', spatialFeatureType: 'Point', srid: 4326 })
  geom: string;
}
