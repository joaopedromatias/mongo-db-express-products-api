import { NextFunction, Request, Response } from "express";
import { asyncWrapper } from "../middlewares/asyncWrapper";
import ProductModel from '../models/products'
import { createErrorObject } from "../utils/APIError";

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

export const createProduct = asyncWrapper(async (req: Request, res: Response, next: NextFunction) => { 

    const productSkuAlreadyExists = !!(await ProductModel.exists({sku: req.body.sku}));
    
    if (!productSkuAlreadyExists) { 
        await ProductModel.create(req.body);
        res.status(201).json({sucess: true, message: 'product sucessfully created'});
    } else { 
        const error = createErrorObject('This product SKU already exists', 400);
        next(error);
    }
});

export const updateProduct = asyncWrapper( async (req: Request, res: Response, next: NextFunction) => { 
    const { sku } = req.params;
    const bodyWithoutEmptyProperties = {...req.body};

    Object.keys(bodyWithoutEmptyProperties).forEach(property => { 
        if (!bodyWithoutEmptyProperties[property] || property === 'sku') { 
            delete bodyWithoutEmptyProperties[property]
        }
    });

    const isEmpty = Object.keys(bodyWithoutEmptyProperties).length === 0;

    if (isEmpty) { 
        const customError = createErrorObject('You must provide at least a new name, price or image', 400);
        next(customError);
        return null
    }

    const newProduct = await ProductModel.findOneAndUpdate({ sku }, bodyWithoutEmptyProperties, { 
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

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => { 
    const { sku } = req.params;
    const productDeleted = await ProductModel.findOneAndDelete({ sku }, { 
        useFindAndModify: false
    });
    if (productDeleted) { 
        res.status(200).json({ sucess: true, message: 'product sucessfully deleted'})
    } else { 
        next() 
    }
    
};