import { registerEnumType } from '@nestjs/graphql';

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE'
}

// GraphQL에enum 타입 등록
registerEnumType(TaskStatus, {
  name: "TaskStatus",
});