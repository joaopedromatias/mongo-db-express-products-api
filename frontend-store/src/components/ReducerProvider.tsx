import { createContext, useReducer, ReactNode, FC } from 'react'
import { reducer } from '../reducer'

const initialState: ProductData = null

interface Props { 
    children: ReactNode
}

interface Context { 
    productData: ProductData
    dispatch: React.Dispatch<ReducerActionFunction>
}

export const ReducerContext = createContext<Context>({} as Context);

export const ReducerProvider: FC<Props> = ({ children }): JSX.Element => { 

    const [productData, dispatch] = useReducer(reducer, initialState);

    return <ReducerContext.Provider value={ {productData, dispatch}}>
        {children}
    </ReducerContext.Provider>
}