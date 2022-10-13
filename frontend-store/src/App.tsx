import { useEffect, useState } from 'react';
import styled from 'styled-components';
import './App.css';

const App = () => {

  // const [data, setData] = useState<Products[] | null>(null)

  useEffect(() => { 
    
  }, [])

  return (
    <Wrapper>
      <div className='grid'>

      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
margin: 0;
font-size: 16px;
.grid { 
  display: grid;
  /*grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(1fr, 300px);*/
}
`

export default App;