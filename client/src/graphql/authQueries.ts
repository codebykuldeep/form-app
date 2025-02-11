import { gql } from "@apollo/client";

export const LOGIN_QUERY =gql`#graghql
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    status
    token
    message
    user {
      user_id
      email
      first_name
      last_name
      contact
      auth_source
      email_verified
      created_at
      updated_at
    }
  }
}
`;


export const REGISTER_QUERY = gql`#graphql
mutation Register($email: String!, $password: String!, $firstName: String!, $lastName: String!, $dob: String!) {
  register(email: $email, password: $password, first_name: $firstName, last_name: $lastName, dob: $dob) {
    message
    status
  }
}
`;