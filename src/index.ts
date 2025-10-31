import server from "./server";
import { PORT } from "./config/env";
import "reflect-metadata"
import { AppDataSource } from "./config/data-source";
import { preloadUserDta, preloadVehicleDta } from "./helpers/preloadData";

const initializeApp = async () => {
    await AppDataSource.initialize();
    console.log(`Server successfully connected`)
    await preloadUserDta()
    await preloadVehicleDta()
    server.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    })
}

initializeApp()