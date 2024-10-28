import React from "react";
import "./App.css";
import DynamicForm from "./Fundamentals/DynamicForm";

function App() {
  return (
    <div className="app">
      <DynamicForm formKey="person" />
    </div>
  );
}

export default App;
