import { ReducerProvider } from "./components/ReducerProvider";
import { Store } from "./components/store/Store";
import GlobalStyle from "./globalStyle";

const App = () => {
  return <ReducerProvider>
           <GlobalStyle />
           <Store/>
      </ReducerProvider>
}

export default App;