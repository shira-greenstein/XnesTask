import { customersTypes } from "../actions/const";

const initialState = {
  customers: [],
  err:{}
};

const customers = (state = initialState, action) => {
  switch (action.type) {
    case customersTypes.SET_CUSTOMERS:
      return {
        customers: action.data,
        err:null
      };
      case customersTypes.CATCH_ERROR:
      return {
        err: action.data
      };
    default:
      return state;
  }
};

export default customers;
