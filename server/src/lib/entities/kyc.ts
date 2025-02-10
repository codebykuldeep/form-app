import { Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm";
import { Users } from "./users";


@Entity('kycs')
export class Kycs {
    @PrimaryGeneratedColumn()
    kyc_id:number;

    @OneToOne(
        ()=>Users,
        (user)=>user.user_id,
        {
            cascade:true
        }
    )
    @JoinColumn()
    user_id:string

    @CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

}