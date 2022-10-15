export const reducer = (state: StateData, action: ReducerActionFunction): StateData => { 

    const { type, payload } = action;

    if (type === 'FETCHED_PRODUCTS' && payload.data) {
        return { 
            products: payload.data, 
            isDataFetched: true,
            isDataOld: false
        }
    }

    if(type === 'DELETE_PRODUCT' && payload.productId) { 

    }

    if(type === 'UPDATE_PRODUCT' && payload.productId) { 
        
    }

    if(type === 'ADD_PRODUCT' && payload.productId) { 
        
    }

    return state
}