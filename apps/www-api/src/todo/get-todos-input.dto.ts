import { IsOptional, IsNotEmpty, IsString, IsNumber } from "class-validator";
import { Field, InputType, } from 'type-graphql';
import { PaginationInputDto, Default } from '@nx-taskman/logics';

@InputType()
export class GetTodosInputDto {
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  @Field({ nullable: true })
  label?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Field({ nullable: true })
  search?: string;

  @IsOptional()
  @Field(type => PaginationInputDto, {nullable: true})
  @Default({itemCount: 10, page:1})
  paging?: PaginationInputDto;  
}