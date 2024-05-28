// Provides the necessary structure for entities to be retrieved from or placed into the database.
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// Creates an entity for typeorm to do some black-box magic.
@Entity()
export class Count {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  value: number;
}
