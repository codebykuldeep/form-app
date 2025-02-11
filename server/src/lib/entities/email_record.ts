import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, Column, BaseEntity } from "typeorm";
import { Users } from "./users";


@Entity('email_record')
export class EmailsVerify  extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @OneToOne(
        ()=>Users,
        {
            cascade:true,
            eager:true,
        }
    )
    @JoinColumn({name:'user_id'})
    user:Users

    @Column({
        type:'varchar',
        unique:true,
    })
    email:string;

    @Column({
        type:'varchar',
        generated:'uuid'
    })
    unique_token:string;

    @Column({
        type:'boolean',
        default:false
    })
    status:boolean;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}