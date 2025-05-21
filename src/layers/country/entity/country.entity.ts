import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('pais')
export class Country {
  @PrimaryColumn()
  gid: number;

  @Column({ type: 'integer', nullable: true })
  scalerank?: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  featurecla?: string;

  @Column({type:'varchar',length:255,nullable:true})
  name?:string

  @Column({ type: 'integer', nullable: true })
  labelrank?: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  sovereignt?: string;

  @Column({ type: 'varchar', length: 3, nullable: true })
  sov_a3?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  type?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  admin?: string;

  @Column({ type: 'varchar', length: 3, nullable: true })
  adm0_a3?: string;

  @Column({ type: 'integer', nullable: true })
  geou_dif?: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  geounit?: string;

  @Column({ type: 'varchar', length: 3, nullable: true })
  gu_a3?: string;

  @Column({ type: 'integer', nullable: true })
  su_dif?: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  subregion?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  region_un?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  region_wb?: string;

  @Column({ type: 'integer', nullable: true })
  pop_est?: number;

  @Column({ type: 'integer', nullable: true })
  gdp_md_est?: number;

  @Column({ type: 'integer', nullable: true })
  pop_year?: number;

  @Column({ type: 'integer', nullable: true })
  lastcensus?: number;

  @Column({ type: 'integer', nullable: true })
  gdp_year?: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  economy?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  income_grp?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  wikipedia?: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  fips_10?: string;

  @Column({ type: 'varchar', length: 3, nullable: true })
  iso_a2?: string;

  @Column({ type: 'varchar', length: 3, nullable: true })
  iso_a3?: string;

  @Column({ type: 'integer', nullable: true })
  iso_n3?: number;

  @Column({ type: 'varchar', length: 3, nullable: true })
  un_a3?: string;

  @Column({ type: 'varchar', length: 3, nullable: true })
  wb_a2?: string;

  @Column({ type: 'varchar', length: 3, nullable: true })
  wb_a3?: string;

  @Column({ type: 'integer', nullable: true })
  woe_id?: number;

  @Column({ type: 'varchar', length: 10, nullable: true })
  adm0_a3_is?: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  adm0_a3_us?: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  adm0_a3_un?: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  adm0_a3_wb?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  continent?: string;

  @Column({ type: 'geometry', spatialFeatureType: 'MultiPolygon', srid: 4326, nullable: true })
  geom?: string;
}
