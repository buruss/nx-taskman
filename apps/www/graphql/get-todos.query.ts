
import gql from 'graphql-tag';

export default gql`query {
  getTodos(input: {
    $label: Float
    $search: String
    $paging: PaginationInputDto
  }) {
    items {
      id
      title
      notes
      startDate
      dueDate
      completed
      starred
      important
      selected
      deleted
      labels {
        id
      }
    }
    itemCount
    totalItems
    pageCount
    next
    previous
  }
}`;