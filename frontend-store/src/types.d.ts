declare global { 
    interface Product { 
        id: number,
        name: string,
        price: number,
        image_url?: string
    }
    
    interface APIResponse { 
        sucess: boolean
        message?: string
        data?: Product[] | Product
    }

    interface ReducerActionFuntionPayload { 
        data?: Product[],
        productId?: number
    }

    interface StateData { 
        products: null | Product[]
        isDataFetched: boolean
        isDataOld: boolean
    }

    interface ReducerActionFunction { 
        type: string,
        payload: ReducerActionFuntionPayload 
    }
}

export {}