import { UserModel, VehicleModel } from "../config/data-source"
import VehicleDto from "../dto/VehicleDto"
import { Vehicle } from "../entities/vehicle"

export const getVehiclesService = async (): Promise<Vehicle[]> => {
    const vehicles = await VehicleModel.find()
    return vehicles
}

export const createVehicleService = async (vehicle: VehicleDto): Promise<Vehicle> => {
    const newVehicle = await VehicleModel.create(vehicle)
    await VehicleModel.save(newVehicle)

    const user = await UserModel.findOneBy({
        id: vehicle.userId
    })

    if (user) {
        user.vehicle = newVehicle
        await UserModel.save(user)
    }

    return newVehicle
}