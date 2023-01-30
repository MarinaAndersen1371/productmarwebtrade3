import axios from "axios";
import { logout } from "./customerActions";

export const createTicket = (ticket) => async (dispatch, getState) => {
  try {
    dispatch({ type: "TICKET_CREATE_REQUEST" });

    const {
      customerLogin: { customerInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${customerInfo.token}`,
      },
    };
    const { data } = await axios.post(`/api/tickets`, ticket, config);
    dispatch({ type: "TICKET_CREATE_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: "TICKET_CREATE_FAIL",
      payload: message,
    });
  }
};

export const getTicketDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "TICKET_DETAILS_REQUEST" });

    const {
      customerLogin: { customerInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${customerInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/tickets/${id}`, config);
    dispatch({ type: "TICKET_DETAILS_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: "TICKET_DETAILS_FAIL",
      payload: message,
    });
  }
};

export const getMyTicketList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "TICKET_MY_LIST_REQUEST" });

    const {
      customerLogin: { customerInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${customerInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/tickets`, config);
    dispatch({ type: "TICKET_MY_LIST_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: "TICKET_MY_LIST_FAIL",
      payload: message,
    });
  }
};

export const getManagerTicketList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "TICKET_MANAGER_LIST_REQUEST" });

    const {
      customerLogin: { customerInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${customerInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/tickets/manager`, config);
    dispatch({ type: "TICKET_MANAGER_LIST_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: "TICKET_MANAGER_LIST_FAIL",
      payload: message,
    });
  }
};

export const getAdminTicketList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "TICKET_ADMIN_LIST_REQUEST" });

    const {
      customerLogin: { customerInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${customerInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/tickets/admin`, config);
    dispatch({ type: "TICKET_ADMIN_LIST_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: "TICKET_ADMIN_LIST_FAIL",
      payload: message,
    });
  }
};

export const getSupportTicketList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "TICKET_SUPPORT_LIST_REQUEST" });

    const {
      customerLogin: { customerInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${customerInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/tickets/support`, config);
    dispatch({ type: "TICKET_SUPPORT_LIST_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: "TICKET_SUPPORT_LIST_FAIL",
      payload: message,
    });
  }
};

export const updateManagerTicket = (ticket) => async (dispatch, getState) => {
  try {
    dispatch({ type: "TICKET_MANAGER_UPDATE_REQUEST" });

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
      `/api/tickets/${ticket._id}/manager`,
      ticket,
      config
    );

    dispatch({ type: "TICKET_MANAGER_UPDATE_SUCCESS", payload: data });
    dispatch({ type: "TICKET_DETAILS_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: "TICKET_MANAGER_UPDATE_FAIL",
      payload: message,
    });
  }
};

export const updateSupportTicket = (ticket) => async (dispatch, getState) => {
  try {
    dispatch({ type: "TICKET_SUPPORT_UPDATE_REQUEST" });

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
      `/api/tickets/${ticket._id}/support`,
      ticket,
      config
    );

    dispatch({ type: "TICKET_SUPPORT_UPDATE_SUCCESS", payload: data });
    dispatch({ type: "TICKET_DETAILS_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: "TICKET_SUPPORT_UPDATE_FAIL",
      payload: message,
    });
  }
};

export const deleteTicket = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "TICKET_DELETE_REQUEST" });

    const {
      customerLogin: { customerInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${customerInfo.token}`,
      },
    };
    await axios.delete(`/api/tickets/${id}`, config);
    dispatch({ type: "TICKET_DELETE_SUCCESS" });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: "TICKET_DELETE_FAIL",
      payload: message,
    });
  }
};

export const openTicket = (ticket) => async (dispatch, getState) => {
  try {
    dispatch({ type: "TICKET_OPEN_REQUEST" });

    const {
      customerLogin: { customerInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${customerInfo.token}`,
      },
    };
    const { data } = await axios.put(`/api/tickets/${ticket._id}`, {}, config);
    dispatch({ type: "TICKET_OPEN_SUCCESS", payload: data });
    dispatch({ type: "TICKET_DETAILS_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: "TICKET_OPEN_FAIL",
      payload: message,
    });
  }
};
