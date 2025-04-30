import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MapsService } from './maps3.service';
import { MapsController } from './maps3.controller';

@Module({
  imports: [HttpModule],
  providers: [MapsService],
  controllers: [MapsController],
})
export class MapsModule {}
