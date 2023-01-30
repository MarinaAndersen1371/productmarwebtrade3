import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { cartReducer } from "./reducers/cartReducers";
import {
  customerLoginReducer,
  customerRegisterReducer,
  customerDetailsReducer,
  customerUpdateTestReducer,
  customerUpdateProfileReducer,
  customerUpdateReducer,
  customerAdminListReducer,
  customerDeleteReducer,
} from "./reducers/customerReducers";
import {
  customerManagerListReducer,
  customerPrimeReducer,
  customerFranchiseReducer,
  customerTestPaidReducer,
  customerTestResultReducer,
  customerCouponReducer,
  customerTestScoreReducer,
} from "./reducers/customerManagerReducer";

import {
  orderCreateReducer,
  orderDetailsReducer,
  orderToPaidReducer,
  orderAdminListReducer,
  orderMyListReducer,
  orderCustomerCouponReducer,
  orderConfirmReturnReducer,
} from "./reducers/orderReducers";
import {
  orderManagerListReducer,
  orderVoucherReducer,
  orderCoverReducer,
  orderSendReducer,
  orderRefundReducer,
  orderCloseReturnReducer,
} from "./reducers/orderManagerReducer";
import {
  orderSupportListReducer,
  orderDeliverReducer,
  orderDispatchReducer,
  orderReceiveReducer,
} from "./reducers/orderSupportReducer";

import {
  productListReducer,
  productManagerListReducer,
  productFranchiseListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productManagerUpdateReducer,
  productReviewReducer,
  productTopReducer,
} from "./reducers/productReducers";

import {
  ticketCreateReducer,
  ticketDetailsReducer,
  ticketMyListReducer,
  ticketAdminListReducer,
  ticketManagerListReducer,
  ticketDeleteReducer,
  ticketManagerUpdateReducer,
  ticketOpenReducer,
  ticketSupportUpdateReducer,
  ticketSupportListReducer,
} from "./reducers/ticketReducers";

const reducer = combineReducers({
  cart: cartReducer,

  customerLogin: customerLoginReducer,
  customerRegister: customerRegisterReducer,
  customerDetails: customerDetailsReducer,
  customerUpdateTest: customerUpdateTestReducer,
  customerUpdateProfile: customerUpdateProfileReducer,
  customerUpdate: customerUpdateReducer,
  customerAdminList: customerAdminListReducer,
  customerManagerList: customerManagerListReducer,
  customerPrime: customerPrimeReducer,
  customerFranchise: customerFranchiseReducer,
  customerTestPaid: customerTestPaidReducer,
  customerTestResult: customerTestResultReducer,
  customerTestScore: customerTestScoreReducer,
  customerCoupon: customerCouponReducer,
  customerDelete: customerDeleteReducer,

  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderToPaid: orderToPaidReducer,
  orderMyList: orderMyListReducer,
  orderAdminList: orderAdminListReducer,
  orderManagerList: orderManagerListReducer,
  orderVoucher: orderVoucherReducer,
  orderCover: orderCoverReducer,
  orderSend: orderSendReducer,
  orderSupportList: orderSupportListReducer,
  orderDeliver: orderDeliverReducer,
  orderDispatch: orderDispatchReducer,
  orderReceive: orderReceiveReducer,
  orderRefund: orderRefundReducer,
  orderCustomerCoupon: orderCustomerCouponReducer,
  orderConfirmReturn: orderConfirmReturnReducer,
  orderCloseReturn: orderCloseReturnReducer,

  productList: productListReducer,
  productManagerList: productManagerListReducer,
  productFranchiseList: productFranchiseListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productManagerUpdate: productManagerUpdateReducer,
  productReview: productReviewReducer,
  productTop: productTopReducer,

  ticketCreate: ticketCreateReducer,
  ticketDetails: ticketDetailsReducer,
  ticketMyList: ticketMyListReducer,
  ticketAdminList: ticketAdminListReducer,
  ticketManagerList: ticketManagerListReducer,
  ticketDelete: ticketDeleteReducer,
  ticketManagerUpdate: ticketManagerUpdateReducer,
  ticketOpen: ticketOpenReducer,
  ticketSupportUpdate: ticketSupportUpdateReducer,
  ticketSupportList: ticketSupportListReducer,
});

const initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],

    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress"))
      : {
          name: "",
          address: "",
          city: "",
          postalCode: "",
          country: "",
          fast: "",
        },

    invoiceAddress: localStorage.getItem("invoiceAddress")
      ? JSON.parse(localStorage.getItem("invoiceAddress"))
      : { address: "", city: "", postalCode: "", country: "" },

    payment: localStorage.getItem("payment")
      ? JSON.parse(localStorage.getItem("payment"))
      : { method: "", account: "" },

    subscription: { prime: "No", franchise: "No" },
  },

  customerLogin: {
    customerInfo: localStorage.getItem("customerInfo")
      ? JSON.parse(localStorage.getItem("customerInfo"))
      : null,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
