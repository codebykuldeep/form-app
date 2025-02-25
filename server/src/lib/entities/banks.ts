import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, Column, BaseEntity } from "typeorm";
import { Users } from "./users";


@Entity('banks')
export class Banks extends BaseEntity{
    @PrimaryGeneratedColumn()
    bank_id:number;

    @OneToOne(
        ()=>Users,
        {
            cascade:true,
            eager:true,
            onDelete:'CASCADE'
        }
    )
    @JoinColumn({name:'user_id'})
    user:Users

    @Column({
        type:'json',
        nullable:true,
    })
    bank_data:string;

    @Column({
        type:'varchar',
        nullable:true,
    })
    token:string;

    @Column({
        type:'varchar',
        nullable:true,
    })
    teller_user_id:string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}