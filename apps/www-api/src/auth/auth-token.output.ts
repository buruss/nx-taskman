import { ObjectType,  } from '@nestjs/graphql';

@ObjectType()
export class AuthTokenOutput {
  token: string;
}