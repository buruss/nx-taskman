import { Field, ObjectType, ID } from 'type-graphql'
import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Unique, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Task } from "../task/task.entity";
import { encrypt } from '@nx-taskman/logics';
import { Exclude, Expose } from 'class-transformer';

@Entity() // typeOrm 용
@ObjectType() // type-graphql 에서 graph api 용 DTO 객체 생성
@Exclude() // class-transformer로 rest api 용 DTO 객체 생성
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(type => ID, { name: 'uid' })
  @Expose({ name: 'uid' })
  id: number;

  @Column()
  @Field({ name: 'uname', nullable: false }) // GraphQL 응답용 필드명을 바꿈. 보안성 강화
  @Expose({ name: 'uname' }) // class-transformer로 rest api 용 DTO 객체 적용
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column({ nullable: true })
  @Field({ name: 'emaddr', nullable: true })
  @Expose({ name: 'emaddress' })
  email: string;

  @Column({ nullable: true })
  birthDate: Date;

  // tasks는 존재하지 않는 필드임.
  // AuthResolver에서 @ResolveProperty() tasks() 메서드를 사용하려면 필요함
  @Field(() => [Task])
  @OneToMany(type => Task, task => task.user, { eager: true })
  tasks: Task[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  /**
   * 비번 문자열을 암호화하여 salt와 password 멤버를 채움
   * @param pwd 비번에 사용할 평문 비번
   */
  async generatePassword(pwd: string) {
    const { salt, password } = await encrypt(pwd);
    // 중요!! 유저마다 고유의 솔트를 생성하여 보안 수준을 높임
    this.salt = salt;
    this.password = password;
  }

  async validatePassword(pwd: string): Promise<boolean> {
    const { password } = await encrypt(pwd, this.salt);
    return password === this.password;
  }
}