import { Field, ObjectType, ID, HideField, } from '@nestjs/graphql'
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, Index } from "typeorm";
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

  @Field({ name: 'dtype' })
  @Column({length: 100})
  @Expose({ name: 'dtype' })
  detailType: string;

  @Field({ name: 'det', nullable: true })
  @Column({length: 500})
  @Expose({ name: 'det' })
  detail: string;

  @Field({ name: 'tid' })
  @Column()
  @Expose({ name: 'tid' })
  taskId: number;

  // task는 존재하지 않는 필드임.
  // @ResolveProperty() task() 메서드를 사용하려면 필요함
  @Field(type => Task, {nullable: true})
  @ManyToOne(type => Task, task => task.taskDetails, { onDelete: 'CASCADE' })
  @Index() // PostgreSQL does NOT add indexes to foreign keys by default. This isn't an issue for the forward relation (user_id → user), but for the reverse relation (user → things by user_id) it can make the lookup very expensive. Always add indexes to your foreign keys.
  task?: Task;

  @CreateDateColumn({ type: 'timestamptz' })
  @HideField()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  @HideField()
  updatedAt: Date;

}