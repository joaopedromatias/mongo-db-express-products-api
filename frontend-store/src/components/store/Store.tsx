import { useContext } from "react"
import { ReducerContext } from "../ReducerProvider"
import { ProductCard } from "./ProductCard";

const apiHostname = 'http://localhost';
const port = 8080;
const path = '/api/products';

export const Store = (): JSX.Element => { 
    
    const { productData, dispatch } = useContext(ReducerContext);
    
    const fetchData = async (host: string, port: number, path: string) => { 

        const res = await fetch(`${host}:${port}${path}`);
        const rawData: APIResponse = await res.json();
        
        const { data } = rawData;

        if (Array.isArray(data)) { 
            dispatch({
                type: 'FETCHED_PRODUCTS',
                payload: data
            });
        }
        
    }

    productData.isDataFetched ? <></> : fetchData(apiHostname, port, path);    

    if(Array.isArray(productData.products)) { 

        return <div>
            {productData.products.map(product => { 
                return <ProductCard 
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image_url={product.image_url} />
            })}
        </div>
    }

    return <div>Error</div>
}