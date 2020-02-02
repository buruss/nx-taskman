import { Field, ObjectType, ID, } from 'type-graphql'
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Exclude, Expose } from 'class-transformer';
import { Task } from './task.entity';

@Exclude()
@Entity()
@ObjectType()
export class TaskDetail extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(type => ID, { name: 'tdid' })
  @Expose({ name: 'tdid' })
  id: number;

  @Column()
  @Field({ name: 'dtype', nullable: false })
  @Expose({ name: 'dtype' })
  detailType: string;

  @Column()
  @Field({ name: 'det', nullable: true })
  @Expose({ name: 'det' })
  detail: string;

  @Column()
  @Field({ name: 'tid', nullable: false })
  @Expose({ name: 'tid' })
  taskId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // task는 존재하지 않는 필드임.
  // @ResolveProperty() task() 메서드를 사용하려면 필요함
  @Field(() => Task, {nullable: true})
  @ManyToOne(type => Task, task => task.taskDetails, { eager: false, onDelete: 'CASCADE' })
  task: Task;

}