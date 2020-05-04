import { API } from "../../backend";

export const getmeToken = (userId, token) => {
  return fetch(`${API}/payment/gettoken/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};

export const processPayment = (userId, token, paymetInfo) => {
  return fetch(`${API}/payment/braintree/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(paymetInfo),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};
