import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "../user/user.entity";
import { Response } from 'express';
import { GqlExecutionContext } from '@nestjs/graphql';

export const GetUser = createParamDecorator((data: unknown, context: ExecutionContext): User => {
  const request = context.switchToHttp().getRequest();
  return request.user;
});


export const GqlUser = createParamDecorator((data: unknown, context: ExecutionContext): User => {
  const ctx = GqlExecutionContext.create(context).getContext();
  return ctx.req && ctx.req.user;
});

export const ResGql = createParamDecorator((data: unknown, context: ExecutionContext): Response => {
  return GqlExecutionContext.create(context).getContext().res;
});
