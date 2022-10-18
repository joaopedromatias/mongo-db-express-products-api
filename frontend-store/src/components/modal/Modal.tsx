import { ChangeEvent, useContext, useEffect } from "react"
import styled from "styled-components"
import axios from "axios";
import { apiHostname, port, productsBaseRoute } from "../../utils/utils";
import { ReducerContext } from "../ReducerProvider";

interface WrapperProps { 
    documentHeight: number
}

interface Props { 
    type: 'UPDATE' | 'ADD' | 'DELETE' | null
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    productName: string
    productId: number
    productPrice: number
}

export const Modal: React.FC<Props> = ( { type, setIsModalOpen, productName, productId, productPrice }): JSX.Element => { 
    
    const { dispatch } = useContext(ReducerContext);

    const handleDelete = async (productId: number) => { 
        const res = await axios.delete(`${apiHostname}:${port}${productsBaseRoute}/${productId}`);
        const data: APIResponse = res.data;

        if (data.sucess) { 
            dispatch({ type: 'REFRESH_DATA', payload: { 
                sucess: data.sucess,
                message: data.message
            } });
        }

        setIsModalOpen(false);
    }

    const modalCloseClick = ( { target }: MouseEvent ) => { 
        if ((target as HTMLElement).classList[0] === 'dark-bg') { 
            setIsModalOpen(false);
        }
    }

    document.addEventListener('click', modalCloseClick);
    
    useEffect(() => { 
        return () => document.removeEventListener('click', modalCloseClick) 
    })

    var documentHeight:number = Math.max(
        window.document.body.scrollHeight,
        window.document.body.offsetHeight, 
        window.document.documentElement.clientHeight, 
        window.document.documentElement.scrollHeight, 
        window.document.documentElement.offsetHeight );   

    const openFileDialog = () => { 
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'
        input.onchange = (e: Event) => { 
            // get user image
        }
        input.click();
    }
    
    return <Wrapper documentHeight={documentHeight}>
        <div className="dark-bg"></div>
        <div className="modal-base">
            {type === 'UPDATE' ? 
            <div className="modal"> 
                <input type="text" placeholder={productName}/>
                <br />
                <input type="number" placeholder={'$ ' + String(productPrice)}/>
                <br />
                <div className="fileInput" onClick={openFileDialog}>
                    Change image
                </div>
                <br />
                <button className="btn save">Save</button>
                <button className="btn cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
            : type === 'DELETE' ? 
            <div className="modal">
                <div className="modal-text">Are you sure you want to delete the {productName}?</div>
                <button className="btn delete" onClick={() => handleDelete(productId)}>Delete</button>
                <button className="btn cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
            : type === 'ADD' ?
            <div className="modal"> 
                {/* ADD MODAL HERE */}
            </div>
            : <></>}
        </div>
    </Wrapper>
}

const Wrapper = styled.div<WrapperProps>`
    .dark-bg { 
        height: ${({ documentHeight }) => documentHeight+`px`};
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        opacity: 0.55;
        background-color: #4e4e4e;
    }
    .modal-base { 
        position: absolute;
        top: 0;
        left: 0;
        .modal {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            left: 50%;
            transform: translateX(-50%);
            opacity: 1;
            position: fixed;
            top: 40%;
            background-color: #ececec;
            padding: 25px 15px;
            border-radius: 10px;
            letter-spacing: 0.5px;
            input { 
                padding: 10px 5px;
                border: none;
                border-radius: 7px;
                font-size: 0.9rem;
                margin-bottom: 15px;
                ::placeholder { 
                    font-style: italic;    
                }
                :focus { 
                    border: darkgray 1px solid;
                    outline: none
                }
            }
        .modal-text { 
            font-size: 1.1rem;
        }
        .btn { 
            padding: 10px 15px;
            margin: 15px 10px;
            margin-bottom: 5px;
            border-radius: 10px;
            font-size: 0.9rem;
            cursor: pointer;
            letter-spacing: 1.2px;
        }
        .delete { 
            background-color: #e43b3b;
            color: white;
            border: 1px solid lightcoral;
        }
        .cancel { 
            border: 0.5px solid #333533;
            background-color: #ececec;
        }
        .save { 
            background-color: #2669c1;
            color: white;
            border: 1px solid lightblue;
        }
        .fileInput { 
            text-decoration: underline;
            cursor: pointer;
        }
    }
    }
    
`