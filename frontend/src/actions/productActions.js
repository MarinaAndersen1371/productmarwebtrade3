import axios from "axios";
import { logout } from "./customerActions";

export const listProducts =
  (keyword = "", pageNumber = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: "PRODUCT_LIST_REQUEST" });
      const { data } = await axios.get(
        `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
      );

      dispatch({ type: "PRODUCT_LIST_SUCCESS", payload: data });
    } catch (error) {
      dispatch({
        type: "PRODUCT_LIST_FAIL",
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listManagerProducts =
  (keyword = "", pageNumber = "") =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: "PRODUCT_MANAGER_LIST_REQUEST" });

      const {
        customerLogin: { customerInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${customerInfo.token}`,
        },
      };
      const { data } = await axios.get(
        `/api/products/manager?keyword=${keyword}&pageNumber=${pageNumber}`,
        config
      );
      dispatch({ type: "PRODUCT_MANAGER_LIST_SUCCESS", payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: "PRODUCT_MANAGER_LIST_FAIL",
        payload: message,
      });
    }
  };

export const listFranchiseProducts =
  (keyword = "", pageNumber = "") =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: "PRODUCT_FRANCHISE_LIST_REQUEST" });

      const {
        customerLogin: { customerInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${customerInfo.token}`,
        },
      };
      const { data } = await axios.get(
        `/api/products/franchise?keyword=${keyword}&pageNumber=${pageNumber}`,
        config
      );
      dispatch({ type: "PRODUCT_FRANCHISE_LIST_SUCCESS", payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: "PRODUCT_FRANCHISE_LIST_FAIL",
        payload: message,
      });
    }
  };

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_DETAILS_REQUEST" });
    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({ type: "PRODUCT_DETAILS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "PRODUCT_DETAILS_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: "PRODUCT_DELETE_REQUEST" });

    const {
      customerLogin: { customerInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${customerInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/products/${id}/cancel`, {}, config);
    dispatch({ type: "PRODUCT_DELETE_SUCCESS", payload: data });
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
      type: "PRODUCT_DELETE_FAIL",
      payload: message,
    });
  }
};

export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch({ type: "PRODUCT_CREATE_REQUEST" });

    const {
      customerLogin: { customerInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${customerInfo.token}`,
      },
    };
    const { data } = await axios.post(`/api/products`, {}, config);
    dispatch({ type: "PRODUCT_CREATE_SUCCESS", payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: "PRODUCT_CREATE_FAIL",
      payload: message,
    });
  }
};

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: "PRODUCT_UPDATE_REQUEST" });

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
      `/api/products/${product._id}`,
      product,
      config
    );
    dispatch({ type: "PRODUCT_UPDATE_SUCCESS", payload: data });
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
      type: "PRODUCT_UPDATE_FAIL",
      payload: message,
    });
  }
};

export const updateManagerProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch({ type: "PRODUCT_MANAGER_UPDATE_REQUEST" });

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
      `/api/products/${product._id}/manager`,
      product,
      config
    );
    dispatch({ type: "PRODUCT_MANAGER_UPDATE_SUCCESS", payload: data });
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
      type: "PRODUCT_MANAGER_UPDATE_FAIL",
      payload: message,
    });
  }
};

export const createProductReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch({ type: "PRODUCT_REVIEW_REQUEST" });

      const {
        customerLogin: { customerInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${customerInfo.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/products/${productId}/reviews`,
        review,
        config
      );
      dispatch({ type: "PRODUCT_REVIEW_SUCCESS", payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: "PRODUCT_REVIEW_FAIL",
        payload: message,
      });
    }
  };

export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch({ type: "PRODUCT_TOP_REQUEST" });
    const { data } = await axios.get(`/api/products/top`);

    dispatch({ type: "PRODUCT_TOP_SUCCESS", payload: data });
  } catch (error) {
    dispatch({
      type: "PRODUCT_TOP_FAIL",
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
