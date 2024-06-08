import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { RecipeIngredients } from "./RecipeIngredients";

@Entity()
export class Recipe {
    @PrimaryGeneratedColumn()
    recipe_id: number;

    @Column()
    recipe_name: string;

    @Column()
    price: number;

    @OneToMany(() => RecipeIngredients, recipeIngredients => recipeIngredients.recipe)
    recipeIngredients: RecipeIngredients[];
}
