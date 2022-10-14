import { useContext } from "react"
import { useFetchProducts } from "../../hooks/useFetchProducts";
import { ReducerContext } from "../ReducerProvider"
import { ProductCard } from "./ProductCard";
import styled from "styled-components";
import { AddProduct } from "./AddProduct";

const apiHostname = 'http://localhost';
const port = 8080;
const getProductsRoute = '/api/products';

export const Store = (): JSX.Element => { 
    
    const { productData: { products} } = useContext(ReducerContext);
    
    useFetchProducts(apiHostname, port, getProductsRoute);

    if(products) { 

        return <StoreWrapper>
            <div className="header">
                <span className="title">Store Admin Pannel</span>
            </div>
            <div className="products-grid">
                {products.map(product => { 
                    return <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        image_url={product.image_url} />
                })}
                <AddProduct />
            </div>
        </StoreWrapper>
    }

    return <h3>Error</h3>
}

const StoreWrapper = styled.div`
.header {
    height: 80px;
    background: var(--header-bg-color);
    .title { 
        display: inline-block;
        margin: 15px 0px;
        padding-top: 10px;
        font-size: 1.5rem;
        font-weight: 500;
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