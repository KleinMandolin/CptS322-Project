import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { Ingredient } from "./Ingredient";
import { RestockItems } from "./RestockItems";

@Entity()
export class ItemsInStock {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Ingredient, ingredient => ingredient.itemsInStock, { eager: true })
    @JoinColumn({ name: "ing_id" })
    ingredient: Ingredient;

    @OneToMany(() => RestockItems, restockItems => restockItems.itemInStock)
    restockItems: RestockItems[];

    @Column()
    qty: number;

    @Column()
    expiration_date: Date;
}
