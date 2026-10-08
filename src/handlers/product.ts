import { Request, Response } from "express"

import Product from "../models/Product.model"

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