import { ConfigPort } from "@/application/common/ports/config.port";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
    constructor(private readonly configService: ConfigPort) { }

    getConfig() {
        return {
            port: this.configService.get<number>('app.port'),
            host: this.configService.get<string>('app.host')
        }
    }
}