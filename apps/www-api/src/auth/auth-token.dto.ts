import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class AuthTokenDto {

  @Field()
  token: string;

}