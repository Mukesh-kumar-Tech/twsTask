import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../Context/Context";
import { useNavigate } from "react-router-dom";

const ProductListing = () => {
  const [product, setProducts] = useState([]);
  const [count, setCount] = useState(
    JSON.parse(localStorage.getItem("products"))
  );
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("https://fakestoreapi.com/products");

      console.log("data", data);
      if (data) {
        setProducts(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
    setAuth(count);
  }, []);

  const handleNavigate = () => {
    navigate("/checkout");
  };

  const disableButon = (id) => {
    if (count?.find((el) => el.id == id)) {
      return true;
    } else {
      return false;
    }
  };

  const buyProduct = (item) => {
    let a = [];
    let localItem = localStorage.getItem("products");
    if (localItem) {
      a = [...JSON.parse(localItem)];
    }
    a.push(item);
    localStorage.setItem("products", JSON.stringify(a));

    setCount(JSON.parse(localStorage.getItem("products")));
  };

  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-10">
            <div className="header_product">
              <h1>Product List</h1>
              <div className="items_count" onClick={handleNavigate}>
                <span>
                  <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                </span>
                <p>{count?.length}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-10">
            <div className="table-responsive">
              <table className="table">
                <tbody className="custome_tbl">
                  {product && product.length > 0 ? (
                    <>
                      {product.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <img
                              className="product_image"
                              src={item.image}
                              alt="product-image"
                            />
                          </td>
                          <td>
                            <p className="product_name">{item.title}</p>
                          </td>
                          <td>
                            {" "}
                            <p className="product_name">$ {item.price}</p>
                          </td>
                          <td>
                            <button
                              onClick={() => buyProduct(item)}
                              disabled={disableButon(item.id)}
                              className="btn btn-primary buy_btn"
                            >
                              buy
                            </button>
                          </td>
                        </tr>
                      ))}
                    </>
                  ) : (
                    <>
                      <p>data not found</p>
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductListing;
