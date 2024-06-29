import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Stock } from '@/inventory/entities/stock';
import { Ingredients } from '@/ingredients/ingredients';

@Entity()
export class StockIngredients {
  @PrimaryColumn()
  stockId: number;

  @PrimaryColumn()
  ingredientName: string;

  @Column('decimal', { precision: 10, scale: 2 })
  qty: number;

  @Column('date')
  expirationDate: Date;

  @ManyToOne(() => Ingredients, (ingredients) => ingredients.stockIngredients)
  @JoinColumn({
    name: 'ingredientName',
    referencedColumnName: 'ingredientName',
  })
  ingredients: Ingredients;

  @ManyToOne(() => Stock, (stock) => stock.stockIngredients)
  @JoinColumn({ name: 'stockId', referencedColumnName: 'stockId' })
  stock: Stock;
}
