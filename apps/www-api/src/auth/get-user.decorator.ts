import { createParamDecorator } from "@nestjs/common";
import { User } from "../user/user.entity";

export const GetUser = createParamDecorator((data, req): User => {
  return req.user;
});

export const GqlUser = createParamDecorator(
  (data, [root, args, ctx, info]): User => ctx.req && ctx.req.user,
);