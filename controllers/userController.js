import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";


//login
const loginUser = async (req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success: false, message:"El usuario no existe"})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.json({success: false, message:"La contraseña es incorrecta"})
            
        }

        const token = crearToken(user._id);
        res.json({success:true, token})

    } catch (error) {
        console.log(error)
        res.json({success:false, message: "Error"})
    }
}

const crearToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//register
const registerUser = async (req,res)=>{
    const {name, password, email} = req.body;
    try {
        const exists = await userModel.findOne({email});
        if (exists){
            return res.json({success:false,message: "El usuario ya existe"})
        }
        //validar correo y contraseña
        if(!validator.isEmail(email)){
            return res.json({success:false, message: "Porfavor ingrese un correo valido"})
        }

        if(password.lenght<8){
            return res.json({success:false, message: "Porfavor ingrese una contraseña segura"})
        }
        //hash contraseña
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name: name,
            email:email,
            password: hashedPassword
        })

        const user = await newUser.save()
        const token = crearToken(user._id)
        res.json({success:true, token})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

export {loginUser, registerUser}