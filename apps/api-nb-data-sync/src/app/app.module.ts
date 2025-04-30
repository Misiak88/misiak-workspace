import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MapsModule } from './maps3/maps3.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MapsModule,
  ],
})
export class AppModule {}
