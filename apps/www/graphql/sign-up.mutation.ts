import gql from 'graphql-tag';

export default gql`
mutation signUp($name: String!, $pwd: String!, $emaddr: String!) {
  signUp(input: {
    name: $name
    pwd: $pwd
    emaddr: $emaddr
  }) {
    uid
    name
    emaddr
  }
}`;