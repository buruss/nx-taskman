import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class AuthTokenDto {

  @Field({ nullable: false })
  accessToken: string;

}