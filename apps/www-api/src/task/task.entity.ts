import { Field, ObjectType, ID, } from 'type-graphql'
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { TaskStatus } from "@nx-taskman/constants";
import { User } from "../user/user.entity";
import { Exclude, Expose } from 'class-transformer';

@Exclude()
@Entity()
@ObjectType()
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(type => ID, { name: 'tid' })
  @Expose({ name: 'tid' })
  id: number;

  @Column()
  @Field({ name: 'tit', nullable: false })
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
  @Field(type => TaskStatus, { name: 'st', nullable: false })  // enum 인 경우 type 명시 필수
  @Expose({ name: 'st' })
  status: TaskStatus;

  @Column()
  userId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // user는 존재하지 않는 필드임.
  // TaskResolver에서 @ResolveProperty() user() 메서드를 사용하려면 필요함
  @Field(() => User)
  @ManyToOne(type => User, user => user.tasks, { eager: false })
  user: User;
}