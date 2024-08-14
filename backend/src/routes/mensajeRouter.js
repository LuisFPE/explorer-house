import {Router} from "express";

import mensajeAPIController from "../controllers/apiControllers/mensajeAPIController.js";


const router  = Router();


router.post("/",mensajeAPIController.create);
router.post("/find",mensajeAPIController.getByProperty);
router.post("/remove/:id",mensajeAPIController.remove);
router.post("/update/:id",mensajeAPIController.update);


router.get("/",mensajeAPIController.getAll);
router.get("/:id", mensajeAPIController.getById)


export default router;