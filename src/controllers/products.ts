import { Request, Response } from "express";
import { readFileSync } from 'fs';
import { Product } from "../../types";

const initialData: string = readFileSync(process.cwd() + '/resource/products.json','utf8');
let programData: Array<Product> = JSON.parse(initialData);

const isNumber = (id: string): boolean => { 
    const castNumberId = Number(id);
    if (isNaN(castNumberId) || id === 'true' || id === '[]') { 
        return false;
    } else { 
        return true;
    }
}

export const getProducts = (req: Request, res: Response) => { 
    res.status(200).json({sucess: true, data: programData});
};

export const getProduct = (req: Request, res: Response) => { 
    const { id } = req.params;
    
    if (isNumber(id)) { 

        const product: Array<Product> = programData.filter(product => product.id === Number(id))
    
        if (product.length === 1) { 
            res.status(200).json({sucess: true, data: product[0]});
        } else if (product.length === 0) { 
            res.status(404).send({sucess: false, message: 'no product matching the provided id'})
        } else {
            res.status(500).send({sucess: false, message: 'server error, please reach out the support'})
        }

    } else { 
        res.status(400).json({sucess: false, message: 'product id must be of type number'})
    }
};

export const createProduct = (req: Request, res: Response) => { 
    const { name, price, image } = req.body
    if (!name || !price) { 
        res.status(400).json({sucess: false, message: 'You need to provide a name and a price to the new product'})
    } else {
        try { 
            programData.push({ 
                id: programData.length + 1,
                name,
                price,
                image
            })
            res.status(201).send({sucess: true, message: 'product sucessfully registered'})
        } catch (err) { 
            res.status(500).send({sucess: false, message: 'server error, please reach out the support'})
        }
    }
};

export const updateProduct = (req: Request, res: Response) => { 
    
};

export const deleteProduct = (req: Request, res: Response) => { 
    
};