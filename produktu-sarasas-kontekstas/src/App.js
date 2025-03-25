import React from "react";
import ProductContext from "./context/ProductContext";
import ProductList from "./components/ProductList";

function App() {
  return (
    <ProductContext.Provider
      value={[
        { id: 1, pavadinimas: "Telefonas" },
        { id: 2, pavadinimas: "Kompiuteris" },
      ]}
    >
      <div>
        <ProductList />
      </div>
    </ProductContext.Provider>
  );
}

export default App;
