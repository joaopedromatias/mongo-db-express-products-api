import { useContext } from "react"
import { useFetch } from "../../hooks/useFetch"
import { ReducerContext } from "../ReducerProvider"

const apiHostname = 'http://localhost'
const port = 2000;

export const Store = (): JSX.Element => { 
    
    const { productData } = useContext(ReducerContext);

    useFetch(apiHostname, port);
        
    if(Array.isArray(productData)) { 

        return <div>{productData.map(product => { 
            return <div>{product.name}</div>
        })}</div>

    }

    return <div>Error</div>
}