import { EntityRepository, Repository } from "typeorm";
import { FullOrders } from "../entity/FullOrders";

@EntityRepository(FullOrders)
export class FullOrdersRepository extends Repository<FullOrders> {
    async findByOrderId(order_id: number): Promise<FullOrders[]> {
        return this.find({ where: { order: { order_id } } });
    }

    async createFullOrder(order_id: number, order_items_id: number, recipe_id: number): Promise<FullOrders> {
        const fullOrder = new FullOrders();
        fullOrder.order = { order_id } as any;
        fullOrder.orderItems = { id: order_items_id } as any;
        fullOrder.recipe = { recipe_id } as any;
        return this.save(fullOrder);
    }
}
