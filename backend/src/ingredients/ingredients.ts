import { Column, Entity, ManyToMany, OneToMany, PrimaryColumn } from 'typeorm';
import { RecipeIngredients } from '@/recipe-ingredients/recipe-ingredients';
import { StockIngredients } from '@/inventory/entities/stock-ingredients';

@Entity()
export class Ingredients {
  @PrimaryColumn()
  ingredientName: string;

  @Column({ default: 'Unit' })
  unit: string;

  @ManyToMany(
    () => RecipeIngredients,
    (recipeDetails) => recipeDetails.ingredient,
  )
  recipeDetails: RecipeIngredients[];

  @OneToMany(
    () => StockIngredients,
    (stockIngredients) => stockIngredients.ingredients,
  )
  stockIngredients: StockIngredients;
}
