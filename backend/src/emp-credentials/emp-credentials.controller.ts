import {
  Controller,
  Body,
  Get,
  BadRequestException,
  Post,
} from '@nestjs/common';
import { EmpCredentialsService } from './emp-credentials.service';
import { EmpCredentials } from './emp.credentials';

// Decorator with base path, 'employee/credentials', indicates this route
// is the controller that handles emp_credentials info.
@Controller('employee/credentials')
export class EmpCredentialsController {
  constructor(private readonly empCredentialsService: EmpCredentialsService) {}

  // Register a user using the JSON message.
  @Post('register')
  async register(
    @Body()
    body: {
      username: string;
      password: string;
      firstName: string;
      lastName: string;
      email: string;
    },
  ): Promise<EmpCredentials> {
    if (await this.empCredentialsService.employeeExists(body.username)) {
      throw new BadRequestException('User already exists');
    }
    return this.empCredentialsService.createCredentialAndInfo(
      body.username,
      body.password,
      body.email,
      body.firstName,
      body.lastName,
    );
  }
  // Login will change soon enough. This does not include two-factor auth.
  @Get('login')
  async login(
    @Body() body: { username: string; password: string },
  ): Promise<{ success: boolean }> {
    const isValid = await this.empCredentialsService.validateEmployee(
      body.username,
      body.password,
    );
    if (!isValid) {
      throw new BadRequestException('Invalid Credentials');
    }
    return { success: true };
  }
}
