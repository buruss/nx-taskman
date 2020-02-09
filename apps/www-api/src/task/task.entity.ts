import { Field, ObjectType, ID, } from 'type-graphql'
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { TaskStatus } from "@nx-taskman/constants";
import { User } from "../user/user.entity";
import { Exclude, Expose } from 'class-transformer';
import { TaskDetail } from './task-detail.entity';

@Exclude()
@Entity()
@ObjectType()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(type => ID, { name: 'tid' })
  @Expose({ name: 'tid' })
  id: number;

  @Column({length: 100})
  @Field({ name: 'tit' })
  @Expose({ name: 'tit' })
  title: string;

  @Column()
  @Field({ name: 'desc', nullable: true })
  @Expose({ name: 'desc' })
  description: string;

  // 명확히 enum이라고 명시하지 않으면 postgresql 오류 발생함
  @Column({
    type: "enum",
    enum: TaskStatus,
    default: TaskStatus.OPEN
  })
  @Field(type => TaskStatus, { name: 'st' })  // enum 인 경우 type 명시 필수
  @Expose({ name: 'st' })
  status: TaskStatus;

  @Column()
  userId: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  // user는 존재하지 않는 필드임.
  // TaskResolver에서 @ResolveProperty() user() 메서드를 사용하려면 필요함
  @Field(type => User)
  @ManyToOne(type => User, user => user.tasks, { onDelete: 'CASCADE' })
  user: User;

  // 존재하지 않는 필드임.
  // AuthResolver에서 @ResolveProperty() taskDetails() 메서드를 사용하려면 필요함
  @Field(type => [TaskDetail], {nullable: true})
  @OneToMany(type => TaskDetail, taskDetail => taskDetail.task, { eager: true, cascade: true })
  taskDetails: TaskDetail[];
}