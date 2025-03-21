import React from "react";
import Home from "./components/Drawing"; 
import CableDrawing from "./components/cabledrawing"; 
function App() {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Wire Drawing Process</h1>
      <CableDrawing />
      <Home />
    </div>
  );
}

export default App;
