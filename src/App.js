//React
import React, { useEffect } from "react";

//Redux
import { useDispatch } from "react-redux";
import { getBanksAction } from "./redux/actions/bank";
import { getCities } from "./redux/actions/cities";

//Route
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";

//Component
import Registration from "./component/registration/Registration";
import Customerss from "./component/customers/Customerss";

//Style
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

const theme = createTheme({
  direction: "rtl" // Both here and <body dir="rtl">
});

// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin]
});

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dispatchData = () => {
    dispatch(getCities());
    dispatch(getBanksAction());
  };

  useEffect(() => dispatchData(), []);

  useEffect(() => {
    navigate("/registration");
  }, []);

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <div dir="rtl">
          <Routes>
            <Route path="/registration" element={<Registration />} />
            <Route path="/customers" element={<Customerss />} />
          </Routes>
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default App;
