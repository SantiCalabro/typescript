import { User } from "../entities/user"
import { AppDataSource } from '../config/data-source';


export const UserRepository = AppDataSource.getRepository(User).extend({
    findById: async function (id: number): Promise<User> {
        const user = await this.findOneBy({ id })
        if (user) return user
        else throw Error('invalid ID')
    },
    checkById: async function (id: number): Promise<User | boolean> {
        const user = await this.findById(id)
        if (user) {
            return user
        } else {
            return false
        }
        // return !!user;
    }
})
