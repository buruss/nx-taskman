import { Field, ObjectType, ID, HideField, } from '@nestjs/graphql';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany, ManyToOne, Index } from "typeorm";
import { Exclude, Expose } from 'class-transformer';
import { ITodoItem } from '@nx-taskman/interfaces';
import { TodoLabel } from './todo-label.entity';
import { TodoConversation } from './todo-conversation.entity';
import { User } from '../user/user.entity';
import {  PagingInfo, IPaginatedResponse } from '@nx-taskman/logics';

@Exclude()
@Entity()
@ObjectType()
export class TodoItem extends BaseEntity implements ITodoItem {
  @PrimaryGeneratedColumn('uuid')
  @Field(type => ID)
  @Expose()
  id: string;

  @Column({length: 100})
  @Expose()
  title: string;

  @Column({nullable: true, length: 500})
  @Expose()
  notes?: string;

  @Column()
  @Expose()
  userId: number;

  @Field() // graphql plugin을 사용하는데도 불구하고 여전히 @Field가 필요한 경우가 종종 있음.
  @Column({nullable: true, type: 'timestamptz' })
  @Expose()
  startDate?: Date;

  @Field() // graphql plugin을 사용하는데도 불구하고 여전히 @Field가 필요한 경우가 종종 있음.
  @Column({nullable: true, type: 'timestamptz' })
  @Expose()
  dueDate?: Date;

  @Column({default: false})
  @Expose()
  completed?: boolean;

  @Column({default: false})
  @Expose()
  starred?: boolean;

  @Column({default: false})
  @Expose()
  important?: boolean;

  @Column({default: false})
  @Expose()
  selected?: boolean;

  @Column({default: false})
  @Expose()
  deleted?: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  @HideField()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  @HideField()
  updatedAt: Date;
  
  // user는 존재하지 않는 필드임.
  // TaskResolver에서 @ResolveProperty() user() 메서드를 사용하려면 필요함
  @Field(type => User) // graphql plugin을 사용하는데도 불구하고 여전히 @Field가 필요한 경우가 종종 있음.
  @ManyToOne(type => User, user => user.todos, { onDelete: 'CASCADE' })
  @Index() // PostgreSQL does NOT add indexes to foreign keys by default. This isn't an issue for the forward relation (user_id → user), but for the reverse relation (user → things by user_id) it can make the lookup very expensive. Always add indexes to your foreign keys.
  user: User;

  // 다대다 관계
  @Field(type => [TodoLabel], {nullable: true}) // graphql plugin을 사용하는데도 불구하고 여전히 @Field가 필요한 경우가 종종 있음.
  @ManyToMany(type => TodoLabel, todoLabel => todoLabel.todoItems, {eager: true, cascade: true})
  @JoinTable({name: 'todo_item_labels'})
  @Expose()
  labels?: TodoLabel[];
  
  // 존재하지 않는 필드임.
  // AuthResolver에서 @ResolveProperty() taskDetails() 메서드를 사용하려면 필요함
  @Field(type => [TodoConversation], {nullable: true}) // graphql plugin을 사용하는데도 불구하고 여전히 @Field가 필요한 경우가 종종 있음.
  @OneToMany(type => TodoConversation, conv => conv.todo, { cascade: true })
  conversations?: TodoConversation[];
}

// 페이징 구조
@ObjectType()
export class PaginatedTodoItems implements IPaginatedResponse<TodoItem> {
  @Field(type => [TodoItem])
  readonly items: TodoItem[];

  @Field(type => PagingInfo)
  readonly paging: PagingInfo;
}
