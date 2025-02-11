import { DataSource } from "typeorm";
import { Users } from "./entities/users";
import { Kycs } from "./entities/kyc";
import { Banks } from "./entities/banks";

export const db = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "root",
    database: "stepper-form",
    entities:[Users,Kycs,Banks],
    synchronize:true,
    logger:'simple-console',
})