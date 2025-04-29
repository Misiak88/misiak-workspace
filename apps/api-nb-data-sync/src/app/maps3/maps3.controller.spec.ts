import { Test, TestingModule } from '@nestjs/testing';
import { Maps3Controller } from './maps3.controller';

describe('Maps3Controller', () => {
  let controller: Maps3Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Maps3Controller],
    }).compile();

    controller = module.get<Maps3Controller>(Maps3Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
