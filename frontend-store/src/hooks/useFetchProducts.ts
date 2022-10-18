import axios from "axios";
import { useContext } from "react";
import { ReducerContext } from "../components/ReducerProvider";

export const useFetchProducts = async (host: string, port: number, path: string) => { 

    const { state, dispatch} = useContext(ReducerContext);

    if (!state.isDataFetched || state.isDataOld) { 

        const res = await axios.get(`${host}:${port}${path}`);
        const rawData: APIResponse = await res.data;
        
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