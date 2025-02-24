import { gql } from "@apollo/client";

export const TERMS_QUERY= gql`
query AcceptTerms {
  acceptTerms {
    message
    status
  }
}
`