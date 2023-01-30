import axios from "axios";
import { logout } from "./customerActions";

export const listManagerOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "ORDER_MANAGER_LIST_REQUEST" });

    const {
      customerLogin: { customerInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${customerInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/orders/manager`, config);

    dispatch({ type: "ORDER_MANAGER_LIST_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: "ORDER_MANAGER_LIST_FAIL",
      payload: message,
    });
  }
};

export const updateCover = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: "ORDER_COVER_REQUEST" });

    const {
      customerLogin: { customerInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${customerInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/orders/${order._id}/cover`,
      {},
      config
    );

    dispatch({ type: "ORDER_COVER_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: "ORDER_COVER_FAIL",
      payload: message,
    });
  }
};

export const updateSend = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: "ORDER_SEND_REQUEST" });

    const {
      customerLogin: { customerInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${customerInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/orders/${order._id}/send`,
      {},
      config
    );

    dispatch({ type: "ORDER_SEND_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: "ORDER_SEND_FAIL",
      payload: message,
    });
  }
};

export const updateVoucher = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: "ORDER_VOUCHER_REQUEST" });

    const {
      customerLogin: { customerInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${customerInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/orders/${order._id}/voucher`,
      {},
      config
    );

    dispatch({ type: "ORDER_VOUCHER_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: "ORDER_VOUCHER_FAIL",
      payload: message,
    });
  }
};

export const updateRefund = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: "ORDER_REFUND_REQUEST" });

    const {
      customerLogin: { customerInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${customerInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/orders/${order._id}/refund`,
      {},
      config
    );

    dispatch({ type: "ORDER_REFUND_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: "ORDER_REFUND_FAIL",
      payload: message,
    });
  }
};

export const updateReturnClosed = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: "ORDER_CLOSE_RETURN_REQUEST" });

    const {
      customerLogin: { customerInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${customerInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/orders/${order._id}/returnclosed`,
      {},
      config
    );

    dispatch({ type: "ORDER_CLOSE_RETURN_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: "ORDER_CLOSE_RETURN_FAIL",
      payload: message,
    });
  }
};
