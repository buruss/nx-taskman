import gql from 'graphql-tag';

export default gql`
mutation signIn($uname: String!, $pwd: String!) {
  signIn(input: {uname: $uname, pwd:$pwd}) {
    token
  }
}`;