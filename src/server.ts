import express  from "express";
import colors from "colors"
import swaggerUI from "swagger-ui-express"
import swaggerSpec from "./config/swagger";
import router from "./router";
import db from "./config/db"

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

server.use("/docs",swaggerUI.serve,swaggerUI.setup(swaggerSpec))

//routing

export default server