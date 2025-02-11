import { DataSource } from "typeorm";
import { Users } from "./entities/users";
import { Kycs } from "./entities/kyc";
import { Banks } from "./entities/banks";
import { EmailsVerify } from "./entities/email_record";

export const db = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "stepper-form",
    entities:[Users,Kycs,Banks,EmailsVerify],
    synchronize:true,
    logger:'simple-console',
})