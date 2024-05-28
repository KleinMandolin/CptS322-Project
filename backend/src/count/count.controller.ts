import { Controller, Get, Post, Put } from '@nestjs/common';
import { CountService } from './count.service';

// The controller class is for providing the APIs for the front-end to access. Logic is in the service class.
@Controller('count')
export class CountController {
  constructor(private readonly countService: CountService) {}

  // HTTP method for get - available at this path: /count/total
  @Get('total')
  getCount() {
    return this.countService.getCount();
  }

  // HTTP method for put - available at this path: /count/increment
  @Put('increment')
  incrementCount() {
    return this.countService.incrementCount();
  }

  // HTTP method for post - available at this path: /count/reset
  @Post('reset')
  resetCount() {
    return this.countService.resetCount();
  }

  // HTTP method for get - available at this path: /count/time
  @Get('time')
  getTime() {
    return this.countService.getCurrentTime();
  }
}
