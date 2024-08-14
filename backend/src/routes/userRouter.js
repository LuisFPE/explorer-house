import {Router} from "express";

import userAPIController from "../controllers/apiControllers/userAPIController.js";


const router  = Router();

router.get("/",userAPIController.getAll);
router.get("/byproperty",userAPIController.getByProperty);
router.get("/:id",userAPIController.getById);
router.post("/",userAPIController.create);
router.put("/:id",userAPIController.update);
router.delete("/:id",userAPIController.remove);



export default router;