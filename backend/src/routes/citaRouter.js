import {Router} from "express";

import citaAPIController from "../controllers/apiControllers/citaAPIController.js";


const router  = Router();


router.post("/",citaAPIController.create);
router.post("/find",citaAPIController.getByProperty);
router.post("/remove/:id",citaAPIController.remove);
router.post("/update/:id",citaAPIController.update);


router.get("/",citaAPIController.getAll);
router.get("/:id", citaAPIController.getById)


export default router;