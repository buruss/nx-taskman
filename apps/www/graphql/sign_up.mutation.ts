import gql from 'graphql-tag';

export default gql`
mutation signUp($uname: String!, $pwd: String!, $emaddr: String!) {
  signUp(input: {
    uname: $uname
    pwd: $pwd
    emaddr: $emaddr
  }) {
    uid
    uname
    emaddr
  }
}`;