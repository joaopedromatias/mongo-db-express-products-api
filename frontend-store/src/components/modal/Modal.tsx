import styled from "styled-components"

interface WrapperProps { 
    documentHeight: number
}

interface Props { 
    type: 'UPDATE' | 'ADD' | 'DELETE' | null
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    productName: string
}

export const Modal: React.FC<Props> = ( { type, setIsModalOpen, productName }): JSX.Element => { 
    
    var documentHeight:number = Math.max(
        window.document.body.scrollHeight,
        window.document.body.offsetHeight, 
        window.document.documentElement.clientHeight, 
        window.document.documentElement.scrollHeight, 
        window.document.documentElement.offsetHeight );   
    
    return <Wrapper documentHeight={documentHeight}>
        <div className="modal-base">
                {type === 'UPDATE' ? 
                <div className="modal"> 
                    
                </div>
                : type === 'DELETE' ? 
                <div className="modal">
                    Do you really want to delete the {productName}?
                </div>
                : <></>}
            </div>
    </Wrapper>
}

const Wrapper = styled.div<WrapperProps>`
    .modal-base { 
        height: ${({ documentHeight }) => documentHeight+`px`};
        overflow: hidden;
        overflow-y: hidden;
        overflow-X: hidden;
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        opacity: 0.55;
        background-color: #4e4e4e;
        .modal { 
            opacity: 1;
            background-color: white
        }
    }
`