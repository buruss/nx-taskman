
import { IsNotEmpty } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
export class PaginationInputDto {

  @IsNotEmpty()
  @Field()
  itemCount: number;

  @IsNotEmpty()
  @Field()
  page: number;

}