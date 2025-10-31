import { Request, Response } from "express"
import { Vehicle } from "../entities/vehicle"
import { createVehicleService, getVehiclesService } from "../services/vehiclesService"


export const getVehicles = async (req: Request, res: Response) => {
    const vehicles: Vehicle[] = await getVehiclesService()
    res.status(200).json(vehicles)
}

export const createVehicle = async (req: Request, res: Response) => {
    const { brand, color, model, year, userId } = req.body
    const newVehicle: Vehicle = await createVehicleService({ brand, color, model, year, userId })
    res.status(200).json(newVehicle)
}