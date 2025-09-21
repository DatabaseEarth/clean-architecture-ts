import { AppService } from './app.service';
import { AppRequest, AppResponse } from './app.dto';
import { ApiResponse } from './common/interfaces';
import { LoggerPort } from '@/application/common/ports/logger.port';
export declare class AppController {
    private readonly appService;
    private readonly logger;
    constructor(appService: AppService, logger: LoggerPort);
    example(): Promise<ApiResponse<AppResponse>>;
    exampleArray(): Promise<ApiResponse<AppResponse[]>>;
    examplePaginate(appRequest: AppRequest): Promise<ApiResponse<AppResponse[]>>;
    exampleNull(): Promise<ApiResponse<null>>;
    testError(): Promise<ApiResponse<null>>;
}
//# sourceMappingURL=app.controller.d.ts.map