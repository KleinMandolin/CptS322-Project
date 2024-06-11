import { EntityRepository, Repository } from "typeorm";
import { StockCustomerOrder } from "../entity/StockCustomerOrder";

@EntityRepository(StockCustomerOrder)
export class StockCustomerOrderRepository extends Repository<StockCustomerOrder> {
    async findByOrderId(order_id: number): Promise<StockCustomerOrder[]> {
        return this.find({ where: { order: { order_id } } });
    }

    async createStockCustomerOrder(restock_id: number, order_id: number, qty: number): Promise<StockCustomerOrder> {
        const stockCustomerOrder = new StockCustomerOrder();
        stockCustomerOrder.restock = { restock_id } as any;
        stockCustomerOrder.order = { order_id } as any;
        stockCustomerOrder.qty = qty;
        return this.save(stockCustomerOrder);
    }
}
