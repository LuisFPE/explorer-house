import { Router } from "express";

const router  =  Router();



import userRouter from "./userRouter.js";
import propiedadRouter from "./propiedadRouter.js";
import citaRouter from "./citaRouter.js";
import mensajeRouter from "./mensajeRouter.js";





router.use("/user", userRouter);
router.use("/propiedad", propiedadRouter);
router.use("/cita", citaRouter);
router.use("/mensaje", mensajeRouter);






export default router;