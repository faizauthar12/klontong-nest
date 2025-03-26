import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CategorySchema } from '../category/category.entity';
import { JoinTable } from 'typeorm/browser';

@Entity('products')
export class ProductSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  sku: string;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  description: string;

  @Column({ nullable: false })
  weight: number;

  @Column({ nullable: false })
  width: number;

  @Column({ nullable: false })
  length: number;

  @Column({ nullable: false })
  height: number;

  @Column({ nullable: false })
  image: string;

  @Column({ nullable: false })
  price: number;

  @ManyToOne(() => CategorySchema, (categorySchema) => categorySchema.id)
  public category: CategorySchema;
}
