export interface IUser {
  auth_source: string;
  contact: string;
  created_at: string;
  email: string;
  email_verified: boolean;
  first_name: string;
  last_name: string;
  updated_at: string;
  user_id: string;
  process_step:string;
  dob:string;
}

export interface KYC{
  kyc_id:string;
  document_id:string;
  address:string;
  occupation:string;
  user_id:string;
}

export interface KycForm extends IUser , KYC{
}


export interface Bank{
  bank_id:string
  user_id:string
  bank_data:string
  teller_user_id:string
  created_at:string
  updated_at:string
}

export interface SnackState{
  open:boolean;
  status:boolean;
  message:string;
}
