import styled from "styled-components"
import { PlusIcon } from "../icons/Plus"
import { useState } from "react";
import { Modal } from "../modal/Modal";

export const AddProduct: React.FC = () => { 

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [modalType, setModalType] = useState<'UPDATE' | 'ADD' | 'DELETE' | null>(null);

    const handleAdd = () => { 
        if (!isModalOpen) { 
            setIsModalOpen(true);
            setModalType('ADD');
        }
    }

    return <Wrapper>
        <div onClick={handleAdd} className="circle">
                <div className="icon-holder">
                        <PlusIcon />
                </div>
        </div>
        {isModalOpen ? <Modal type={modalType} setIsModalOpen={setIsModalOpen}/> : <></>}
    </Wrapper>
}

const Wrapper = styled.div`
text-align: center;
margin: auto;
    .circle {
        box-shadow: #595959 1.5px 1.2px 4px;
        cursor: pointer; 
        border-radius: 50%;
        width: 110px;
        aspect-ratio: 1;
        border: 0.5px solid #4a6a80;
        display: flex;
        justify-content: center;
        align-items: center;
    }
`