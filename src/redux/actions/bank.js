import { bankTypes } from "./const";
import { getBank } from "../../service/service";

export const setBanks = (data) => ({
    type: bankTypes.SET_BANKS,
    data: data,
  });

  export  const getBanksAction = () => {
    return (dispatch) => {
      getBank()
        .then(async(data) => {
            await dispatch(setBanks(data))
        })
        .catch((err) => {
          console.log(err);
        });
    };
  };
