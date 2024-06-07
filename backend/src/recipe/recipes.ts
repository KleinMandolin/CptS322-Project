import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RecipeDetails } from '../recipe-details/recipe-details';

@Entity()
export class Recipes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  recipeName: string;

  @Column('money')
  price: number;

  @ManyToMany(() => RecipeDetails, (recipeDetails) => recipeDetails.recipe)
  recipeDetails: RecipeDetails[];
}
