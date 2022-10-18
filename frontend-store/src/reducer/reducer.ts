export const reducer = (state: StateData, action: ReducerActionFunction): StateData => { 

    const { type, payload } = action;

    if (payload) { 

        if (type === 'FETCHED_PRODUCTS' && payload.data) {
            return { 
                ...state,
                products: payload.data, 
                isDataFetched: true,
                isDataOld: false
            }
        }
    
        if (type === 'EVALUATE_RESPONSE' && payload.message && typeof payload.sucess === 'boolean') { 
        
            return { 
                ...state,
                isDataOld: payload.sucess,
                toast: {
                    isToastActive: true,
                    message: payload.message,
                    sucess: payload.sucess
                }
            }

        }
    }

    if (type === 'REMOVE_TOAST') { 
        return { 
            ...state, 
            toast: { 
                isToastActive: false,
                message: '',
                sucess: null
            }
        }
    }

    return state
}