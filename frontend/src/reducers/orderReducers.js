export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case "ORDER_CREATE_REQUEST":
      return { loading: true };
    case "ORDER_CREATE_SUCCESS":
      return { loading: false, success: true, order: action.payload };
    case "ORDER_CREATE_FAIL":
      return { loading: false, error: action.payload };
    case "ORDER_CREATE_RESET":
      return {};
    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = {
    loading: true,
    orderItems: [],
    shippingAddress: {},
    invoiceAddress: {},
    payment: {},
  },
  action
) => {
  switch (action.type) {
    case "ORDER_DETAILS_REQUEST":
      return { ...state, loading: true };
    case "ORDER_DETAILS_SUCCESS":
      return { loading: false, order: action.payload };
    case "ORDER_DETAILS_FAIL":
      return { loading: false, error: action.payload };
    case "ORDER_DETAILS_RESET":
      return {};
    default:
      return state;
  }
};

export const orderToPaidReducer = (state = {}, action) => {
  switch (action.type) {
    case "ORDER_PAY_REQUEST":
      return { loading: true };
    case "ORDER_PAY_SUCCESS":
      return { loading: false, success: true };
    case "ORDER_PAY_FAIL":
      return { loading: false, error: action.payload };
    case "ORDER_PAY_RESET":
      return {};
    default:
      return state;
  }
};

export const orderCustomerCouponReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case "ORDER_CUSTOMER_COUPON_REQUEST":
      return { loading: true };
    case "ORDER_CUSTOMER_COUPON_SUCCESS":
      return { loading: false, success: true };
    case "ORDER_CUSTOMER_COUPON_FAIL":
      return { loading: false, error: action.payload };
    case "ORDER_CUSTOMER_COUPON_RESET":
      return { order: {} };
    default:
      return state;
  }
};

export const orderMyListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case "ORDER_MY_LIST_REQUEST":
      return { loading: true };
    case "ORDER_MY_LIST_SUCCESS":
      return { loading: false, orders: action.payload };
    case "ORDER_MY_LIST_FAIL":
      return { loading: false, error: action.payload };
    case "ORDER_MY_LIST_RESET":
      return { orders: [] };
    default:
      return state;
  }
};

export const orderAdminListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case "ORDER_ADMIN_LIST_REQUEST":
      return { loading: true };
    case "ORDER_ADMIN_LIST_SUCCESS":
      return { loading: false, orders: action.payload };
    case "ORDER_ADMIN_LIST_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderConfirmReturnReducer = (state = {}, action) => {
  switch (action.type) {
    case "ORDER_CONFIRM_RETURN_REQUEST":
      return { loading: true };
    case "ORDER_CONFIRM_RETURN_SUCCESS":
      return { loading: false, success: true };
    case "ORDER_CONFIRM_RETURN_FAIL":
      return { loading: false, error: action.payload };
    case "ORDER_CONFIRM_RETURN_RESET":
      return {};
    default:
      return state;
  }
};
