import { createErrorObject } from '../utils/APIError'
import { Request, Response, NextFunction } from 'express';

export const asyncWrapper = (controllerFn: Function) => { 
    return async (req: Request, res: Response, next: NextFunction) => { 
        try { 
            controllerFn(req , res, next);
        } catch (err) { 
            console.log(err);
            const errorMessage = 'error here'; // pegar a mensagem de erro do mongoose
            const statusCode = 400;
            const errorObject = createErrorObject(errorMessage,statusCode);
            next(errorObject);
        }
    }
}