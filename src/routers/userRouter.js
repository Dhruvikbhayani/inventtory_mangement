import express from "express";
import controllers from "../controller/index.js";
import multer from 'multer';
import { uploadimg } from '../service/upload.js';

const router = express.Router();
const storage = uploadimg();
const upload = multer({ storage: storage });

router.post("/register", upload.single('image'), controllers.userController.userSingup);
router.post("/login", controllers.userController.userLogin);

export default router;