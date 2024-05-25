/*
* Provides the @Injectable() decorator. This marks the class as a provider for dependency injection. The decorator
* performs black-box magic that I'm not going to worry about. People get paid to worry about that.
*/
import { Injectable } from '@nestjs/common';
/*
* Provides the `@InjectRepository(repository: Repository<Entity>)` decorator that tells nestJS to inject the specified
* repository into the variable below.
*/
import { InjectRepository } from '@nestjs/typeorm';
/*
* Repository from `typeorm` provides access to structured entities within the database. Additionally, Repository
* provides access to entities created for use in services.
*/
import { Repository } from "typeorm";
// Import the entity to be used in this service.
import { User } from './user.entity'
// Import the data transfer object to convert input to structured data for the creation of entities.
import { CreateUserDto } from './dto/create-user.dto';

// Mark class as a provider for dependency injection. Allows the usage of the @InjectRepository decorator.
@Injectable()
export class UserService {
    constructor(
        // Inject the repository into the userRepository.
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    findAll(): Promise<User[]> {
        return this.userRepository.find(); // The find() method returns an array of all users in the table or repository
    }

    findOne(id: string): Promise<User> {
        return this.userRepository.findOne({ where: { id: parseInt(id, 10) } });
        // Use `findOne` with `where` clause to pass an object that specifies the condition for the query.
    }

    async remove(id: string): Promise<void> {
        await this.userRepository.delete(parseInt(id, 10)); // Delete if the id is found.
    }

    // Accept the parameter create user data transfer object: Encapsulates structured data for the creation of an entity.
    async create(createUserDto: CreateUserDto): Promise<User> {
        // The userRepository resolves the data transfer object to a User entity but does add this entity to the User table
        // in the database in use.
        const user = this.userRepository.create(createUserDto);
        // Must save this user for data to persist in the database.
        return this.userRepository.save(user)
    }
}