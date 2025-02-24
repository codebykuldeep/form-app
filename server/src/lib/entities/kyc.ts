import { Entity, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn, Column, BaseEntity } from "typeorm";
import { Users } from "./users";


@Entity('kycs')
export class Kycs extends BaseEntity {
    @Column({
        type:'varchar',
        generated:'uuid',
        primary:true
    })
    kyc_id:string;

    @Column({
         type:'varchar',
         nullable:true,
        
    })
    address:string;


    @Column({
        type:'varchar',
        nullable:true
   })
   document_id:string;

   @Column({
    type:'varchar',
    nullable:true
    })
    occupation:string;

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

    @CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

}