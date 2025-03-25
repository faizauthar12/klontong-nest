import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('categories')
export class CategorySchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  createdAt: Date;

  @Column({ nullable: false })
  updatedAt: Date;

  @Column({ nullable: false })
  deletedAt: Date;
}
