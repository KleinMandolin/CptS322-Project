// Provides the necessary structure for entities to be retrieved from or placed into the database.
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @Column()
    email: string;

    @Column()
    password: string
}