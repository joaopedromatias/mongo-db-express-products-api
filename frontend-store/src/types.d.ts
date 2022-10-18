declare global { 

    interface Event { 
        path: Files[]
    }

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
        message?: string
        sucess?: boolean 
    }

    interface StateData { 
        products: null | Product[]
        isDataFetched: boolean
        isDataOld: boolean
        toast: { 
            isToastActive: boolean
            message: string
            sucess: boolean | null
        }
    }

    interface ReducerActionFunction { 
        type: string,
        payload?: ReducerActionFuntionPayload 
    }
}

export {}