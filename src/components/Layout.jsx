import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { useState } from "react";

const Layout = () => {
  const [stock, setStock] = useState(null);

  function handleStockSelect(selectedStock) {
    setStock(selectedStock);
    console.log("Selected:", selectedStock);
  }

  return (
    <>
      <Navbar selectedStock={handleStockSelect} />
      <Outlet context={{ displayStock: stock }} />
    </>
  );
};

export default Layout;
