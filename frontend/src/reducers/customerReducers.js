export const customerLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case "CUSTOMER_LOGIN_REQUEST":
      return { loading: true };
    case "CUSTOMER_LOGIN_SUCCESS":
      return { loading: false, customerInfo: action.payload };
    case "CUSTOMER_LOGIN_FAIL":
      return { loading: false, error: action.payload };
    case "CUSTOMER_LOGOUT":
      return {};
    default:
      return state;
  }
};

export const customerRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case "CUSTOMER_REGISTER_REQUEST":
      return { loading: true };
    case "CUSTOMER_REGISTER_SUCCESS":
      return { loading: false, customerInfo: action.payload };
    case "CUSTOMER_REGISTER_FAIL":
      return { loading: false, error: action.payload };
    case "CUSTOMER_LOGOUT":
      return {};
    default:
      return state;
  }
};

export const customerDetailsReducer = (state = { customer: {} }, action) => {
  switch (action.type) {
    case "CUSTOMER_DETAILS_REQUEST":
      return { ...state, loading: true };
    case "CUSTOMER_DETAILS_SUCCESS":
      return { loading: false, customer: action.payload };
    case "CUSTOMER_DETAILS_FAIL":
      return { loading: false, error: action.payload };
    case "CUSTOMER_DETAILS_RESET":
      return { customer: {} };
    default:
      return state;
  }
};

export const customerDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case "CUSTOMER_DELETE_REQUEST":
      return { loading: true };
    case "CUSTOMER_DELETE_SUCCESS":
      return { loading: false, success: true };
    case "CUSTOMER_DELETE_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const customerUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case "CUSTOMER_UPDATE_PROFILE_REQUEST":
      return { loading: true };
    case "CUSTOMER_UPDATE_PROFILE_SUCCESS":
      return { loading: false, success: true, customerInfo: action.payload };
    case "CUSTOMER_UPDATE_PROFILE_FAIL":
      return { loading: false, error: action.payload };
    case "CUSTOMER_UPDATE_PROFILE_RESET":
      return {};
    default:
      return state;
  }
};

export const customerUpdateReducer = (state = { customer: {} }, action) => {
  switch (action.type) {
    case "CUSTOMER_UPDATE_REQUEST":
      return { loading: true };
    case "CUSTOMER_UPDATE_SUCCESS":
      return { loading: false, success: true };
    case "CUSTOMER_UPDATE_FAIL":
      return { loading: false, error: action.payload };
    case "CUSTOMER_UPDATE_RESET":
      return { customer: {} };
    default:
      return state;
  }
};

export const customerAdminListReducer = (state = {}, action) => {
  switch (action.type) {
    case "CUSTOMER_ADMIN_LIST_REQUEST":
      return { loading: true };
    case "CUSTOMER_ADMIN_LIST_SUCCESS":
      return { loading: false, customers: action.payload };
    case "CUSTOMER_ADMIN_LIST_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const customerUpdateTestReducer = (state = { customer: {} }, action) => {
  switch (action.type) {
    case "CUSTOMER_UPDATE_TEST_REQUEST":
      return { loading: true };
    case "CUSTOMER_UPDATE_TEST_SUCCESS":
      return { loading: false, success: true };
    case "CUSTOMER_UPDATE_TEST_FAIL":
      return { loading: false, error: action.payload };
    case "CUSTOMER_UPDATE_TEST_RESET":
      return { customer: {} };
    default:
      return state;
  }
};
