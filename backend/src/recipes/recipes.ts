import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { RecipeIngredients } from '@/recipe-ingredients/recipe-ingredients';
import { OrderDetails } from '@/order-details/order-details';

@Entity()
export class Recipes {
  @PrimaryColumn({ nullable: false })
  recipeName: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column({
    type: 'enum',
    enum: ['appetizer', 'entree', 'dessert', 'beverage'],
    default: 'entree',
  })
  mealType: 'appetizer' | 'entree' | 'dessert' | 'beverage';

  @Column('text', { nullable: true })
  descriptions: string;

  @OneToMany(() => RecipeIngredients, (recipeDetails) => recipeDetails.recipe)
  recipeDetails: RecipeIngredients[];

  @OneToMany(
    () => OrderDetails,
    (orderDetails: OrderDetails) => orderDetails.recipe,
  )
  orderDetails: OrderDetails;
}
