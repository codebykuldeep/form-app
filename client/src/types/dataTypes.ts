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
}

export interface SnackState{
  open:boolean;
  status:boolean;
  message:string;
}
