export const reducer = (state: StateData, action: ReducerActionFunction): StateData => { 

    const { type, payload } = action;

    if (type === 'FETCHED_PRODUCTS') {
        return { 
            products: payload, 
            isDataFetched: true 
        }
    }

    return state
}