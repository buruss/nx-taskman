
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class PaginationInputDto {

  @IsNotEmpty()
  @Field()
  limit: number;

  @IsNotEmpty()
  @Field()
  page: number;

  @IsOptional()
  @IsNotEmpty()
  @Field()
  route?: string;

}