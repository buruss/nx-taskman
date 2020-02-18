
import gql from 'graphql-tag';
import { Pagination } from 'nestjs-typeorm-paginate';
import { ITodoItem, ITodoLabel } from '@nx-taskman/interfaces';

export default gql`query {
  getTodoInitialData(input: {
    paging: null
  }) {
    paginatedTodoItems {
      items {
        id
        title
        notes
        labels {
          id
          handle
          title
        }
      }
      itemCount
      totalItems
      pageCount
      next
      previous
    }
    todoLabels {
      id
      handle
      title
      color
    }
  } 
}`;

export interface TodoInitialData {
  getTodoInitialData: {
    paginatedTodoItems: Pagination<ITodoItem>; 
    todoLabels: ITodoLabel[];
  }
}