import express  from "express";
import colors from "colors"
import router from "./router";
import db from "./config/db"
import { json } from "sequelize";

//conection
export async function connectdb() {
    try{
        await db.authenticate()
        db.sync()
        //console.log(colors.magenta("successfull connection"))
    }catch(error){
        console.log(error)
        console.log(colors.red.bold("error connection"))
    }
}
connectdb()

const server = express()

//read data
server.use(express.json())

server.use("/api/products",router)

server.get("/api",(req,res)=>{
    res.json({msg: "Desde API"})
})

//routing

export default server