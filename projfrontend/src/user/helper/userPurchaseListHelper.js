import { API } from "../../backend";

export const getUserPurchaseList = (userId, token) => {
  return fetch(`${API}/orders/user/${userId}`, {
    method: "GET",
    headers: {
      Authorization:`Bearer ${token}`
    }
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => console.log(error));
};