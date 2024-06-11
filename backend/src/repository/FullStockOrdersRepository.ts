import { EntityRepository, Repository } from "typeorm";
import { FullStockOrders } from "../entity/FullStockOrders";

@EntityRepository(FullStockOrders)
export class FullStockOrdersRepository extends Repository<FullStockOrders> {
    async findByRestockId(restock_id: number): Promise<FullStockOrders[]> {
        return this.find({ where: { restock: { restock_id } } });
    }

    async createFullStockOrder(restock_id: number, restock_items_id: number, qty: number, expiration_date: Date): Promise<FullStockOrders> {
        const fullStockOrder = new FullStockOrders();
        fullStockOrder.restock = { restock_id } as any;
        fullStockOrder.restockItems = { id: restock_items_id } as any;
        fullStockOrder.qty = qty;
        fullStockOrder.expiration_date = expiration_date;
        return this.save(fullStockOrder);
    }
}
