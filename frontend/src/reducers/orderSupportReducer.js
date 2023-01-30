export const orderSupportListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case "ORDER_SUPPORT_LIST_REQUEST":
      return { loading: true };
    case "ORDER_SUPPORT_LIST_SUCCESS":
      return { loading: false, orders: action.payload };
    case "ORDER_SUPPORT_LIST_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case "ORDER_DELIVER_REQUEST":
      return { loading: true };
    case "ORDER_DELIVER_SUCCESS":
      return { loading: false, success: true };
    case "ORDER_DELIVER_FAIL":
      return { loading: false, error: action.payload };
    case "ORDER_DELIVER_RESET":
      return {};
    default:
      return state;
  }
};

export const orderDispatchReducer = (state = {}, action) => {
  switch (action.type) {
    case "ORDER_DISPATCH_REQUEST":
      return { loading: true };
    case "ORDER_DISPATCH_SUCCESS":
      return { loading: false, success: true };
    case "ORDER_DISPATCH_FAIL":
      return { loading: false, error: action.payload };
    case "ORDER_DISPATCH_RESET":
      return {};
    default:
      return state;
  }
};

export const orderReceiveReducer = (state = {}, action) => {
  switch (action.type) {
    case "ORDER_RECEIVE_REQUEST":
      return { loading: true };
    case "ORDER_RECEIVE_SUCCESS":
      return { loading: false, success: true };
    case "ORDER_RECEIVE_FAIL":
      return { loading: false, error: action.payload };
    case "ORDER_RECEIVE_RESET":
      return {};
    default:
      return state;
  }
};
