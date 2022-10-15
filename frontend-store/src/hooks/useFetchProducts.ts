import { useContext } from "react";
import { ReducerContext } from "../components/ReducerProvider";

export const useFetchProducts = async (host: string, port: number, path: string) => { 

    const { productData, dispatch} = useContext(ReducerContext);

    if (!productData.isDataFetched || productData.isDataOld) { 

        const res = await fetch(`${host}:${port}${path}`);
        const rawData: APIResponse = await res.json();
        
        const { data } = rawData;
    
        if (Array.isArray(data)) { 
            dispatch({
                type: 'FETCHED_PRODUCTS',
                payload: { 
                    data: data
                }
            });
        }
    }
    
}