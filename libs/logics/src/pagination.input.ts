
import { IsNotEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class PaginationInput {

  @Field()
  @IsNotEmpty()
  itemCount: number;

  @Field()
  @IsNotEmpty()
  page: number;

}