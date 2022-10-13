import { Request, Response, NextFunction } from "express";

export const checkIsNumber = (req: Request, res: Response, next: NextFunction): void => { 

    const { id } = req.params;

    const castNumberId = Number(id);
    
    if (isNaN(castNumberId) || id === 'true' || id === '[]') { 
        res.status(400).json({sucess: false, message: 'product id must be of type number'});
    } else { 
        next();
    }

}