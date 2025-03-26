import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductSchema } from '../product/product.entity';

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

  @Column({ nullable: true })
  updatedAt: Date;

  @Column({ nullable: true })
  deletedAt: Date;

  @OneToMany(() => ProductSchema, (productSchema) => productSchema.category)
  products: ProductSchema[];
}
