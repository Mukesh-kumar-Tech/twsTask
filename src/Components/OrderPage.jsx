import React, { Fragment, useEffect, useState } from "react";

const OrderPage = () => {
  const [userInfo, setUserInfo] = useState([]);
  const [productInfo, setProductInfo] = useState([]);
  console.log(productInfo, "userInfo", userInfo);

  useEffect(() => {
    setUserInfo(JSON.parse(localStorage.getItem("userDeatail")));
    setProductInfo(JSON.parse(localStorage.getItem("products")));
  }, []);

  const sum = productInfo.map((el) => el.price).reduce(add, 0);
  function add(accumulator, a) {
    return parseInt(accumulator) + parseInt(a);
  }

  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="user_info">
              <h4>User Details</h4>{" "}
              <p>
                Name: {userInfo.firstName} {userInfo.lastName}
              </p>
              <p> Email: {userInfo.email}</p>
              <p> Phone Number: {userInfo.phone}</p>
            </div>
          </div>
          <div className="col-md-6">
            <div className="product_info">
              <h4>Product Details</h4>
              <h4>Total Price {sum}</h4>
              <div className="table-responsive">
                <table className="table">
                  <tbody className="custome_tbl">
                    {productInfo && productInfo.length > 0 ? (
                      <>
                        {productInfo.map((item, index) => (
                          <tr key={index}>
                            <td>
                              <p className="product_name">{item.title}</p>
                            </td>
                            <td>
                              {" "}
                              <p className="product_name">$ {item.price}</p>
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
      </div>
    </Fragment>
  );
};

export default OrderPage;
