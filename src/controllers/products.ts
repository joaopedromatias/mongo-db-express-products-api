import { NextFunction, Request, Response } from "express";
import { asyncWrapper } from "../middlewares/asyncWrapper";
import ProductModel from '../models/products'

export const getProducts = asyncWrapper(async (req: Request, res: Response) => { 
    const products = await ProductModel.find();
    return res.status(200).json({sucess: true, data: products});
});

export const getProduct = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => { 
    const { sku } = req.params;
    const product = await ProductModel.findOne({ sku });
    if (product) { 
        return res.status(200).json({sucess: true, data: product});
    } else { 
        next();
    }
});

export const createProduct = asyncWrapper( async (req: Request, res: Response) => { 
    await ProductModel.create(req.body);
    res.status(201).json({sucess: true, message: 'product sucessfully created'});
});

export const updateProduct = asyncWrapper( async (req: Request, res: Response, next: NextFunction) => { 
    const { sku } = req.params;
    const newProduct = await ProductModel.findOneAndUpdate({ sku }, req.body, { 
        new: true,
        runValidators: true, 
        useFindAndModify: false
    })
    if (newProduct) { 
        res.status(200).json({ sucess: true, message: 'product sucessfully updated'})
    } else { 
        next();
    }
});

export const deleteProduct = async (req: Request, res: Response) => { 
    const { sku } = req.params;
    await ProductModel.findOneAndDelete({ sku }, { 
        useFindAndModify: false
    });
    res.status(200).json({ sucess: true, message: 'product sucessfully deleted'})
};