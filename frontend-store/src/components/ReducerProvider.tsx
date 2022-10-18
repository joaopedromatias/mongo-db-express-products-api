import { createContext, useReducer, ReactNode, FC } from 'react'
import { reducer } from '../reducer/reducer'

const initialState: StateData = { 
    products: null,
    isDataFetched: false,
    isDataOld: false,
    toast: { 
        isToastActive: false,
        message: '',
        sucess: null
    }
}

interface Props { 
    children: ReactNode
}

interface Context { 
    state: StateData
    dispatch: React.Dispatch<ReducerActionFunction>
}

export const ReducerContext = createContext<Context>({} as Context);

export const ReducerProvider: FC<Props> = ({ children }): JSX.Element => { 

    const [state, dispatch] = useReducer(reducer, initialState);
    
    return <ReducerContext.Provider value={ {state, dispatch}}>
        {children}
    </ReducerContext.Provider>
}