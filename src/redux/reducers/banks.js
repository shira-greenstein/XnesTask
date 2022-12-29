import {
    bankTypes
} from "../actions/const";

const initialState = {
        banks:[],
        bankBranches: []
};

const banks = (state = initialState, action) => {
    switch (action.type) {
        case bankTypes.SET_BANKS:
            return {
                banks: action.data.Banks, bankBranches:action.data.BankBranches,
            };
        default:
            return state;
    }
};

export default banks;