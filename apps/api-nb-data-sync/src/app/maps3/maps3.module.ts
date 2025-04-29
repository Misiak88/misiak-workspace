import { Module } from '@nestjs/common';
import { Maps3Controller } from './maps3.controller';
import { Maps3Service } from './maps3.service';

@Module({
  controllers: [Maps3Controller],
  providers: [Maps3Service],
})
export class Maps3Module {}
