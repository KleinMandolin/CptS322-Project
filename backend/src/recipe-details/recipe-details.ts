import { Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm';
import { Recipes } from '../recipe/recipes';
import { Ingredients } from '../ingredients/ingredients';

@Entity()
export class RecipeDetails {
  // Both columns are primary in this case. This indicates a composite key.
  @PrimaryColumn()
  recipeId: number;

  @PrimaryColumn()
  ingredientId: number;

  @ManyToOne(() => Recipes, (recipe) => recipe.id)
  @JoinColumn({ name: 'recipeId' })
  recipe: Recipes;

  @ManyToOne(() => Ingredients, (ingredient) => ingredient.id)
  @JoinColumn({ name: 'ingredientId' })
  ingredient: Ingredients;
}
