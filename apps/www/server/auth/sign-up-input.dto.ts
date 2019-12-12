import { IsString, MinLength, MaxLength, Matches } from "class-validator";
import { Field, InputType } from 'type-graphql';
import { User } from 'apps/www/server/user/user.entity';

@InputType()
export class SignUpInputDto {
  @IsString() @MinLength(2) @MaxLength(20)
  @Field()
  uname: string;

  @IsString() @MinLength(8) @MaxLength(20)
  @Matches(
    /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
    { message: 'password is too weak.' }
  )
  @Field()
  pwd: string;

  @IsString() @MinLength(4) @MaxLength(20)
  @Field({ nullable: true })
  emaddr: string;

  async toEntity(): Promise<User> {
    const user = new User();
    user.username = this.uname;
    await user.generatePassword(this.pwd); // 내부에서 salt, password 값이 생성되어 필드에 기록함
    user.email = this.emaddr;
    return user;
  }
}