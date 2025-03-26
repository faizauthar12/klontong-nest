export class FindProductDto {
  id: number;
  sku: string;
  name: string;
  description: string;
  weight: number;
  width: number;
  length: number;
  height: number;
  image: string;
  price: number;
  categoryId: number | null;
  categoryName: string | null;
}
