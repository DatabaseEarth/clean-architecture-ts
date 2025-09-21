import { NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
export declare class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction): void;
}
//# sourceMappingURL=logger.middleware.d.ts.map