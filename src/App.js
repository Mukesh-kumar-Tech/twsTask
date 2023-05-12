import "./App.css";
import { Fragment } from "react";
import ProductListing from "./Components/ProductListing";
import { Routes, Route } from "react-router-dom";
import Checkout from "./Components/Checkout";
import OrderPage from "./Components/OrderPage";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<ProductListing />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="/order" element={<OrderPage />}></Route>
      </Routes>
    </Fragment>
  );
}

export default App;
