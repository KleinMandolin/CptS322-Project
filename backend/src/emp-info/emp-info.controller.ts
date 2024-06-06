import { BadRequestException, Body, Controller, Get } from '@nestjs/common';
import { EmpInfo } from './emp.info';
import { EmpInfoService } from './emp-info.service';

@Controller('employee/info')
export class EmpInfoController {
  constructor(private readonly empInfoService: EmpInfoService) {}

  // Get the users information; email, username, first name, and last name.
  @Get('show')
  async getInfo(@Body() body: { username: string }): Promise<EmpInfo> {
    if (await this.empInfoService.containsInfo(body.username)) {
      return await this.empInfoService.getInfo(body.username);
    } else {
      throw new BadRequestException('User does not exist');
    }
  }
}
