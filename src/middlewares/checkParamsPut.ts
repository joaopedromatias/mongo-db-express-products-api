import { Request, Response, NextFunction } from "express";

export const checkParamsPut = (req: Request, res: Response, next: NextFunction) => { 
    const { name, price, image_url } = req.body;

    if( name || price || image_url) { 
        next();
    } else { 
        res.status(400).send({sucess: false, message: 'you need to provide at least a new property (name, price or image url)'});
    }
};