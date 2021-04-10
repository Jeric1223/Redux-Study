import React from "react";
import CounterContainer from "./container/CounterContainer";
import TodosContainer from "./container/TodosCoutainer";

function App() {
  return (
    <div>
      <CounterContainer />
      <hr />
      <TodosContainer />
    </div>
  );
}

export default App;
