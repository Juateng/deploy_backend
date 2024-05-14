import express from "express";
import { addProduct, listProducts, removeProduct } from "../controllers/productController.js";
import multer from "multer";

const productRouter = express.Router();

//configuracion de la imagen

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

productRouter.post("/add", upload.single("image"),addProduct);
productRouter.get("/list", listProducts)
productRouter.post("/remove", removeProduct)

export default productRouter;