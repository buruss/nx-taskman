import gql from 'graphql-tag';

export default gql`
mutation signIn($name: String!, $pwd: String!) {
  signIn(input: {name: $name, pwd:$pwd}) {
    token
  }
}`;