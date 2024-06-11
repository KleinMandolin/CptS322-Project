import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Recipe } from "./Recipe";
import { Ingredient } from "./Ingredient";
import { RecipeDetails } from "./RecipeDetails";

@Entity()
export class RecipeIngredients {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Recipe, recipe => recipe.recipeIngredients, { eager: true })
    @JoinColumn({ name: "fkey_recipe_id" })
    recipe: Recipe;

    @ManyToOne(() => Ingredient, ingredient => ingredient.recipeIngredients, { eager: true })
    @JoinColumn({ name: "fkey_ing_id" })
    ingredient: Ingredient;

    @ManyToOne(() => RecipeDetails, recipeDetails => recipeDetails.recipeIngredients, { eager: true })
    @JoinColumn({ name: "fkey_recipe_details_id" })
    recipeDetails: RecipeDetails;

    @Column()
    qty: number;
}
