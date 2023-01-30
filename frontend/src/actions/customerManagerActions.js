import axios from "axios";
import { logout } from "./customerActions";

export const listManagerCustomers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "CUSTOMER_MANAGER_LIST_REQUEST" });

    const {
      customerLogin: { customerInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${customerInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/customers/manager`, config);

    dispatch({ type: "CUSTOMER_MANAGER_LIST_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: "CUSTOMER_MANAGER_LIST_FAIL",
      payload: message,
    });
  }
};

export const updateToPrime = (customer) => async (dispatch, getState) => {
  try {
    dispatch({ type: "CUSTOMER_PRIME_REQUEST" });

    const {
      customerLogin: { customerInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${customerInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/customers/${customer._id}/prime`,
      {},
      config
    );

    dispatch({ type: "CUSTOMER_PRIME_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: "CUSTOMER_PRIME_FAIL",
      payload: message,
    });
  }
};

export const updateToFranchise = (customer) => async (dispatch, getState) => {
  try {
    dispatch({ type: "CUSTOMER_FRANCHISE_REQUEST" });

    const {
      customerLogin: { customerInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${customerInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/customers/${customer._id}/franchise`,
      {},
      config
    );

    dispatch({ type: "CUSTOMER_FRANCHISE_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: "CUSTOMER_FRANCHISE_FAIL",
      payload: message,
    });
  }
};

export const updateTestToPaid = (customer) => async (dispatch, getState) => {
  try {
    dispatch({ type: "CUSTOMER_TEST_PAID_REQUEST" });

    const {
      customerLogin: { customerInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${customerInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/customers/${customer._id}/testpaid`,
      {},
      config
    );

    dispatch({ type: "CUSTOMER_TEST_PAID_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: "CUSTOMER_TEST_PAID_FAIL",
      payload: message,
    });
  }
};

export const updateTestResult = (customer) => async (dispatch, getState) => {
  try {
    dispatch({ type: "CUSTOMER_TEST_RESULT_REQUEST" });

    const {
      customerLogin: { customerInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${customerInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/customers/${customer._id}/testresult`,
      {},
      config
    );

    dispatch({ type: "CUSTOMER_TEST_RESULT_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: "CUSTOMER_TEST_RESULT_FAIL",
      payload: message,
    });
  }
};

export const updateTestScore = (customer) => async (dispatch, getState) => {
  try {
    dispatch({ type: "CUSTOMER_TEST_SCORE_REQUEST" });

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
      `/api/customers/${customer._id}/testscore`,
      customer,
      config
    );

    dispatch({ type: "CUSTOMER_TEST_SCORE_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: "CUSTOMER_TEST_SCORE_FAIL",
      payload: message,
    });
  }
};

export const updateCustomerCoupon =
  (customer) => async (dispatch, getState) => {
    try {
      dispatch({ type: "CUSTOMER_COUPON_REQUEST" });

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
        `/api/customers/${customer._id}/coupon`,
        customer,
        config
      );

      dispatch({ type: "CUSTOMER_COUPON_SUCCESS", payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: "CUSTOMER_COUPON_FAIL",
        payload: message,
      });
    }
  };
