import { Router} from "express"
import { createProduct, getProducts } from "./handlers/product"
import {body} from "express-validator"
import { handleInputErrors } from "./middleware"
const router=Router()

router.get("/",getProducts)

router.post("/",

    body("name").notEmpty().withMessage("name is empty"),
    body("price")
                .isNumeric().withMessage("incorrect value")
                .notEmpty().withMessage("price is empty")
                .custom(value=>value>0).withMessage("price should be greater than zero"),  
                handleInputErrors,  
    createProduct)

router.put("/",(req,res)=>{
    res.send("Desde PUT")
})
router.patch("/",(req,res)=>{
    res.send("Desde PATCH")
})
router.delete("/",(req,res)=>{
    res.send("Desde DELETE")
})
export default router