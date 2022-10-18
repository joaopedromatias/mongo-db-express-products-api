import { useContext, useEffect } from "react"
import styled from "styled-components"
import { ReducerContext } from "../ReducerProvider"
import { CloseIcon } from "../icons/Close"

interface WrapperProps { 
    sucess: boolean | null
}

interface Props extends WrapperProps { 
    message: string
}

export const Toast: React.FC<Props> = ({ sucess, message }): JSX.Element => { 

    const { dispatch } = useContext(ReducerContext);

    useEffect(() => {
        const timeout = setTimeout(() => { 
            dispatch({type: 'REMOVE_TOAST'});
        }, 5000);
        return () => { 
            clearTimeout(timeout);
        }
    }, []);

    return <Wrapper sucess={sucess}>
        <div className="toast">
            <div className="toast-message">
                    <span className="text">{message}</span>
                    <CloseIcon sucess={sucess}/>
            </div>
        </div>
    </Wrapper>
    
}

const Wrapper = styled.div<WrapperProps>`
.toast { 
    background-color: ${({sucess}) => sucess ? '#2fcd35' : '#e60c34'};
    color: ${({sucess}) => sucess ? 'initial' : '#f1f1f1'};
    text-align: left;
    position: fixed;
    top: 85px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 5px;
    .toast-message { 
        padding: 8px 10px;
        font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .text { 
            padding-right: 50px;
        }
    }
}
`