import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('logs')
export class LogSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  module: string;

  @Column({ nullable: false })
  event: string;

  @Column({ nullable: false })
  payload: string;

  @Column({ nullable: false })
  created_at: Date;
}
