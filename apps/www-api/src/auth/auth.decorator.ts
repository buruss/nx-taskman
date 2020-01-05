import { createParamDecorator } from "@nestjs/common";
import { User } from "../user/user.entity";
import { Response } from 'express';

export const GetUser = createParamDecorator((data, req): User => {
  return req.user;
});

export const GqlUser = createParamDecorator(
  (data, [root, args, ctx, info]): User => ctx.req && ctx.req.user,
);

export const ResGql = createParamDecorator(
  (data, [root, args, ctx, info]): Response => ctx.res,
);