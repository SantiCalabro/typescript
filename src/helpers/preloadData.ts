import { AppDataSource, UserModel, VehicleModel } from "../config/data-source";

const preloadUsers = [
  {
    name: "Santiago",
    email: "santiagocalabro.dev@gmail.com",
    age: 31,
    active: true,
  },
  {
    name: "Stefanía",
    email: "stefi@gmail.com",
    age: 34,
    active: true,
  },
  {
    name: "Pablo",
    email: "pablonulli@gmail.com",
    age: 32,
    active: true,
  },
  {
    name: "Fernando",
    email: "fernando@gmail.com",
    age: 38,
    active: true,
  },
];

const preloadVehicles = [
  {
    brand: "Ford",
    color: "Red",
    model: "Fiesta",
    year: 2019,
    userId: 1,
  },
  {
    brand: "Chevrolet",
    color: "Black",
    model: "Onix",
    year: 2025,
    userId: 2,
  },
  {
    brand: "Renault",
    color: "Green",
    model: "12",
    year: 1985,
    userId: 3,
  },
  {
    brand: "Peugeot",
    color: "White",
    model: "504",
    year: 1993,
    userId: 4,
  },
];
export const preloadUserDta = async () => {
  await AppDataSource.manager.transaction(
    async (transactionalEntityManager) => {
      const users = await UserModel.find();
      if (users.length) return console.log("No se hizo la carga");

      for await (const user of preloadUsers) {
        const newUser = await UserModel.create(user);
        await transactionalEntityManager.save(newUser);
      }

      console.log("Precarga de usuarios realizada con éxito");
    },
  );
};

export const preloadVehicleDta = async () => {
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();

  const promises = preloadVehicles.map(async (vehicle) => {
    const newVehicle = await VehicleModel.create(vehicle);
    await queryRunner.manager.save(newVehicle);
    const user = await UserModel.findOneBy({ id: vehicle.userId });
    if (!user) throw Error("Usuario inexistente");
    user.vehicle = newVehicle;
    await queryRunner.manager.save(user);
  });
  try {
    await queryRunner.startTransaction();
    await Promise.all(promises);
    console.log("precarga de vehiculos realizada con éxito");
    await queryRunner.commitTransaction();
  } catch (error) {
    console.log("Error al intentar crear los vehículos");
    await queryRunner.rollbackTransaction();
  } finally {
    console.log("Ha finalizado la transacción");
    await queryRunner.release();
  }
};

// export const preloadVehicleDta = async () => {
//     try {
//         await AppDataSource.manager.transaction(async (transactionalEntityManager) => {

//             for await (const vehicle of preloadVehicles) {
//                 const newVehicle = await VehicleModel.create(vehicle)
//                 await transactionalEntityManager.save(newVehicle)

//                 const user = await UserModel.findOneBy({ id: vehicle.userId })
//                 if (user) {
//                     user.vehicle = newVehicle;
//                     await transactionalEntityManager.save(user);
//                 } else {
//                     throw Error('Usuario inexistente')
//                 }
//             }

//             console.log('Precarga de vehículos realizada con éxito')
//         })
//     } catch (e) {
//         console.log('Hubo un error')
//     }

// }
