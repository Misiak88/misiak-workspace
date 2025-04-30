import { Test, TestingModule } from '@nestjs/testing';
import { MapsService } from './maps3.service';

describe('Maps3Service', () => {
  let service: MapsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MapsService],
    }).compile();

    service = module.get<MapsService>(MapsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
