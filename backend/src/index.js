import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/mongo.js";
import router from "./routes/router.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json" assert { type: 'json' };
import cors from "cors"


dotenv.config();
const CONTAINER_PORT = 3000;

const app = express();
app.use(cors())
app.use(express.json()); 

connectDB();

app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerDocument));

app.use(express.static("public")); // permite mostrar archivos en la carpeta public

app.set("views","./src/views");

app.use(express.json()); // permite leer el body de llamadas POST y PUT tipo JSON
app.use(express.urlencoded({extended:true})); // permite leer el body de llamadas POST y PUT tipo URL Encoded


app.use("/", router);

app.listen(CONTAINER_PORT ,()=>{
    console.log("Aplicacion en marcha en el puerto "+process.env.APP_PORT);
})