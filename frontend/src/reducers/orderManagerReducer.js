export const orderManagerListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case "ORDER_MANAGER_LIST_REQUEST":
      return { loading: true };
    case "ORDER_MANAGER_LIST_SUCCESS":
      return { loading: false, orders: action.payload };
    case "ORDER_MANAGER_LIST_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderSendReducer = (state = {}, action) => {
  switch (action.type) {
    case "ORDER_SEND_REQUEST":
      return { loading: true };
    case "ORDER_SEND_SUCCESS":
      return { loading: false, success: true };
    case "ORDER_SEND_FAIL":
      return { loading: false, error: action.payload };
    case "ORDER_SEND_RESET":
      return {};
    default:
      return state;
  }
};

export const orderCoverReducer = (state = {}, action) => {
  switch (action.type) {
    case "ORDER_COVER_REQUEST":
      return { loading: true };
    case "ORDER_COVER_SUCCESS":
      return { loading: false, success: true };
    case "ORDER_COVER_FAIL":
      return { loading: false, error: action.payload };
    case "ORDER_COVER_RESET":
      return {};
    default:
      return state;
  }
};

export const orderVoucherReducer = (state = {}, action) => {
  switch (action.type) {
    case "ORDER_VOUCHER_REQUEST":
      return { loading: true };
    case "ORDER_VOUCHER_SUCCESS":
      return { loading: false, success: true };
    case "ORDER_VOUCHER_FAIL":
      return { loading: false, error: action.payload };
    case "ORDER_VOUCHER_RESET":
      return {};
    default:
      return state;
  }
};

export const orderRefundReducer = (state = {}, action) => {
  switch (action.type) {
    case "ORDER_REFUND_REQUEST":
      return { loading: true };
    case "ORDER_REFUND_SUCCESS":
      return { loading: false, success: true };
    case "ORDER_REFUND_FAIL":
      return { loading: false, error: action.payload };
    case "ORDER_REFUND_RESET":
      return {};
    default:
      return state;
  }
};

export const orderCloseReturnReducer = (state = {}, action) => {
  switch (action.type) {
    case "ORDER_CLOSE_RETURN_REQUEST":
      return { loading: true };
    case "ORDER_CLOSE_RETURN_SUCCESS":
      return { loading: false, success: true };
    case "ORDER_CLOSE_RETURN_FAIL":
      return { loading: false, error: action.payload };
    case "ORDER_CLOSE_RETURN_RESET":
      return {};
    default:
      return state;
  }
};
