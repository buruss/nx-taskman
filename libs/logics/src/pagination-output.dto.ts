import { Field, ObjectType, ClassType} from 'type-graphql'
// import { Pagination } from 'nestjs-typeorm-paginate';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IPaginatedResponse<TItem> {
  readonly items: TItem[];
  readonly page: number;
  readonly itemCount: number;
  readonly totalItems: number;
  readonly pageCount: number;
}

export const getPaginatedResponse = function<TItem> (TItemClass: ClassType<TItem>) {

  @ObjectType({ isAbstract: true })
  abstract class PaginatedResponse implements IPaginatedResponse<TItem> {
    @Field(type => [TItemClass])
    readonly items: TItem[];

    @Field()
    readonly page: number;
      
    @Field()
    readonly itemCount: number;

    @Field()
    readonly totalItems: number;
    
    @Field()
    readonly pageCount: number;
    
  }

  return PaginatedResponse;
}