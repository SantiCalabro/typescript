import { User } from "../entities/user"
import { AppDataSource } from '../config/data-source';


export const UserRepository = AppDataSource.getRepository(User).extend({
    async findById(id: number) {
        const user = this.findOneBy({ id })
        return user
    }
})
