import { Entity,Column, PrimaryGeneratedColumn, UpdateDateColumn, CreateDateColumn, OneToOne, BaseEntity } from "typeorm";
import { Kycs } from "./kyc";
import { Banks } from "./banks";
import { EmailsVerify } from "./email_record";


@Entity("users")
export class Users extends BaseEntity{
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({
    type: "varchar",
    unique: true,
  })
  email: string;

  @Column({
    type: "varchar",
    nullable:true,
  })
  password:string;

  @Column({
    type: "varchar",
  })
  first_name: string;

  @Column({
    type: "varchar",
    nullable: true,
  })
  last_name: string;

  @Column({
    type: "varchar",
    length: 10,
    nullable: true,
  })
  contact: string;

  @Column({
    type: "date",
    nullable: true,
  })
  dob: Date;

  @Column({
    type: "varchar",
    default:'self',
    name:'auth_source'
  })
  auth_source: string;

  @Column({
    type: "boolean",
    default:false,
  })
  email_verified: boolean;


  @Column({
    type: "boolean",
    default:false,
  })
  terms_accepted: boolean;


  @Column({
    type: "int",
    default:0,
  })
  process_step: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(
    ()=>Kycs,
    (kyc) => kyc.user,
  )
  kyc_detail:Kycs


  @OneToOne(
    ()=>Banks,
    (bank) => bank.user,
  )
  bank_details:Banks
  
  @OneToOne(
    ()=>EmailsVerify,
    (emailRecord) => emailRecord.user,
  )
  email_record:EmailsVerify
}

