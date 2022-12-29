import { createSelector } from "reselect";

const banksSelector = state => {
  return state.banks.banks;
};

export const selectBanks = createSelector([banksSelector], banks => banks);

const bankBranchesSelector = state => {
  return state.banks.bankBranches;
};

export const selectBankBranches = createSelector(
  [bankBranchesSelector],
  bankBranches => bankBranches
);
