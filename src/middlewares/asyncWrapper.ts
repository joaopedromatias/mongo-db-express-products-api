import { createErrorObject } from '../utils/APIError'
import { Request, Response, NextFunction } from 'express';
import { MongooseError } from 'mongoose';

const fields = ['name' , 'price' , 'sku' , 'image_url']

interface MongooseErr extends MongooseError { 
    errors: { 
        [propertyValidationError: string]: { 
            message: string
        }
    }
} 

export const asyncWrapper = (controllerFn: Function) => { 
    return async (req: Request, res: Response, next: NextFunction) => { 
        try { 
            await controllerFn(req , res, next);

        } catch (err) { 
            const propertyValidationError = (Object.keys((err as MongooseErr).errors).find((property) => { 
                    return property
            }));

            let errorMessage = ''
            
            if (propertyValidationError && fields.includes(propertyValidationError)) { 
                errorMessage = (err as MongooseErr).errors[propertyValidationError].message
            } else { 
                errorMessage = 'error description not found'
            }

            const statusCode = 400;
            const errorObject = createErrorObject(errorMessage, statusCode);
            next(errorObject);
        }
    }
}