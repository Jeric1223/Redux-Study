import React from "react";
import { GlobalStyle } from "./GlobalStyle";
import Youtube from "./components/Youtube";
import { Provider } from "react-redux";
import store from "./module/store"

function App() {
  return (
    <>
    <Provider store={store}>
    <GlobalStyle />
      <Youtube />
    </Provider>
    </>
  );
}

export default App;
