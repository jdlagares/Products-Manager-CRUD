import { Request, Response } from "express"

import Product from "../models/Product.model"
import { error } from "console"

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products=await Product.findAll()
        // const products = await Product.findAll({
        //     order: [
        //         ["price", "DESC"]
        //     ],
        //     attributes: { exclude: ["createdAt", "updatedAt", "availability"] }
        // })
        res.json({ data: products })
    } catch (err) {
        console.log(err)
    }
}
export const getProductById = async (req: Request<{ id: string }>, res: Response) => {
    try {

        const{id}=req.params 
        const product=await Product.findByPk(id)

        if(!product){
            return res.status(404).json({ error:"product not found"})
        }
        res.json({data:product})

    } catch (err) {
        console.log(err)
    }
}
export const createProduct = async (req: Request, res: Response) => {

    //save product to data base
    // const product=new Product(req.body)
    //product.save()

    try {
        const product = await Product.create(req.body)
        res.json({ data: product })
    } catch (err) {
        console.log(err)
    }
}
export const updatedProduct = async (req: Request<{ id: string }>, res: Response)=>{
    const{id}=req.params 
    const product=await Product.findByPk(id)

    if(!product){
        return res.status(404).json({ error:"product not found"})
    }

    await product.update(req.body)
    await product.save()



    res.json({data:product})
}
export const updateAvailability = async (req: Request<{ id: string }>, res: Response)=>{
    const{id}=req.params 
    const product=await Product.findByPk(id)

    if(!product){
        return res.status(404).json({ error:"product not found"})
    }
    
    product.availability = !product.dataValues.availability
    await product.save()



    res.json({data:product})
}
export const deleteProduct = async (req: Request<{ id: string }>, res: Response)=>{
    const{id}=req.params 
    const product=await Product.findByPk(id)

    if(!product){
        return res.status(404).json({ error:"product not found"})
    }
    
   await product.destroy()
   res.json({data: "producto eliminado"})
}