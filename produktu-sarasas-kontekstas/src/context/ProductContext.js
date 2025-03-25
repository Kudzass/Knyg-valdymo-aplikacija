import { createContext } from "react";

const ProductContext = createContext([
  { id: 1, pavadinimas: "Telefonas" },
  { id: 2, pavadinimas: "Kompiuteris" },
]);

export default ProductContext;
