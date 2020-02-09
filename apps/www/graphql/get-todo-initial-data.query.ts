
import gql from 'graphql-tag';

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