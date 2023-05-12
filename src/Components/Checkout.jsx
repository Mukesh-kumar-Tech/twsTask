import React, { Fragment, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phone: Yup.string().required("Required"),
});

const Checkout = () => {
  const navigate = useNavigate();

  const [cartIem, setCartItem] = useState(
    JSON.parse(localStorage.getItem("products"))
  );

  return (
    <Fragment>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h1>Checkout</h1>
            <div>
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  email: "",
                  phone: "",
                }}
                validationSchema={SignupSchema}
                onSubmit={(values) => {
                  // same shape as initial values
                  localStorage.setItem("userDeatail", JSON.stringify(values));
                  navigate("/order");
                  console.log("values", values);
                }}
              >
                {({ errors, touched }) => (
                  <Form>
                    <Field
                      name="firstName"
                      className="form-control mb-2"
                      placeholder="Enter first name"
                    />
                    {errors.firstName && touched.firstName ? (
                      <div className="text-danger  mb-3">
                        {errors.firstName}
                      </div>
                    ) : null}
                    <Field
                      name="lastName"
                      className="form-control mb-2"
                      placeholder="Enter last name"
                    />
                    {errors.lastName && touched.lastName ? (
                      <div className="text-danger  mb-3">{errors.lastName}</div>
                    ) : null}
                    <Field
                      name="email"
                      type="email"
                      className="form-control mb-2 "
                      placeholder="Enter email addres"
                    />
                    {errors.email && touched.email ? (
                      <div className="text-danger  mb-3">{errors.email}</div>
                    ) : null}

                    <Field
                      name="phone"
                      type="text"
                      className="form-control mb-2"
                      placeholder="Enter phone number"
                    />
                    {errors.phone && touched.phone ? (
                      <div className="text-danger  mb-3">{errors.phone}</div>
                    ) : null}

                    <button type="submit" className="btn btn-success">
                      Submit
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
          <div className="col-md-6">
            <div className="table-responsive">
              <table className="table">
                <tbody className="custome_tbl">
                  {cartIem && cartIem.length > 0 ? (
                    <>
                      {cartIem.map((item, index) => (
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

export default Checkout;
