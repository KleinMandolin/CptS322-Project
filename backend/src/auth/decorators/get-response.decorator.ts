import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetResponse = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    return ctx.switchToHttp().getResponse();
  },
);
