import express from "express";
import router from "./routes"
const server = express();
server.use(express.json())
server.use(router)

export default server; //Export Default sirve para cuando quiero exportar una sola cosa.