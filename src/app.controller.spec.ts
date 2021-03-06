import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe.skip('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  /**
 * Day 11
 */
 describe('day 11 part 1', () => {
  it('should be the answer to day 11 part 1', () => {
    expect(appController.getDay11Part1()).toBe(1755);
  });
});
  
describe('day 11 part 2', () => {
  it('should be the answer to day 11 part 2', () => {
    expect(appController.getDay11Part2()).toBe(212);
  });
});


  /**
 * Day 10
 */
 describe('day 10 part 1', () => {
  it('should be the answer to day 10 part 1', () => {
    expect(appController.getDay10Part1()).toBe(318099);
  });
});
  
describe('day 10 part 2', () => {
  it('should be the answer to day 10 part 2', () => {
    expect(appController.getDay10Part2()).toBe(2389738699);
  });
});

/**
 * Day 9
 */
 describe('day 9 part 1', () => {
  it('should be the answer to day 9 part 1', () => {
    expect(appController.getDay9Part1()).toBe(564);
  });
});
  
describe('day 9 part 2', () => {
  it('should be the answer to day 9 part 2', () => {
    expect(appController.getDay9Part2()).toBe(1038240);
  });
});

/**
 * Day 8
 */
 describe('day 8 part 1', () => {
  it('should be the answer to day 8 part 1', () => {
    expect(appController.getDay8Part1()).toBe(514);
  });
});
  
describe('day 8 part 2', () => {
  it('should be the answer to day 8 part 2', () => {
    expect(appController.getDay8Part2()).toBe(1012272);
  });
});


  /** ######################
 *  Day 6
 *  ######################
 */
   describe('day 6 part 1', () => {
    it('should be the answer to day 6 part 1', () => {
      expect(appController.getDay6Part1()).toBe(363101);
    });
  });
    
  describe('day 6 part 2', () => {
    it('should be the answer to day 5 part 2', () => {
      expect(appController.getDay6Part2()).toBe(1644286074024);
    });
  });


  /**
   * Day 5
   */
  describe('day 5 part 1', () => {
    it('should be the answer to day 5 part 1', () => {
      expect(appController.getDay5Part1()).toBe(12);
    });
  });
    
  describe('day 5 part 2', () => {
    it('should be the answer to day 5 part 2', () => {
      expect(appController.getDay5Part2()).toBe(17741);
    });
  });

  /**
   * Day 4
   */
   describe('day4 part 1', () => {
    it('should be the answer to day 4 part 1', () => {
      expect(appController.getDay4Part1()).toBe(35670);
    });
  });
    
  describe('day4 part 2', () => {
    it('should be the answer to day 4 part 2', () => {
      expect(appController.getDay4Part2()).toBe(22704);
    });
  });

  /**
   * Day 3
   */
   describe('day3 part 1', () => {
    it('should be the answer to day 3 part 1', () => {
      expect(appController.getDay3Part1()).toBe(775304);
    });
  });
    
  describe('day3 part 2', () => {
    it('should be the answer to day 3 part 2', () => {
      expect(appController.getDay3Part2()).toBe(1370737);
    });
  });

  /**
   * Day 2
   */
  describe('day2 part 1', () => {
    it('should be the answer to day 2 part 1', () => {
      expect(appController.getDay2Part1()).toBe(1882980);
    });
  });
    
  describe('day2 part 2', () => {
    it('should be the answer to day 2 part 2', () => {
      expect(appController.getDay2Part2()).toBe(1971232560);
    });
  });

  /**
   * Day 1
   */
  describe('day1 part 1', () => {
    it('should be the answer to day 1 part 1', () => {
      expect(appController.getDay1Part1()).toBe(1602);
    });
  });
  
  describe('day1 part 2', () => {
    it('should be the answer to day 1 part 2', () => {
      expect(appController.getDay1Part2()).toBe(1633);
    });
  });
});
