import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "@nx-taskman/constants";

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];

  transform(value: string) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`"${value}" is an invalid status.`);
    }
    return value;
  }

  private isStatusValid(status: string) {
    return this.allowedStatuses.map(status => status.toString()).includes(status);
  }
}