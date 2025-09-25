/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { FieldMiddleware, MiddlewareContext, NextFn } from '@nestjs/graphql';

export const loggerMiddleware: FieldMiddleware = async (
  ctx: MiddlewareContext,
  next: NextFn,
) => {
  const fieldName = ctx.info.fieldName;
  const startTime = Date.now();

  if (!ctx.context.middlewareData) {
    ctx.context.middlewareData = {
      fieldTimings: [],
      totalFields: 0,
    };
  }

  const value = await next();
  const duration = Date.now() - startTime;

  ctx.context.middlewareData.fieldTimings.push({
    fieldName,
    duration,
  });
  ctx.context.middlewareData.totalFields++;

  console.log(`Duration: ${duration}ms`);
  console.log(`Value:`, value);

  return value;
};
