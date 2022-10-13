import { useContext } from "react";
import { ReducerContext } from "../components/ReducerProvider";

export const useFetch = async (host: string, port: number, path?: string) => { 
    
    const { dispatch } = useContext(ReducerContext);

    const res = await fetch(`${host}:${port}/${path}`);
    const data: Product[] | Product = await res.json();
    
    dispatch({ 
        type: 'FETCHED_PRODUCTS',
        payload: { 
            data: data
        }
    })

};