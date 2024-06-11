import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { RecipeIngredients } from "./RecipeIngredients";
import { Recipe } from "./Recipe";

@Entity()
export class RecipeDetails {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @ManyToOne(() => Recipe, recipe => recipe.recipeDetails)
    @JoinColumn({ name: "recipe_id" })
    recipe: Recipe;

    @OneToMany(() => RecipeIngredients, recipeIngredients => recipeIngredients.recipeDetails)
    recipeIngredients: RecipeIngredients[];
}
