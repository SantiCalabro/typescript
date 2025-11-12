import { Vehicle } from '../entities/vehicle';
import { AppDataSource } from '../config/data-source';


export const VehicleRepository = AppDataSource.getRepository(Vehicle)
