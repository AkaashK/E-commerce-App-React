/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import DropIn from "braintree-web-drop-in-react";
import { isAuthenticated } from "../auth/helper";
import { getmeToken, processPayment } from "./helper/paymentHelper";
import { cartEmpty } from "./helper/cartHelper";
import { createOrder } from "./helper/orderHelper";
import { Link } from "react-router-dom";

const userId = isAuthenticated() && isAuthenticated().user._id;
const token = isAuthenticated() && isAuthenticated().token;

const Payment = ({ products, setReload = (f) => f, reload = undefined }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const getToken = (userId, token) => {
    getmeToken(userId, token).then((info) => {
      if (info.error) {
        console.log("Error", info.error);
        setInfo({ ...info, error: info.error });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  const showBraintreeDropIn = () => {
    return (
      <div>
        {info.clientToken !== null &&
        products.length > 0 &&
        isAuthenticated() ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button className="btn btn-success btn-block" onClick={onPurchase}>
              Buy
            </button>
          </div>
        ) : info.success ? (
          <div>
            <h4>Payment Done Successfully</h4>
            <Link to="/">Return to purchase</Link> <br />
            <Link to="/user/dashboard">View Purchase list</Link>
          </div>
        ) : (
          <h4>please login or add something to the cart</h4>
        )}
      </div>
    );
  };

  const onPurchase = () => {
    setInfo({
      loading: true,
    });
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then((data) => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount(),
      };
      processPayment(userId, token, paymentData)
        .then((response) => {
          const orderData = {
            products: products,
            transaction_id: response.transaction.id,
            amount: response.transaction.amount,
          };
          createOrder(userId, token, orderData);
          setInfo({ ...info, loading: false, success: response.success });
          cartEmpty(() => {
            console.log("Cart is empty");
          });
          setReload(!reload);
        })
        .catch((error) =>
          setInfo({ loading: false, success: false, error: error })
        );
    });
  };

  const getAmount = () => {
    let amount = 0;
    products.map((product) => {
      amount += product.price;
    });
    return amount;
  };

  const isLoading = () => {
    if (info.loading) {
      return (
        <div>
          <h4>Loading...</h4>
        </div>
      );
    }
  };

  return (
    <div>
      {isLoading()}
      <h3 className="text-white">Your bill is {getAmount()} $</h3>
      {showBraintreeDropIn()}
    </div>
  );
};

export default Payment;
