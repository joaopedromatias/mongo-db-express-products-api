export class APIError extends Error {
    statusCode: number
    
    constructor(message: string, statusCode: number) { 
        super(message)
        this.statusCode = statusCode
    }

}

export const createErrorObject = (message: string, statusCode: number) => { 
    return new APIError(message, statusCode);
} 