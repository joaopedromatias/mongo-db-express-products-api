import { useContext, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import axios, { AxiosError } from "axios";
import { apiHostname, port, productsBaseRoute } from "../../utils/utils";
import { ReducerContext } from "../ReducerProvider";

interface WrapperProps { 
    documentHeight: number
}

interface Props { 
    type: 'UPDATE' | 'ADD' | 'DELETE' | null
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    productName?: string
    productSku?: number
    productPrice?: number
}

export const Modal: React.FC<Props> = ( { type, setIsModalOpen, productName, productSku, productPrice }): JSX.Element => { 
    
    const { dispatch } = useContext(ReducerContext);

    const [imageUrl, setImageUrl] = useState<string | ArrayBuffer | null>(null);
    const fileInput = useRef<HTMLInputElement>({} as HTMLInputElement);
    const nameInput = useRef<HTMLInputElement>({} as HTMLInputElement);
    const priceInput = useRef<HTMLInputElement>({} as HTMLInputElement);
    const skuInput = useRef<HTMLInputElement>({} as HTMLInputElement);

    useEffect(() => { 
        dispatch({type: 'REMOVE_TOAST'});
    }, []);

    const handleDelete = async (productId: number) => { 

        try { 
            const res = await axios.delete(`${apiHostname}:${port}${productsBaseRoute}/${productId}`);
            const data: APIResponse = res.data;

            dispatch({ type: 'EVALUATE_RESPONSE', payload: { 
                sucess: data.sucess,
                message: data.message
            } });

        } catch (err) { 

            const errorResponse = (err as AxiosError).response
            const errorData = errorResponse ? errorResponse.data : null;
            const errorMessage = (errorData as APIResponse).message;

            dispatch({ type: 'EVALUATE_RESPONSE', payload: { 
                sucess: false,
                message: errorMessage
            } });      
        }
        
        setIsModalOpen(false);
    }

    const handleEdit = async (productId: number) => { 

        try {
            const res = await axios.patch(`${apiHostname}:${port}${productsBaseRoute}/${productId}`, { 
                name: nameInput.current.value,
                price: priceInput.current.value,
                image_url: imageUrl
            });

            const data: APIResponse = res.data;

            dispatch({ type: 'EVALUATE_RESPONSE', payload: { 
                sucess: data.sucess,
                message: data.message
            } });

            setIsModalOpen(false);  

        } catch (err) { 
            console.log(err);
            const errorResponse = (err as AxiosError).response
            const errorData = errorResponse ? errorResponse.data : null;
            const errorMessage = (errorData as APIResponse).message;
            
            dispatch({ type: 'EVALUATE_RESPONSE', payload: { 
                sucess: false,
                message: errorMessage
            }})
        }
    }

    const handleAdd = async () => { 
        try {
            const res = await axios.post(`${apiHostname}:${port}${productsBaseRoute}/`, { 
                name: nameInput.current.value,
                price: priceInput.current.value,
                image_url: imageUrl,
                sku: skuInput.current.value
            });

            const data: APIResponse = res.data;

            dispatch({ type: 'EVALUATE_RESPONSE', payload: { 
                sucess: data.sucess,
                message: data.message
            } });

            setIsModalOpen(false);  

        } catch (err) { 
            
            const errorResponse = (err as AxiosError).response
            const errorData = errorResponse ? errorResponse.data : null;
            const errorMessage = (errorData as APIResponse).message;
            
            dispatch({ type: 'EVALUATE_RESPONSE', payload: { 
                sucess: false,
                message: errorMessage
            }})
        }

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
        input.type = 'file';
        input.onchange = (e: Event) => { 
            
            const file = e.path[0].files[0];
            const reader = new FileReader();

            reader.addEventListener("load", () => {
                setImageUrl(reader.result);
                fileInput.current?.classList.add('file-loaded');
            }, false);

            if (file) { 
                reader.readAsDataURL(file);
            }
        }
        input.click();
    }
    
    return <Wrapper documentHeight={documentHeight}>
        <div className="dark-bg"></div>
        <div className="modal-base">
            {type === 'UPDATE' && productSku? 
            <div className="modal"> 
                <input type="text" ref={nameInput} placeholder={productName}/>
                <br />
                <input type="number" ref={priceInput} placeholder={'$ ' + String(Number(productPrice).toFixed(2)) } />
                <br />
                <div className="file-input" ref={fileInput} onClick={openFileDialog}>
                    Change image
                </div>
                <br />
                <button className="btn save" onClick={() => handleEdit(productSku)}>Save</button>
                <button className="btn cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div>
            : type === 'DELETE' && productSku ? 
            <div className="modal">
                <div className="modal-text">Are you sure you want to delete the {productName}?</div>
                <button className="btn delete" onClick={() => handleDelete(productSku)}>Delete</button>
                <button className="btn cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
            </div> 
            : type === 'ADD' ? 
            <div className="modal">
                <input type="text" ref={nameInput} placeholder='Product name...'/>
                <br />
                <input type="number" ref={priceInput} placeholder='Product price...'/>
                <br />
                <input type="number" ref={skuInput} placeholder='Product SKU...'/>
                <br />
                <div className="file-input" ref={fileInput} onClick={openFileDialog}>
                    Change image
                </div>
                <br />
                <button className="btn save" onClick={handleAdd}>Add</button>
                <button className="btn cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
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
        .file-input { 
            text-decoration: underline;
            cursor: pointer;
        }
        .file-loaded { 
            color: #12a812;
            &::after { 
                content: '';
                margin-left: 5px;
                width: 30px;
                height: 30px;
                background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' fill='%230FA812' viewBox='0 0 256 256'%3E%3Crect width='256' height='256' fill='none'%3E%3C/rect%3E%3Cpolyline points='216 72 104 184 48 128' fill='none' stroke='%230FA812' stroke-linecap='round' stroke-linejoin='round' stroke-width='16'%3E%3C/polyline%3E%3C/svg%3E") -30px;
                display: inline-block;
                vertical-align: -50%;
            }
        }
    }
    }
    
`