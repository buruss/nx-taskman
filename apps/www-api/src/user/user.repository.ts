import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { ConflictException, InternalServerErrorException, } from "@nestjs/common";
import { SignInInputDto } from "../auth/sign-in-input.dto";
import { SignUpInputDto } from '../auth/sign-up-input.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async signUp(signUpInputDto: SignUpInputDto): Promise<User> {

    const user = await signUpInputDto.toEntity();
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

  async validateUserPassword(signInInputDto: SignInInputDto): Promise<string> {
    const { name, pwd } = signInInputDto;

    const user = await this.findOne({ username: name });
    if (user && await user.validatePassword(pwd)) {
      return user.username;
    } else {
      return null;
    }
  }

}