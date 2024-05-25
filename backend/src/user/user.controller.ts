import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { CreateUserDto } from "./dto/create-user.dto";

@Controller('user') // This is the API prefix to access methods within this controller.
export class UserController {
    constructor(private readonly userService: UserService) {}

    /* Client sends a http method so APIs can be overloaded as long as the method is different
    * A unique endpoint is not necessary for unique http methods, although it may be best practice. */

    // Route to get all users
    @Get() // user/
    findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    // Route to get a user by ID
    @Get(':id') // user/id/     get
    findOne(@Param('id') id: string): Promise<User> {
        return this.userService.findOne(id);
    }

    // Route to delete user by ID
    @Delete(':id') // user/id/  delete
    remove(@Param('id') id: string): Promise<void> {
        return this.userService.remove(id);
    }

    // Route to create new user
    @Post() // user/    post
    create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.create(createUserDto);
    }
}
