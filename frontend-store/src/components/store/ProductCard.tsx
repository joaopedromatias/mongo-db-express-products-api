import styled from "styled-components"

export const ProductCard: React.FC<Product> = ({name, id, image_url, price}): JSX.Element => { 
    return <Wrapper>
        {'product name: ' + name}
    </Wrapper>
}

const Wrapper = styled.div`

`