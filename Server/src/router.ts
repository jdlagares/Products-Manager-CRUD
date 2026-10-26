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

/**
 * @swagger
 * /api/products:
 *      post:
 *          summary: Creates a new product
 *          tags: 
 *              - Products
 *          description: Return a new record in the database
 *          requestBody: 
 *              require: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "laptop gamimg"
 *                              price: 
 *                                  type: number
 *                                  example: 399
 *          responses:
 *              201:
 *                  description: Succesful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/components/schemas/Product"
 *              400:
 *                  description: Bad Request - invalid input data
 *          
 */
router.post("/",

    body("name").notEmpty().withMessage("name is empty"),
    body("price")
                .isNumeric().withMessage("incorrect value")
                .notEmpty().withMessage("price is empty")
                .custom(value=>value>0).withMessage("price should be greater than zero"),  
                handleInputErrors,  
    createProduct)
/**
 * @swagger
 * /api/products/{id}:
 *      put:
 *          summary: Updates a product with user input
 *          tags:
 *              - Products
 *          description: Returns the updated product
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The Id of the product to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          requestBody: 
 *              require: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  example: "laptop gamimg"
 *                              price: 
 *                                  type: number
 *                                  example: 399
 *                              availability:
 *                                  type: boolean  
 *                                  example: true
 *          responses:
 *              200:
 *                  description: Succesful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: "#/components/schemas/Product"
 *              400:
 *                  description: Bad Request - Invalid Id or invalid input data
 *              404:
 *                  description: Product not Found
 *                  
 *          
 *          
 *          
 */
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
/**
 * @swagger
 * /api/products/{id}:
 *      patch:
 *          summary: Update product availability
 *          tags: 
 *              - Products
 *          description: returns the updated availability
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
 *              400:
 *                  description: Bad Request - Invalid Id
 *              404:
 *                  description: Product not Found
 *              
 *      
 */
router.patch("/:id",
    param("id").isInt().withMessage("Not valid id"),
    handleInputErrors,
    updateAvailability)
/**
 * @swagger
 * /api/products/{id}:
 *      delete:
 *          summary: delete a product by id
 *          tags:
 *              - Products
 *          description: return deleted product message
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The Id of the product to delete
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Succesful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: string
 *                              value: "producto eliminado"
 *              400:
 *                  description: Bad Request - Invalid Id
 *              404:
 *                  description: Product not Found
 *      
 */
router.delete("/:id",
    param("id").isInt().withMessage("Not valid id"),
    handleInputErrors,
    deleteProduct
)
export default router