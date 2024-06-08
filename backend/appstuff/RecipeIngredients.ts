import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Recipe } from "./Recipe";
import { Ingredient } from "./Ingredient";

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

    @Column()
    qty: number;
}
