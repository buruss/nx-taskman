import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { SignInInputDto } from '../auth/sign-in-input.dto';
import { SignUpInputDto } from '../auth/sign-up-input.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) { }

  signUp(signUpInputDto: SignUpInputDto): Promise<User> {
    return this.userRepository.signUp(signUpInputDto);
  }

  signIn(signInInputDto: SignInInputDto): Promise<string> {
    return this.userRepository.validateUserPassword(signInInputDto);
  }

  findOne(username: string): Promise<User> {
    return this.userRepository.findOne({ username: username }, { loadEagerRelations: false });
  }

  findByIds(ids: number[]): Promise<User[]> {
    return this.userRepository.findByIds(ids);
  }
}
