import IUser from "../interfaces/IUser"
import UserDto from "../dto/UserDto";
import { User } from '../entities/user';
import { UserRepository } from '../repositories/userRepository';


export const createUserService = async (userData: UserDto): Promise<User> => {
    const user = await UserRepository.create(userData)
    UserRepository.save(user)
    return user
}


export const getUsersService = async (): Promise<User[]> => {
    const users = await UserRepository.find({
        relations: {
            vehicle: true
        }
    })
    return users
}

export const getUserByIdService = async (id: number): Promise<User | null> => {
    const user = await UserRepository.findById(id)
    return user
}
