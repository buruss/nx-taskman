import { IsString, MinLength, MaxLength, Matches } from "class-validator";
import { InputType } from '@nestjs/graphql';

@InputType()
export class SignInInput {
  @IsString() @MinLength(2) @MaxLength(20)
  name: string;

  @IsString() @MinLength(8) @MaxLength(20)
  @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    { message: 'password is too weak.' }
  )
  pwd: string;
}