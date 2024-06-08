import { EntityRepository, Repository } from "typeorm";
import { RecipeIngredients } from "../entity/RecipeIngredients";

@EntityRepository(RecipeIngredients)
export class RecipeIngredientsRepository extends Repository<RecipeIngredients> {
    async findByRecipeId(recipe_id: number): Promise<RecipeIngredients[]> {
        return this.find({ where: { recipe: { recipe_id } }, relations: ["ingredient"] });
    }

    async findByIngredientId(ing_id: number): Promise<RecipeIngredients[]> {
        return this.find({ where: { ingredient: { ing_id } }, relations: ["recipe"] });
    }

    async createRecipeIngredients(recipe_id: number, ing_id: number, qty: number): Promise<RecipeIngredients> {
        const recipeIngredients = new RecipeIngredients();
        recipeIngredients.recipe = { recipe_id } as any;
        recipeIngredients.ingredient = { ing_id } as any;
        recipeIngredients.qty = qty;
        return this.save(recipeIngredients);
    }
}
