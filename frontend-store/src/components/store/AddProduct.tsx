import styled from "styled-components"
import { PlusIcon } from "../icons/Plus"

export const AddProduct = () => { 

    const handleAddProduct = () => { 
        
    }

    return <Wrapper>
        <div onClick={handleAddProduct} className="circle">
                <div className="icon">
                    <PlusIcon />
                </div>
        </div>
    </Wrapper>
}

const Wrapper = styled.div`
text-align: center;
margin: auto;
    .circle {
        box-shadow: #595959 0.5px 0.7px;
        cursor: pointer; 
        border-radius: 50%;
        width: 110px;
        aspect-ratio: 1;
        border: 0.5px solid #4a6a80;
        .icon { 
            margin-top: 17px;
        }
    }
`