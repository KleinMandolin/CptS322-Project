import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Count } from './count.entity';

// Notifies nestJS this class can be injected into.
@Injectable()
export class CountService {
  constructor(
    // Inject the repository Count provided by the Count entity.
    @InjectRepository(Count)
    private countRepository: Repository<Count>,
  ) {}

  async getCount(): Promise<Count> {
    // Gets the count entity from the database where the id is 1; there will only ever be one item in the table.
    let count = await this.countRepository.findOne({ where: { id: 1 } });
    // If we could not find the count, create a new count object.
    if (!count) {
      // Create the count entity in memory.
      count = new Count();
      count.id = 1;
      count.value = 0;
      // Save the count entity to the database.
      await this.countRepository.save(count);
    }
    return count;
  }

  async incrementCount(): Promise<Count> {
    // Get the count entity from the database.
    const count = await this.getCount();
    count.value++;
    // Save and return the count.
    return this.countRepository.save(count);
  }

  async resetCount(): Promise<Count> {
    // Get the count entity in the database.
    const count = await this.getCount();
    count.value = 0;
    // Save and return the count.
    return this.countRepository.save(count);
  }

  getCurrentTime(): string {
    const currentTime = new Date();
    return currentTime.toLocaleString('en-US', {
      timeZone: 'PST',
      hour12: true,
    });
  }
}
