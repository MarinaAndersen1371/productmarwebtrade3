import axios from "axios";
import { logout } from "./customerActions";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: "ORDER_CREATE_REQUEST" });

    const {
      customerLogin: { customerInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${customerInfo.token}`,
      },
    };
    const { data } = await axios.post(`/api/orders`, order, config);

    dispatch({ type: "ORDER_CREATE_SUCCESS", payload: data });
    dispatch({ type: "PRODUCT_DETAILS_SUCCESS", payload: data });
    dispatch({ type: "CART_CLEAR_ITEMS", payload: data });
    localStorage.removeItem("cartItems");
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: "ORDER_CREATE_FAIL",
      payload: message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "ORDER_DETAILS_REQUEST" });

    const {
      customerLogin: { customerInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${customerInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/orders/${id}`, config);

    dispatch({ type: "ORDER_DETAILS_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: "ORDER_DETAILS_FAIL",
      payload: message,
    });
  }
};

export const orderPay =
  (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch({ type: "ORDER_PAY_REQUEST" });

      const {
        customerLogin: { customerInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${customerInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/orders/${orderId}/pay`,
        paymentResult,
        config
      );

      dispatch({ type: "ORDER_PAY_SUCCESS", payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: "ORDER_PAY_FAIL",
        payload: message,
      });
    }
  };

export const getCustomerCoupon = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: "ORDER_CUSTOMER_COUPON_REQUEST" });

    const {
      customerLogin: { customerInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${customerInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/orders/${order._id}/coupon`,
      order,
      config
    );

    dispatch({ type: "ORDER_CUSTOMER_COUPON_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: "ORDER_CUSTOMER_COUPON_FAIL",
      payload: message,
    });
  }
};

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "ORDER_MY_LIST_REQUEST" });

    const {
      customerLogin: { customerInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${customerInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/orders/myorders`, config);

    dispatch({ type: "ORDER_MY_LIST_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: "ORDER_MY_LIST_FAIL",
      payload: message,
    });
  }
};

export const listAdminOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "ORDER_ADMIN_LIST_REQUEST" });

    const {
      customerLogin: { customerInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${customerInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/orders`, config);

    dispatch({ type: "ORDER_ADMIN_LIST_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: "ORDER_ADMIN_LIST_FAIL",
      payload: message,
    });
  }
};

export const confirmOrderReturn = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: "ORDER_CONFIRM_RETURN_REQUEST" });

    const {
      customerLogin: { customerInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${customerInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/orders/${order._id}/returnactive`,
      {},
      config
    );

    dispatch({ type: "ORDER_CONFIRM_RETURN_SUCCESS" });
    dispatch({ type: "ORDER_DETAILS_SUCCESS", payload: data });
    dispatch({ type: "ORDER_DETAILS_RESET" });
    dispatch({ type: "PRODUCT_DETAILS_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: "ORDER_CONFIRM_RETURN_FAIL",
      payload: message,
    });
  }
};
