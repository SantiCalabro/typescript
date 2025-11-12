import { AppDataSource } from "../config/data-source";
import VehicleDto from "../dto/VehicleDto";
import { Vehicle } from "../entities/vehicle";
import { UserRepository } from "../repositories/userRepository";
import { VehicleRepository } from "../repositories/vehicleRepository";


export const getVehiclesService = async (): Promise<Vehicle[]> => {
  const vehicles = await VehicleRepository.find();
  return vehicles;
};

export const createVehicleService = async (
  vehicle: VehicleDto,
): Promise<Vehicle> => {
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  try {
    queryRunner.startTransaction();

    const newVehicle = await VehicleRepository.create(vehicle);
    await queryRunner.manager.save(newVehicle);
    // const user = await UserRepository.findOneBy({
    //   id: vehicle.userId,
    // });

    // const user = await UserRepository.findById(vehicle.userId)
    // if (!user) throw Error("No se encontró el usuario");
    if (!await UserRepository.checkById(vehicle.userId)) {
      throw Error("No se encontró el usuario");
    } else {
      const user = await UserRepository.findById(vehicle.userId)
      user.vehicle = newVehicle;
      await queryRunner.manager.save(user);
      await queryRunner.commitTransaction();
      return newVehicle;
    }

  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw Error('Usuario no encontrado')
  } finally {
    console.log("transacción finalizada");
    await queryRunner.release();
  }
};
