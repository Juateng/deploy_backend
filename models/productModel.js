import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    nombre: {type:String, required: true},
    sku: {type:String, required: true},
    plataforma: {type:String, required: true},
    precio: {type:Number, required: true},
    image: {type:String, required: true}

})

const productModel = mongoose.model.Producto || mongoose.model("Producto",productSchema)

export default productModel;
