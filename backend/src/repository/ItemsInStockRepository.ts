import { EntityRepository, Repository } from "typeorm";
import { ItemsInStock } from "../entity/ItemsInStock";
import { RestockItems } from "../entity/RestockItems";

@EntityRepository(ItemsInStock)
export class ItemsInStockRepository extends Repository<ItemsInStock> {
    async findByIngredientId(ing_id: number): Promise<ItemsInStock[]> {
        return this.find({ where: { ingredient: { ing_id } }, relations: ["restockItems"] });
    }

    async createOrUpdateItemInStock(ing_id: number, qty: number, expiration_date: Date): Promise<ItemsInStock> {
        let itemInStock = await this.findOne({ where: { ingredient: { ing_id } } });
        if (itemInStock) {
            itemInStock.qty += qty; 
            itemInStock.expiration_date = expiration_date; 
        } else {
            itemInStock = new ItemsInStock();
            itemInStock.ingredient = { ing_id } as any;
            itemInStock.qty = qty;
            itemInStock.expiration_date = expiration_date;
        }
        return this.save(itemInStock);
    }

    async updateStockFromRestockItems(restockItems: RestockItems[]): Promise<void> {
        for (const restockItem of restockItems) {
            await this.createOrUpdateItemInStock(restockItem.ingredient.ing_id, restockItem.qty, restockItem.expiration_date);
        }
    }
}
