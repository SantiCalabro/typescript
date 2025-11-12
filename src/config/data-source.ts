import { Vehicle } from './../entities/vehicle';
import { DataSource } from "typeorm"
import { User } from "../entities/user"
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "admin",
    database: "demo_typeorm",
    dropSchema: true,
    synchronize: true,
    logging: false,
    entities: [User, Vehicle],
    subscribers: [],
    migrations: [],
})

