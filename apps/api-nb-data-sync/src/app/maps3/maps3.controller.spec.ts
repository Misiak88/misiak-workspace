import { Test, TestingModule } from '@nestjs/testing';
import { MapsService } from './maps3.service';

describe('Maps3Controller', () => {
  let controller: MapsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MapsService],
    }).compile();

    controller = module.get<MapsService>(MapsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
