import express  from "express";
import colors from "colors"
import router from "./router";
import db from "./config/db"

//conection
async function connectdb() {
    try{
        await db.authenticate()
        db.sync()
        console.log(colors.magenta("successfull connection"))
    }catch(error){
        console.log(error)
        console.log(colors.red.bold("error connection"))
    }
}
connectdb()

const server = express()

server.use("/api/products",router)

//routing

export default server