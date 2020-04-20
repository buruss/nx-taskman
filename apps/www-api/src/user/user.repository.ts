import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { ConflictException, InternalServerErrorException, } from "@nestjs/common";
import { SignInInput } from "../auth/sign-in.input";
import { SignUpInput } from '../auth/sign-up.input';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async signUp(signUpInput: SignUpInput): Promise<User> {

    const user = await signUpInput.toEntity();
    console.log(user);

    try {
      return user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('username already exists.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(signInInput: SignInInput): Promise<string> {
    const { name, pwd } = signInInput;

    const user = await this.findOne({ username: name });
    if (user && await user.validatePassword(pwd)) {
      return user.username;
    } else {
      return null;
    }
  }

}