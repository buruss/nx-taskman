import { Field, ObjectType, ID, HideField } from '@nestjs/graphql'
import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, Unique, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Task } from "../task/task.entity";
import { encrypt } from '@nx-taskman/logics';
import { Exclude, Expose } from 'class-transformer';
import { TodoItem } from '../todo/todo-item.entity';
import { TodoConversation } from '../todo/todo-conversation.entity';

@Entity() // typeOrm 용
@ObjectType('User') // @nestjs/graphql 에서 graph api 용 DTO 객체 생성
@Exclude() // class-transformer로 rest api 용 DTO 객체 생성
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(type => ID, { name: 'uid' })
  @Expose({ name: 'uid' })
  id: number;

  @Column({length: 100})
  @Field({ name: 'name' }) // GraphQL 응답용 필드명을 바꿈. 보안성 강화
  @Expose({ name: 'name' }) // class-transformer로 rest api 용 DTO 객체 적용
  username: string;

  @Column({nullable: true, length: 500})
  @Expose()
  thumb?: string;

  @Column({length: 100})
  @HideField()
  password: string;

  @Column({length: 50})
  @HideField()
  salt: string;

  @Column({ nullable: true, length: 50 })
  @Field({ name: 'emaddr', nullable: true })
  @Expose({ name: 'emaddress' })
  email: string;

  @Column({ nullable: true, type: 'timestamptz' })
  @HideField()
  birthDate: Date;

  // tasks는 존재하지 않는 필드임.
  // AuthResolver에서 @ResolveProperty() tasks() 메서드를 사용하려면 필요함
  @Field(type => [Task], {nullable: true})
  @OneToMany(type => Task, task => task.user, { eager: true, cascade: true })
  tasks?: Task[];

  // todos는 존재하지 않는 필드임.
  // AuthResolver에서 @ResolveProperty() todos() 메서드를 사용하려면 필요함
  @Field(type => [TodoItem], {nullable: true})
  @OneToMany(type => TodoItem, todo => todo.user, { cascade: true })
  todos?: TodoItem[];

  // conversations는 존재하지 않는 필드임.
  // AuthResolver에서 @ResolveProperty() conversations() 메서드를 사용하려면 필요함
  @Field(type => [TodoConversation], {nullable: true})
  @OneToMany(type => TodoConversation, conv => conv.user, { cascade: true })
  conversations?: TodoConversation[];

  @CreateDateColumn({ type: 'timestamptz' })
  @HideField()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  @HideField()
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