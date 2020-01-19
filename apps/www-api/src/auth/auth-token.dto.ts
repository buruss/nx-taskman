import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class AuthTokenDto {

  @Field({ nullable: false })
  token: string;

}