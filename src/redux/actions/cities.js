import {
    getCitiesService
  } from "../../service/service";
  import {
    citiesTypes
  } from "./const";
  
  export const setCities = (cities) => ({
    type: citiesTypes.SET_CITIES,
    data: cities,
  });
  
  export const getCities = () => {
      return (dispatch) => {
        getCitiesService()
          .then(data => {
            dispatch(setCities(data));
          })
          .catch((err) => {
            console.log(err);
          });
      };
  };
  