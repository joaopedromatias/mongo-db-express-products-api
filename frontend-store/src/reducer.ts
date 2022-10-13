export const reducer = (state: ProductData, action: ReducerActionFunction): ProductData => { 

    const { type, payload } = action;

    if (type === 'FETCHED_PRODUCTS') { 
        return payload.data
    }

    return state
}