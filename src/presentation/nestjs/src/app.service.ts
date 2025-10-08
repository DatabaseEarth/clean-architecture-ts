import { ConfigPort } from '@/application/ports/config/config.port';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    @Inject('ConfigPort')
    private readonly configService: ConfigPort,
  ) {}

  getConfig() {
    return {
      port: this.configService.get<number>('app.port'),
      host: this.configService.get<string>('app.host'),
    };
  }
}
