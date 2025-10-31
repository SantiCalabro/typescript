import { Router } from "express";
import { createUser, getUsers, getUserById } from "../controllers/usersController";
import auth from "../middlewares/auth";
import { createVehicle, getVehicles } from "../controllers/vehiclesController";
const router: Router = Router();

router.get('/users', auth, getUsers)
router.get('/user/:id', getUserById)
router.post('/user', createUser)
// router.delete('/user', deleteUser)
router.get('/vehicles', auth, getVehicles)
router.post('/vehicle', createVehicle)
export default router;