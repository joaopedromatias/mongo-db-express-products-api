import { ReducerProvider } from "./components/ReducerProvider";
import { Store } from "./components/store/Store";

const App = () => {
  return <ReducerProvider>
      <Store/>
    </ReducerProvider>
}


export default App;