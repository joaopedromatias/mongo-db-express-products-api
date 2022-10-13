import styled from "styled-components"

export const ProductCard: React.FC<Product> = ({name, id, image_url, price}): JSX.Element => { 
    return <Wrapper>
        <div className="name">{name}</div>
    </Wrapper>
}

const Wrapper = styled.div`
border: 0.5px lightgray solid;
border-radius: 10px;
height: 250px;
.name { 
    padding-top: 10px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    text-transform: capitalize;
    font-size: 1.2rem;
}
`