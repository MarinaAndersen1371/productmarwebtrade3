export const ticketCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case "TICKET_CREATE_REQUEST":
      return { loading: true };
    case "TICKET_CREATE_SUCCESS":
      return { loading: false, success: true, ticket: action.payload };
    case "TICKET_CREATE_FAIL":
      return { loading: false, error: action.payload };
    case "TICKET_CREATE_RESET":
      return {};
    default:
      return state;
  }
};

export const ticketDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case "TICKET_DETAILS_REQUEST":
      return { ...state, loading: true };
    case "TICKET_DETAILS_SUCCESS":
      return { loading: false, ticket: action.payload };
    case "TICKET_DETAILS_FAIL":
      return { loading: false, error: action.payload };
    case "TICKET_DETAILS_RESET":
      return {};
    default:
      return state;
  }
};

export const ticketMyListReducer = (state = { tickets: [] }, action) => {
  switch (action.type) {
    case "TICKET_MY_LIST_REQUEST":
      return { loading: true };
    case "TICKET_MY_LIST_SUCCESS":
      return { loading: false, tickets: action.payload };
    case "TICKET_MY_LIST_FAIL":
      return { loading: false, error: action.payload };
    case "TICKET_MY_LIST_RESET":
      return { tickets: [] };
    default:
      return state;
  }
};

export const ticketAdminListReducer = (state = { tickets: [] }, action) => {
  switch (action.type) {
    case "TICKET_ADMIN_LIST_REQUEST":
      return { loading: true };
    case "TICKET_ADMIN_LIST_SUCCESS":
      return { loading: false, tickets: action.payload };
    case "TICKET_ADMIN_LIST_FAIL":
      return { loading: false, error: action.payload };
    case "TICKET_ADMIN_LIST_RESET":
      return { tickets: [] };
    default:
      return state;
  }
};

export const ticketManagerListReducer = (state = { tickets: [] }, action) => {
  switch (action.type) {
    case "TICKET_MANAGER_LIST_REQUEST":
      return { loading: true };
    case "TICKET_MANAGER_LIST_SUCCESS":
      return { loading: false, tickets: action.payload };
    case "TICKET_MANAGER_LIST_FAIL":
      return { loading: false, error: action.payload };
    case "TICKET_MANAGER_LIST_RESET":
      return { tickets: [] };
    default:
      return state;
  }
};

export const ticketSupportListReducer = (state = { tickets: [] }, action) => {
  switch (action.type) {
    case "TICKET_SUPPORT_LIST_REQUEST":
      return { loading: true };
    case "TICKET_SUPPORT_LIST_SUCCESS":
      return { loading: false, tickets: action.payload };
    case "TICKET_SUPPORT_LIST_FAIL":
      return { loading: false, error: action.payload };
    case "TICKET_SUPPORT_LIST_RESET":
      return { tickets: [] };
    default:
      return state;
  }
};

export const ticketDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case "TICKET_DELETE_REQUEST":
      return { loading: true };
    case "TICKET_DELETE_SUCCESS":
      return { loading: false, success: true };
    case "TICKET_DELETE_FAIL":
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const ticketOpenReducer = (state = {}, action) => {
  switch (action.type) {
    case "TICKET_OPEN_REQUEST":
      return { loading: true };
    case "TICKET_OPEN_SUCCESS":
      return { loading: false, success: true };
    case "TICKET_OPEN_FAIL":
      return { loading: false, error: action.payload };
    case "TICKET_OPEN_RESET":
      return {};
    default:
      return state;
  }
};

export const ticketManagerUpdateReducer = (state = { ticket: {} }, action) => {
  switch (action.type) {
    case "TICKET_MANAGER_UPDATE_REQUEST":
      return { loading: true };
    case "TICKET_MANAGER_UPDATE_SUCCESS":
      return { loading: false, success: true, ticket: action.payload };
    case "TICKET_MANAGER_UPDATE_FAIL":
      return { loading: false, error: action.payload };
    case "TICKET_MANAGER_UPDATE_RESET":
      return { ticket: {} };
    default:
      return state;
  }
};

export const ticketSupportUpdateReducer = (state = { ticket: {} }, action) => {
  switch (action.type) {
    case "TICKET_SUPPORT_UPDATE_REQUEST":
      return { loading: true };
    case "TICKET_SUPPORT_UPDATE_SUCCESS":
      return { loading: false, success: true, ticket: action.payload };
    case "TICKET_SUPPORT_UPDATE_FAIL":
      return { loading: false, error: action.payload };
    case "TICKET_SUPPORT_UPDATE_RESET":
      return { ticket: {} };
    default:
      return state;
  }
};
