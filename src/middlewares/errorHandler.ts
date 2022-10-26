import { Request, Response, NextFunction } from "express";
import { APIError } from "../utils/APIError";

export const errorHandler = (err: object, req: Request, res: Response, next: NextFunction) => { 
    if (err instanceof APIError) { 
        res.status(err.statusCode).json({ message: err.message, sucess: false });
    } else { 
        res.status(500).json({ message: 'server error', sucess: false });
    }
};