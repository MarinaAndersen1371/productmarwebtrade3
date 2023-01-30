import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "CUSTOMER_LOGIN_REQUEST" });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      `/api/customers/login`,
      { email, password },
      config
    );

    dispatch({ type: "CUSTOMER_LOGIN_SUCCESS", payload: data });
    localStorage.setItem("customerInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: "CUSTOMER_LOGIN_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("customerInfo");
  localStorage.removeItem("cartItems");
  localStorage.removeItem("shippingAddress");
  localStorage.removeItem("invoiceAddress");
  localStorage.removeItem("payment");
  localStorage.removeItem("subscription");
  dispatch({ type: "CUSTOMER_LOGOUT" });
  dispatch({ type: "CUSTOMER_DETAILS_RESET" });
  dispatch({ type: "ORDER_MY_LIST_RESET" });
  dispatch({ type: "TICKET_MY_LIST_RESET" });
  dispatch({ type: "TICKET_DETAILS_RESET" });
  document.location.href = "/login";
};

export const register =
  (firstName, name, email, password, phone, birthday, gender, purpose) =>
  async (dispatch) => {
    try {
      dispatch({ type: "CUSTOMER_REGISTER_REQUEST" });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `/api/customers`,
        { firstName, name, email, password, phone, birthday, gender, purpose },
        config
      );

      dispatch({ type: "CUSTOMER_REGISTER_SUCCESS", payload: data });
      dispatch({ type: "CUSTOMER_LOGIN_SUCCESS", payload: data });
      localStorage.setItem("customerInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: "CUSTOMER_REGISTER_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getCustomerDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "CUSTOMER_DETAILS_REQUEST" });

    const {
      customerLogin: { customerInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${customerInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/customers/${id}`, config);
    dispatch({ type: "CUSTOMER_DETAILS_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: "CUSTOMER_DETAILS_FAIL",
      payload: message,
    });
  }
};

export const updateTestCustomer = (customer) => async (dispatch, getState) => {
  try {
    dispatch({ type: "CUSTOMER_UPDATE_TEST_REQUEST" });

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
      `/api/customers/${customer._id}/test`,
      customer,
      config
    );
    dispatch({ type: "CUSTOMER_UPDATE_TEST_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: "CUSTOMER_UPDATE_TEST_FAIL",
      payload: message,
    });
  }
};

export const listAdminCustomers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "CUSTOMER_ADMIN_LIST_REQUEST" });

    const {
      customerLogin: { customerInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${customerInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/customers`, config);

    dispatch({ type: "CUSTOMER_ADMIN_LIST_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: "CUSTOMER_ADMIN_LIST_FAIL",
      payload: message,
    });
  }
};

export const updateCustomerProfile =
  (customer) => async (dispatch, getState) => {
    try {
      dispatch({ type: "CUSTOMER_UPDATE_PROFILE_REQUEST" });

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
        `/api/customers/profile`,
        customer,
        config
      );

      dispatch({ type: "CUSTOMER_UPDATE_PROFILE_SUCCESS", payload: data });
      dispatch({ type: "CUSTOMER_LOGIN_SUCCESS", payload: data });
      localStorage.setItem("customerInfo", JSON.stringify(data));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: "CUSTOMER_UPDATE_PROFILE_FAIL",
        payload: message,
      });
    }
  };

export const updateAdminCustomer = (customer) => async (dispatch, getState) => {
  try {
    dispatch({ type: "CUSTOMER_UPDATE_REQUEST" });

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
      `/api/customers/${customer._id}/admin`,
      customer,
      config
    );
    dispatch({ type: "CUSTOMER_UPDATE_SUCCESS", payload: data });
    dispatch({ type: "CUSTOMER_DETAILS_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: "CUSTOMER_UPDATE_FAIL",
      payload: message,
    });
  }
};

export const deleteCustomer = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "CUSTOMER_DELETE_REQUEST" });

    const {
      customerLogin: { customerInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${customerInfo.token}`,
      },
    };
    const { data } = await axios.put(`/api/customers/${id}/cancel`, {}, config);
    dispatch({ type: "CUSTOMER_DELETE_SUCCESS", payload: data });
    dispatch({ type: "CUSTOMER_DETAILS_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: "CUSTOMER_DELETE_FAIL",
      payload: message,
    });
  }
};
