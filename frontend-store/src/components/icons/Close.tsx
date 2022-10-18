import { useContext } from "react"
import { ReducerContext } from "../ReducerProvider"

interface Props { 
    sucess: boolean | null
}

export const CloseIcon: React.FC<Props> = ({sucess}) => { 

    const { dispatch } = useContext(ReducerContext);

    return <svg style={{cursor: 'pointer'}} onClick={() => dispatch({type: 'REMOVE_TOAST'})} xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="#000000" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><line x1="200" y1="56" x2="56" y2="200" stroke={sucess ? '#000' : '#fff'} stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line><line x1="200" y1="200" x2="56" y2="56" stroke={sucess ? '#000' : '#fff'} stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></line></svg>
}