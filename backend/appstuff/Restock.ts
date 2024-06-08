import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Ingredient } from "./Ingredient";

@Entity()
export class Restock {
    @PrimaryGeneratedColumn()
    restock_id: number;

    @Column()
    price: number;

    @Column()
    restock_date: Date;

    @Column()
    distributor: string;

    @ManyToMany(() => Ingredient)
    @JoinTable()
    ingredients: Ingredient[];
}
