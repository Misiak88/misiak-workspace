import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Maps3Controller } from './maps3/maps3.controller';
import { Maps3Module } from './maps3/maps3.module';

@Module({
  imports: [
    // 1. Wczytanie zmiennych z .env i udostępnienie ConfigService globalnie
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // 2. Twój moduł odpowiadający za fetch i endpoint /places
    Maps3Module,
  ],
  controllers: [Maps3Controller],
  providers: [],
})
export class AppModule {}
