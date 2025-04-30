import { Controller, Get } from '@nestjs/common';
import { MapsService } from './maps3.service';
import { StationSummaryDto } from '@misiak-workspace/api-nb-data-sync-dto';

@Controller('places')
export class MapsController {
  constructor(private readonly maps: MapsService) {}

  @Get()
  findAll(): Promise<StationSummaryDto[]> {
    return this.maps.getPlaces();
  }
}
