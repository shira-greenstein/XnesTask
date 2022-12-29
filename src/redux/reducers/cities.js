import { citiesTypes } from "../actions/const";

const initialState = {
  cities: []
};

const cities = (state = initialState.cities, action) => {
  switch (action.type) {
    case citiesTypes.SET_CITIES:
      return {
        cities: action.data
      };

    default:
      return state;
  }
};

export default cities;
