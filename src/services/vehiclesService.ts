import { AppDataSource, UserModel, VehicleModel } from "../config/data-source";
import VehicleDto from "../dto/VehicleDto";
import { Vehicle } from "../entities/vehicle";

export const getVehiclesService = async (): Promise<Vehicle[]> => {
  const vehicles = await VehicleModel.find();
  return vehicles;
};

export const createVehicleService = async (
  vehicle: VehicleDto,
): Promise<Vehicle> => {
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  try {
    queryRunner.startTransaction();

    const newVehicle = await VehicleModel.create(vehicle);
    await queryRunner.manager.save(newVehicle);
    const user = await UserModel.findOneBy({
      id: vehicle.userId,
    });
    if (!user) throw Error("No se encontró el usuario");
    user.vehicle = newVehicle;
    await queryRunner.manager.save(user);
    await queryRunner.commitTransaction();
    return newVehicle;
  } catch (error) {
    console.log("usuario no encontrado");
    await queryRunner.rollbackTransaction();
  } finally {
    console.log("transacción finalizada");
    await queryRunner.release();
  }
};

// export const createVehicleService = async (vehicle: VehicleDto): Promise<Vehicle> => {
//     const newVehicle = await VehicleModel.create(vehicle)
//     await VehicleModel.save(newVehicle)

//     const user = await UserModel.findOneBy({
//         id: vehicle.userId
//     })

//     if (user) {
//         user.vehicle = newVehicle
//         await UserModel.save(user)
//     }

//     return newVehicle
// }
