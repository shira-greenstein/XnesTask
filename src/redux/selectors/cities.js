import { createSelector } from "reselect";

const citiesSelector = state => state.cities?.cities;

export const selectCities = createSelector([citiesSelector], cities => cities);
