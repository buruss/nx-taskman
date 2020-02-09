import { Field, ObjectType, ID, InputType, } from 'type-graphql'
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, } from "typeorm";
import { Exclude, Expose } from 'class-transformer';
import { ITodoConversation } from '@nx-taskman/interfaces';
import { User } from '../user/user.entity';
import { TodoItem } from './todo-item.entity';

@Exclude()
@Entity()
@ObjectType()
// @InputType('TodoConversationInput')
export class TodoConversation extends BaseEntity implements ITodoConversation {
  @PrimaryGeneratedColumn()
  // InputType용으로 사용될 때 id를 누락시킬 수 있어야 해서 널 허용 속성 추가함
  @Field(type => ID) //, {nullable: true})
  @Expose()
  id: number;

  @Column()
  @Field()
  @Expose()
  todoId: string;

  @Column()
  @Field()
  @Expose()
  userId: number;

  @Column({length: 100})
  @Field()
  @Expose()
  message: string;

  @Column({ type: 'timestamptz' })
  @Field()
  @Expose()
  sentAt: Date;

  // todo는 존재하지 않는 필드임.
  // TaskResolver에서 @ResolveProperty() todo() 메서드를 사용하려면 필요함
  @Field(type => TodoItem)
  @ManyToOne(type => TodoItem, todo => todo.conversations, { onDelete: 'CASCADE' })
  todo: TodoItem;

  // user는 존재하지 않는 필드임.
  // TaskResolver에서 @ResolveProperty() user() 메서드를 사용하려면 필요함
  @Field(type => User)
  @ManyToOne(type => User, user => user.conversations, { onDelete: 'CASCADE' })
  user: User;
}