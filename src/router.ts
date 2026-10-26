import { Router} from "express"
import { createProduct, getProducts ,getProductById, updatedProduct, updateAvailability,deleteProduct} from "./handlers/product"
import {body,param} from "express-validator"
import { handleInputErrors } from "./middleware"
const router=Router()
/**
 * @swagger
 * components:
 *  schemas:
 *      Product:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  description: the product ID
 *                  example: 1
 *              name:
 *                  type: string
 *                  description: the product name
 *                  example: Monitor Curvo
 *              price:
 *                  type: number
 *                  description: the product price
 *                  example: 300
 *              availability:
 *                  type: boolean
 *                  description: the product availability
 *                  example: true               
 */

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a list of products
 *          tags: 
 *              - Products
 *          description: Return a list of products
 *          responses: 
 *              200:
 *                  description: Succesfull response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type : array
 *                              items: 
 *                                  $ref: "#/components/schemas/Product"
 *          
 */
router.get("/",getProducts)

/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *          summary: Get a product by id
 *          tags: 
 *              - Products
 *          description: Return a product base on its unique ID
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The Id of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Succesful response
 *                  content: 
 *                      application/json:
 *                          schema:
 *                              $ref: "#/components/schemas/Product"
 *              404:
 *                  description: Not Found
 *              400: 
 *                  description: Bad Request - Invalid ID
 *                  
 */

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