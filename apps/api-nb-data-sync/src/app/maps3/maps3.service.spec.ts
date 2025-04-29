import { Test, TestingModule } from '@nestjs/testing';
import { Maps3Service } from './maps3.service';

describe('Maps3Service', () => {
  let service: Maps3Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Maps3Service],
    }).compile();

    service = module.get<Maps3Service>(Maps3Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
