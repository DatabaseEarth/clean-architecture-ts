import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ICurrentUserPayload } from '@/shared-kernel/interfaces';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): ICurrentUserPayload => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
