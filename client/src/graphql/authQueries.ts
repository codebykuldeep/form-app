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
      dob
      contact
      auth_source
      email_verified
      created_at
      updated_at
      process_step
    }
    kyc {
      kyc_id
      user_id
      address
      occupation
      document_id
      created_at
      updated_at
    }
    bank {
      bank_id
      user_id
      bank_data
      teller_user_id
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

export const EMAIL_VERIFY_QUERY =gql`#graphql
query VerifyEmail($token: String!) {
  verifyEmail(token: $token) {
    message
    status
  }
}
`;


export const VERIFY_TOKEN_QUERY = gql`#graphql
query Verify($token: String!) {
  verify(token: $token) {
    message
    status
    token
    user {
      user_id
      email
      first_name
      last_name
      contact
      dob
      auth_source
      email_verified
      created_at
      updated_at
      process_step
    }
    kyc {
      kyc_id
      user_id
      address
      occupation
      document_id
      created_at
      updated_at
    }
    bank {
      bank_id
      user_id
      bank_data
      teller_user_id
      created_at
      updated_at
    }
  }
}
`;


export const GOOGLE_AUTH_QUERY = gql`
mutation GoogleAuthLogin($credential: String!, $clientId: String!) {
  googleAuthLogin(credential: $credential, clientId: $clientId) {
    message
    status
    kyc {
      kyc_id
      user_id
      address
      occupation
      document_id
      created_at
      updated_at
    }
    bank {
      bank_id
      user_id
      bank_data
      teller_user_id
      created_at
      updated_at
    }
    user {
      user_id
      email
      first_name
      last_name
      contact
      dob
      auth_source
      email_verified
      process_step
      created_at
      updated_at
    }
    token
  }
}`;