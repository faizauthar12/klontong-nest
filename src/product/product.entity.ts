import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
export class ProductSchema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Column({ nullable: false })
  categoryId: number;

  @Column()
  @Column({ nullable: false })
  sku: string;

  @Column()
  @Column({ nullable: false })
  name: string;

  @Column()
  @Column({ nullable: false })
  description: string;

  @Column()
  @Column({ nullable: false })
  weight: number;

  @Column()
  @Column({ nullable: false })
  width: number;

  @Column()
  @Column({ nullable: false })
  length: number;

  @Column()
  @Column({ nullable: false })
  height: number;

  @Column()
  @Column({ nullable: false })
  image: string;

  @Column()
  @Column({ nullable: false })
  price: number;
}
