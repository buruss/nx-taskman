import { Field, ObjectType, ID, } from 'type-graphql'
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable, OneToMany, ManyToOne } from "typeorm";
import { Exclude, Expose } from 'class-transformer';
import { ITodoItem } from '@nx-taskman/interfaces';
import { TodoLabel } from './todo-label.entity';
import { TodoConversation } from './todo-conversation.entity';
import { User } from '../user/user.entity';

@Exclude()
@Entity()
@ObjectType()
export class TodoItem extends BaseEntity implements ITodoItem {
  @PrimaryGeneratedColumn('uuid')
  @Field(type => ID)
  @Expose()
  id: string;

  @Column({length: 100})
  @Field()
  @Expose()
  title: string;

  @Column({nullable: true, length: 500})
  @Field({ nullable: true })
  @Expose()
  notes?: string;

  @Column()
  @Field()
  @Expose()
  userId: number;

  @Column({nullable: true, type: 'timestamptz' })
  @Field()
  @Expose()
  startDate?: Date;

  @Column({nullable: true, type: 'timestamptz' })
  @Field()
  @Expose()
  dueDate?: Date;

  @Column({default: false})
  @Field()
  @Expose()
  completed?: boolean;

  @Column({default: false})
  @Field()
  @Expose()
  starred?: boolean;

  @Column({default: false})
  @Field()
  @Expose()
  important?: boolean;

  @Column({default: false})
  @Field()
  @Expose()
  selected?: boolean;

  @Column({default: false})
  @Field()
  @Expose()
  deleted?: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
  
  // user는 존재하지 않는 필드임.
  // TaskResolver에서 @ResolveProperty() user() 메서드를 사용하려면 필요함
  @Field(type => User)
  @ManyToOne(type => User, user => user.todos, { onDelete: 'CASCADE' })
  user: User;

  // 다대다 관계
  @Field(type => [TodoLabel], {nullable: true})
  @ManyToMany(type => TodoLabel, todoLabel => todoLabel.todoItems, {eager: true, cascade: true})
  @JoinTable()
  @Expose()
  labels: TodoLabel[];
  
  // 존재하지 않는 필드임.
  // AuthResolver에서 @ResolveProperty() taskDetails() 메서드를 사용하려면 필요함
  @Field(type => [TodoConversation], {nullable: true})
  @OneToMany(type => TodoConversation, conv => conv.todo, { cascade: true })
  conversations: TodoConversation[];
}