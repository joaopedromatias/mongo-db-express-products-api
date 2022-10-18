export const reducer = (state: StateData, action: ReducerActionFunction): StateData => { 

    const { type, payload } = action;

    if (payload) { 

        if (type === 'FETCHED_PRODUCTS' && payload.data) {
            return { 
                ...state,
                products: payload.data, 
                isDataFetched: true
            }
        }
    
        if (type === 'REFRESH_DATA' && payload.message && payload.sucess) { 
        
            return { 
                ...state,
                isDataOld: true,
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