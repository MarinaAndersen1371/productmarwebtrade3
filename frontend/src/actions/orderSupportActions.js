import axios from "axios";
import { logout } from "./customerActions";

export const listSupportOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "ORDER_SUPPORT_LIST_REQUEST" });

    const {
      customerLogin: { customerInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${customerInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/orders/support`, config);

    dispatch({ type: "ORDER_SUPPORT_LIST_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: "ORDER_SUPPORT_LIST_FAIL",
      payload: message,
    });
  }
};

export const updateDeliver = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: "ORDER_DELIVER_REQUEST" });

    const {
      customerLogin: { customerInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${customerInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/orders/${order._id}/deliver`,
      {},
      config
    );

    dispatch({ type: "ORDER_DELIVER_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: "ORDER_DELIVER_FAIL",
      payload: message,
    });
  }
};

export const updateDispatch = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: "ORDER_DISPATCH_REQUEST" });

    const {
      customerLogin: { customerInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${customerInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/orders/${order._id}/dispatch`,
      {},
      config
    );

    dispatch({ type: "ORDER_DISPATCH_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: "ORDER_DISPATCH_FAIL",
      payload: message,
    });
  }
};

export const updateReceive = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: "ORDER_RECEIVE_REQUEST" });

    const {
      customerLogin: { customerInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${customerInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/orders/${order._id}/receive`,
      {},
      config
    );

    dispatch({ type: "ORDER_RECEIVE_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: "ORDER_RECEIVE_FAIL",
      payload: message,
    });
  }
};
