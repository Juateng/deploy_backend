import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://JuanBalam1510:DgtxKSP7zR1BqOCd@cluster0.8kx07jx.mongodb.net/star_rail_videogame_shop')
    .then(()=>console.log("DB connected"))
}

// module.exports = connectDB

//mongodb+srv://JuanBalam1510:DgtxKSP7zR1BqOCd@cluster0.8kx07jx.mongodb.net/star_rail_videogame_shop