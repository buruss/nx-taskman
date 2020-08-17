import { Field, ObjectType, ID, } from '@nestjs/graphql'
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, Index, } from "typeorm";
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
  @Field(() => ID) //, {nullable: true})
  @Expose()
  id: number;

  @Column()
  @Expose()
  todoId: string;

  @Column()
  @Expose()
  userId: number;

  @Column({length: 100})
  @Expose()
  message: string;

  @Field()
  @Column({ type: 'timestamptz' })
  @Field()
  @Expose()
  sentAt: Date;

  // todo는 존재하지 않는 필드임.
  // TaskResolver에서 @ResolveProperty() todo() 메서드를 사용하려면 필요함
  @Field(type => TodoItem)
  @ManyToOne(() => TodoItem, todo => todo.conversations, { onDelete: 'CASCADE' })
  @Index() // PostgreSQL does NOT add indexes to foreign keys by default. This isn't an issue for the forward relation (user_id → user), but for the reverse relation (user → things by user_id) it can make the lookup very expensive. Always add indexes to your foreign keys.
  todo: TodoItem;

  // user는 존재하지 않는 필드임.
  // TaskResolver에서 @ResolveProperty() user() 메서드를 사용하려면 필요함
  @Field(type => User)
  @ManyToOne(() => User, user => user.conversations, { onDelete: 'CASCADE' })
  @Index() // PostgreSQL does NOT add indexes to foreign keys by default. This isn't an issue for the forward relation (user_id → user), but for the reverse relation (user → things by user_id) it can make the lookup very expensive. Always add indexes to your foreign keys.
  user: User;
}