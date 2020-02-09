import { Field, ObjectType, ClassType} from 'type-graphql'
import { Pagination } from 'nestjs-typeorm-paginate';

export const getPaginatedResponse = function<TItem> (TItemClass: ClassType<TItem>) {

  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponse extends Pagination<TItem> {
    @Field(type => [TItemClass])
    readonly items: TItem[];

    @Field()
    readonly itemCount: number;
    
    @Field()
    readonly totalItems: number;
    
    @Field()
    readonly pageCount: number;
    
    @Field({nullable: true})
    readonly next?: string;
    
    @Field({nullable: true})
    readonly previous?: string;
  }

  return PaginatedResponse;
}