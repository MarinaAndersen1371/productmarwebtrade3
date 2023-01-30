export const customerManagerListReducer = (state = {}, action) => {
  switch (action.type) {
    case "CUSTOMER_MANAGER_LIST_REQUEST":
      return { loading: true };
    case "CUSTOMER_MANAGER_LIST_SUCCESS":
      return { loading: false, customers: action.payload };
    case "CUSTOMER_MANAGER_LIST_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const customerFranchiseReducer = (state = {}, action) => {
  switch (action.type) {
    case "CUSTOMER_FRANCHISE_REQUEST":
      return { loading: true };
    case "CUSTOMER_FRANCHISE_SUCCESS":
      return { loading: false, success: true };
    case "CUSTOMER_FRANCHISE_FAIL":
      return { loading: false, error: action.payload };
    case "CUSTOMER_FRANCHISE_RESET":
      return {};
    default:
      return state;
  }
};

export const customerPrimeReducer = (state = {}, action) => {
  switch (action.type) {
    case "CUSTOMER_PRIME_REQUEST":
      return { loading: true };
    case "CUSTOMER_PRIME_SUCCESS":
      return { loading: false, success: true };
    case "CUSTOMER_PRIME_FAIL":
      return { loading: false, error: action.payload };
    case "CUSTOMER_PRIME_RESET":
      return {};
    default:
      return state;
  }
};

export const customerTestPaidReducer = (state = {}, action) => {
  switch (action.type) {
    case "CUSTOMER_TEST_PAID_REQUEST":
      return { loading: true };
    case "CUSTOMER_TEST_PAID_SUCCESS":
      return { loading: false, success: true };
    case "CUSTOMER_TEST_PAID_FAIL":
      return { loading: false, error: action.payload };
    case "CUSTOMER_TEST_PAID_RESET":
      return {};
    default:
      return state;
  }
};

export const customerTestResultReducer = (state = { customer: {} }, action) => {
  switch (action.type) {
    case "CUSTOMER_TEST_RESULT_REQUEST":
      return { loading: true };
    case "CUSTOMER_TEST_RESULT_SUCCESS":
      return { loading: false, success: true };
    case "CUSTOMER_TEST_RESULT_FAIL":
      return { loading: false, error: action.payload };
    case "CUSTOMER_TEST_RESULT_RESET":
      return { customer: {} };
    default:
      return state;
  }
};

export const customerTestScoreReducer = (state = { customer: {} }, action) => {
  switch (action.type) {
    case "CUSTOMER_TEST_SCORE_REQUEST":
      return { loading: true };
    case "CUSTOMER_TEST_SCORE_SUCCESS":
      return { loading: false, success: true };
    case "CUSTOMER_TEST_SCORE_FAIL":
      return { loading: false, error: action.payload };
    case "CUSTOMER_TEST_SCORE_RESET":
      return { customer: {} };
    default:
      return state;
  }
};

export const customerCouponReducer = (state = { customer: {} }, action) => {
  switch (action.type) {
    case "CUSTOMER_COUPON_REQUEST":
      return { loading: true };
    case "CUSTOMER_COUPON_SUCCESS":
      return { loading: false, success: true };
    case "CUSTOMER_COUPON_FAIL":
      return { loading: false, error: action.payload };
    case "CUSTOMER_COUPON_RESET":
      return { customer: {} };
    default:
      return state;
  }
};
