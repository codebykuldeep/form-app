import { gql } from "@apollo/client";

export const TERMS_QUERY= gql`
query AcceptTerms {
  acceptTerms {
    message
    status
  }
}
`;


export const UPDATE_KYC = gql`
mutation Mutation($kyc: kycInput!) {
  updateKyc(kyc: $kyc) {
    message
    status
  }
}
`;


export const UPDATE_BANK = gql`
mutation UpdateBank($bank: bankInput) {
  updateBank(bank: $bank) {
    message
    status
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

export const SUBMIT_FORM= gql`
query SubmitDetail {
  submitDetail {
    message
    status
  }
}
`;