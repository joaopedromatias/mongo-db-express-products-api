declare global { 
    interface Product { 
        id: number,
        name: string,
        price: number,
        image_url?: string
    }
    
    interface APIResponses { 
        sucess: boolean
        message: string
        data?: Product[] | Product
    }

    type ProductData = Product[] | Product | null

    interface ReducerActionFunction { 
        type: string,
        payload: { 
            data: Product | Product[]
        }
    }

}

export {}