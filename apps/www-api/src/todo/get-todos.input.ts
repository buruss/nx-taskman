import { IsOptional, IsNotEmpty, IsString, IsNumber } from "class-validator";
import { InputType, Field, } from '@nestjs/graphql';
import { PaginationInput, Default } from '@nx-taskman/logics';

@InputType()
export class GetTodosInput {
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  label?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  search?: string;

  @Field(type => PaginationInput)
  @IsOptional()
  @Default({itemCount: 10, page:1})
  paging?: PaginationInput;  
}