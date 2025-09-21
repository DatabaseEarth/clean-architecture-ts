import { ConfigPort } from "@/application/common/ports/config.port";
export declare class AppService {
    private readonly configService;
    constructor(configService: ConfigPort);
    getConfig(): {
        port: number;
        host: string;
    };
}
//# sourceMappingURL=app.service.d.ts.map