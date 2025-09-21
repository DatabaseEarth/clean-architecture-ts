import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { modules } from './modules';
import { AppService } from './app.service';
import { CoreModule } from './core';
import { infrastructure } from './infrastructure';

@Module({
  imports: [
    CoreModule,
    ...infrastructure,
    ...modules,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
