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

  @Column({length: 100})
  @Field({ name: 'dtype' })
  @Expose({ name: 'dtype' })
  detailType: string;

  @Column({length: 500})
  @Field({ name: 'det', nullable: true })
  @Expose({ name: 'det' })
  detail: string;

  @Column()
  @Field({ name: 'tid' })
  @Expose({ name: 'tid' })
  taskId: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  // task는 존재하지 않는 필드임.
  // @ResolveProperty() task() 메서드를 사용하려면 필요함
  @Field(type => Task, {nullable: true})
  @ManyToOne(type => Task, task => task.taskDetails, { onDelete: 'CASCADE' })
  task: Task;

}