import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('usuario') // nombre de tu tabla
export class User {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column({ length: 100 })
  nombre_usuario: string;

  @Column({ length: 100, unique: true })
  correo_usuario: string;

  @Column({ length: 100 })
  contrasenia_usuario: string;

  @Column({ length: 20, nullable: true })
  telefono_usuario: string;

  @Column({ type: 'date', nullable: true })
  fecharegistro_usuario: Date;

  @Column({ type: 'boolean', default: true })
  estado_usuario: boolean;
}
