import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    order_id: number;

    @Column()
    price: number;

    @Column()
    order_date: Date;
}
