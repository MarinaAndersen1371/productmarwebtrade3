import axios from "axios";

export const addToCart =
  (id, qty, discount, warranty, gift, extra1, extra2) =>
  async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: "CART_ADD_ITEM",
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        pricePurchase: data.pricePurchase,
        qty,
        discount,
        warranty,
        gift,
        extra1,
        extra2,
      },
    });
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  };

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({ type: "CART_REMOVE_ITEM", payload: id });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: "CART_SAVE_SHIPPING_ADDRESS", payload: data });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const saveInvoiceAddress = (data) => (dispatch) => {
  dispatch({ type: "CART_SAVE_INVOICE_ADDRESS", payload: data });
  localStorage.setItem("invoiceAddress", JSON.stringify(data));
};

export const savePayment = (data) => (dispatch) => {
  dispatch({ type: "CART_SAVE_PAYMENT", payload: data });
  localStorage.setItem("payment", JSON.stringify(data));
};

export const saveSubscription = (data) => (dispatch) => {
  dispatch({ type: "CART_SAVE_SUBSCRIPTION", payload: data });
  localStorage.setItem("subscription", JSON.stringify(data));
};
