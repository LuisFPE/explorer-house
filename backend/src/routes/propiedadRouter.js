import {Router} from "express";

import propiedadAPIController from "../controllers/apiControllers/propiedadAPIController.js";


const router  = Router();


router.post("/",propiedadAPIController.create);
router.post("/find",propiedadAPIController.getByProperty);
router.post("/remove/:id",propiedadAPIController.remove);
router.post("/update/:id",propiedadAPIController.update);


router.get("/",propiedadAPIController.getAll);


export default router;