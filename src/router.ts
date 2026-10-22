import { Router} from "express"
import { createProduct, getProducts ,getProductById, updatedProduct, updateAvailability,deleteProduct} from "./handlers/product"
import {body,param} from "express-validator"
import { handleInputErrors } from "./middleware"
const router=Router()

router.get("/",getProducts)

router.get("/:id",
    param("id").isInt().withMessage("Not valid id"),
    handleInputErrors,
    getProductById)

router.post("/",

    body("name").notEmpty().withMessage("name is empty"),
    body("price")
                .isNumeric().withMessage("incorrect value")
                .notEmpty().withMessage("price is empty")
                .custom(value=>value>0).withMessage("price should be greater than zero"),  
                handleInputErrors,  
    createProduct)

router.put("/:id",
    param("id").isInt().withMessage("Not valid id"),
    body("name").notEmpty().withMessage("name is empty"),
    body("price")
                .isNumeric().withMessage("incorrect value")
                .notEmpty().withMessage("price is empty")
                .custom(value=>value>0).withMessage("price should be greater than zero"), 
    body("availability").isBoolean().withMessage("value not valid"),
    handleInputErrors,
    updatedProduct)
router.patch("/:id",
    param("id").isInt().withMessage("Not valid id"),
    handleInputErrors,
    updateAvailability)

router.delete("/:id",
    param("id").isInt().withMessage("Not valid id"),
    handleInputErrors,
    deleteProduct
)
export default router