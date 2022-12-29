import { getCustomers, postCustomer } from "../../service/service";
import { customersTypes } from "./const";

export const setCustomers = customers => ({
  type: customersTypes.SET_CUSTOMERS,
  data: customers
});

export const catchError = err => ({
  type: customersTypes.CATCH_ERROR,
  data: err
});

export const getCustomerList = () => {
  return dispatch => {
    getCustomers()
      .then(data => {
        dispatch(setCustomers(data));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const postCustomerToCustomers = customer => {
  return dispatch => {
    postCustomer(customer)
      .then(data => {
        if (data.status !== 200) {
          dispatch(catchError(data));
          return;
        }
        getCustomers().then(data => dispatch(setCustomers(data)));
      })
      .catch(err => {
        console.log(err);
        dispatch(catchError(err));
      });
  };
};
