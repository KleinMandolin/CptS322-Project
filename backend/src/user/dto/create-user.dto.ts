export class CreateUserDto {
/*
* The 'CreateUserDto' class defines the structure of data necessary to create a new user. This ensures only properly
* structured data is passed to the service method. Used to transfer data from the client (via API request) to the
* service layer.
*/
    name: string;
    email: string;
    password: string;
}