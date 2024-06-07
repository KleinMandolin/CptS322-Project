import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RecipeDetails } from '../recipe-details/recipe-details';

@Entity()
export class Ingredients {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  ingredientName: string;

  @Column({ default: 0 })
  qty: number;

  // Many-to-many relationship; for many ingredients, we have many corresponding ids in the recipeDetails.
  @ManyToMany(() => RecipeDetails, (recipeDetails) => recipeDetails.ingredient)
  recipeDetails: RecipeDetails[];
}
