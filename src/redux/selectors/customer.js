import { createSelector } from "reselect";

const customersSelector = state => state.customers?.customers;

export const selectCustomers = createSelector(
  [customersSelector],
  customers => customers
);

const errorSelector = state => state.customers.err;

export const selectError = createSelector([errorSelector], err => err);
