import { Field, ObjectType, } from '@nestjs/graphql'

@ObjectType()
export class PagingInfo {
  @Field()
  readonly page: number;
  @Field()
  readonly itemCount: number;
  @Field()
  readonly totalItems: number;
  @Field()
  readonly pageCount: number;
}

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IPaginatedResponse<TItem> {
  readonly items: TItem[];
  readonly paging: PagingInfo;
}
