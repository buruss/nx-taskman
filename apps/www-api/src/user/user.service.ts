import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { SignInInput } from '../auth/sign-in.input';
import { SignUpInput } from '../auth/sign-up.input';
import { User } from './user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) { }

  signUp(signUpInput: SignUpInput): Promise<User> {
    return this.userRepository.signUp(signUpInput);
  }

  signIn(signInInput: SignInInput): Promise<string> {
    return this.userRepository.validateUserPassword(signInInput);
  }

  findOne(username: string): Promise<User> {
    return this.userRepository.findOne({ username: username }, { loadEagerRelations: false });
  }

  findByIds(ids: number[]): Promise<User[]> {
    return this.userRepository.findByIds(ids);
  }
}
