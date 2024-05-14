import productModel from "../models/productModel.js";
import fs from 'fs'


//añadir

const addProduct = async (req,res) =>{

    let image_filename = `${req.file.filename}`;

    const product = new productModel({
        nombre: req.body.nombre,
        sku: req.body.sku,
        plataforma: req.body.plataforma,
        precio: req.body.precio,
        image: image_filename
    })
    try {
        await product.save();
        res.json({success: true, message: "Producto añadido"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:"Error"})
    }

}

//leer
const listProducts = async (req,res)=>{

    try {
        const products = await productModel.find({});
        res.json({success: true, data: products})
    } catch (error) {
        console.log(error);
        res.json({success:false, message: "Error"})
    }

}

//borrar 

const removeProduct = async (req,res)=>{
    try {
        const product = await productModel.findOne({sku:req.body.sku});
        fs.unlink(`uploads/${product.image}`, ()=>{})

        await productModel.findOneAndDelete({sku:req.body.sku});
        res.json({success: true, message:"Producto eliminado"})

    } catch (error) {
        console.log(error);
        res.jso({success: false, message:"Error"})
    }
} 

export{addProduct, listProducts, removeProduct}