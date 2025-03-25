import React, { useContext } from "react";
import ProductContext from "../context/ProductContext";

function ProductList() {
  const produktai = useContext(ProductContext);

  return (
    <div>
      <h2>Produktų sąrašas:</h2>
      <ul>
        {produktai.map((produktas) => (
          <li key={produktas.id}>{produktas.pavadinimas}</li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
