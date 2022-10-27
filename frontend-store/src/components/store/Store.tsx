import { useContext } from "react"
import { useFetchProducts } from "../../hooks/useFetchProducts";
import { ReducerContext } from "../ReducerProvider"
import { ProductCard } from "./ProductCard";
import styled from "styled-components";
import { AddProduct } from "./AddProduct";
import { apiHostname, port, productsBaseRoute } from "../../utils/utils";
import { Toast } from "../toast/Toast";

export const Store = (): JSX.Element => { 
    
    const { state } = useContext(ReducerContext);
    
    useFetchProducts(apiHostname, port, productsBaseRoute);

    if(state.products) { 

        return <StoreWrapper>
            <div className="header">
                <span className="title">Store Admin Pannel</span>
            </div>
            <div className="products-grid">
                {state.products.map(product => { 
                    return <ProductCard
                        key={product.sku}
                        sku={product.sku}
                        name={product.name}
                        price={product.price}
                        image_url={product.image_url} />
                })}
                <AddProduct />
            </div>
            {state.toast.isToastActive ? <Toast message={state.toast.message} sucess={state.toast.sucess} /> : <></>}
        </StoreWrapper>
    }

    return <h3>Loading</h3>
}

const StoreWrapper = styled.div`
transition: all linear 2s;
.header {
    position: sticky;
    top: 0;
    height: 80px;
    width: 100vw;
    background: var(--header-bg-color);
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    .title { 
        display: inline-block;
        margin: 15px 0px;
        padding-top: 10px;
        font-size: 1.7rem;
        font-weight: 500;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        letter-spacing: 1px;
    }
}
.products-grid { 
    margin: 50px 100px;
    display: grid;
    column-gap: 80px;
    row-gap: 50px;
    grid-template-columns: auto auto auto;
}
`