import { UserModel } from './../config/data-source';
import IUser from "../interfaces/IUser"
import UserDto from "../dto/userDto";
import { User } from '../entities/user';

let users: IUser[] = [{
    name: 'Jorge',
    age: 31,
    email: 'jorge@gmail.com',
    active: true
}
]

export const createUserService = async (userData: UserDto): Promise<User> => {
    const user = await UserModel.create(userData)
    UserModel.save(user)
    return user
}


export const getUsersService = async (): Promise<User[]> => {
    const users = await UserModel.find({
        relations: {
            vehicle: true
        }
    })
    return users
}

export const getUserByIdService = async (id: number): Promise<User | null> => {
    const user = await UserModel.findOneBy({ id })
    return user
}
// export const deleteUserService = async (id: number): Promise<void> => {
//     users = users.filter((user: IUser) => {
//         return user.id !== id
//     })
// }