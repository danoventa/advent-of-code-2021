import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  /**
   * 
   * Day 5
   */
   @Get() 
   getDay5Part1(): number {
     return this.appService.getDay5Part1();
   }
 
   @Get() 
   getDay5Part2(): number {
     return this.appService.getDay5Part2();
   }
 


 /**
   * 
   *  Day 4
   */
  @Get() 
  getDay4Part1(): number {
    return this.appService.getDay4Part1();
  }

  @Get() 
  getDay4Part2(): number {
    return this.appService.getDay4Part2();
  }

  /**
   * 
   *  Day 3
   */
   @Get() 
   getDay3Part1(): number {
     return this.appService.getDay3Part1();
   }
 
   @Get() 
   getDay3Part2(): number {
     return this.appService.getDay3Part2();
   }

  /**
   * 
   *  Day 2
   */
  @Get() 
  getDay2Part1(): number {
    return this.appService.getDay2Part1();
  }

  @Get() 
  getDay2Part2(): number {
    return this.appService.getDay2Part2();
  }

  /**
   * 
   *  Day 1
   */
  @Get() 
  getDay1Part1(): number {
    return this.appService.getDay1Part1();
  }

  @Get() 
  getDay1Part2(): number {
    return this.appService.getDay1Part2();
  }
}
