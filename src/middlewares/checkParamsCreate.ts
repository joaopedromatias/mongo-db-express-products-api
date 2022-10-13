import { Request, Response, NextFunction } from "express";

export const checkParamsCreate = (req: Request, res: Response, next: NextFunction) => { 
    const { name, price } = req.body;

    if (!name || !price) { 
        res.status(400).json({sucess: false, message: 'You need to provide a name and a price to the new product'});
    } else { 
        next();
    }
}