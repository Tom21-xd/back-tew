import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('departamento')
export class DepartamentoEntity {
  @PrimaryGeneratedColumn()
  gid: number;

  @Column({ type: 'varchar', length: 255 })
  nom_depart: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  acto_admin?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  observacio?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  departamen?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  cod_depart?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  cod_dane?: string;

  @Column({ type: 'float', nullable: true })
  shape_area?: number;

  @Column({ type: 'float', nullable: true })
  shape_len?: number;

  @Column({ type: 'geometry', spatialFeatureType: 'Polygon', srid: 4326 })
  geom: string;
}
