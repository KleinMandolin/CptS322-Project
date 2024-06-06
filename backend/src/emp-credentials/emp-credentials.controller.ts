import { Controller } from '@nestjs/common';
import { EmpCredentialsService } from './emp-credentials.service';

// Decorator with base path, 'employee/credentials', indicates this route
// is the controller that handles emp_credentials info.
@Controller('employee/credentials')
export class EmpCredentialsController {
  constructor(private readonly empCredentialsService: EmpCredentialsService) {}
}
