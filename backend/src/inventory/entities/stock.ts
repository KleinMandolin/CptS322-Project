import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { StockIngredients } from '@/inventory/entities/stock-ingredients';

@Entity()
export class Stock {
  @PrimaryGeneratedColumn()
  stockId: number;

  @Column('date')
  stockDate: Date;

  @OneToMany(
    () => StockIngredients,
    (stockIngredients) => stockIngredients.stock,
  )
  stockIngredients: StockIngredients;
}
