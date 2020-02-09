import { Field, ObjectType, ID, } from 'type-graphql'
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToMany, } from "typeorm";
import { Exclude, Expose } from 'class-transformer';
import { ITodoLabel } from '@nx-taskman/interfaces';
import { TodoItem } from './todo-item.entity';

@Exclude()
@Entity()
@ObjectType()
export class TodoLabel extends BaseEntity implements ITodoLabel {
  @PrimaryGeneratedColumn()
  @Field(type => ID)
  @Expose()
  id: number;

  @Column({length: 100})
  @Field()
  @Expose()
  handle: string;

  @Column({length: 100})
  @Field()
  @Expose()
  title: string;

  @Column({length: 10})
  @Field({ nullable: true })
  @Expose()
  color: string;

  @Field(type => [TodoItem], {nullable: true})
  @ManyToMany(type => TodoItem, todoItem => todoItem.labels, { onDelete: 'CASCADE'})
  @Expose()
  todoItems: TodoItem[];

}