import makeStyles from "@mui/styles/makeStyles";

export const useStyles = makeStyles({
  root: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "auto",
    marginTop: "14px",
    minWidth: "auto !important",
  },
  textField: {
    width: "80% !important",
    margin: "13px !important",
    direction: "rtl",
  },
  wrapButton: {
    width: "80%",
    display: "flex",
    justifyContent: "space-between",
    margin: "14px",
  },
  save: {
    width: "40% !important",
    margin: "25px"
  },
  back: {
    width: "36%",
  },
  wrapText:{
    display:"flex",
    flexDirection:"row",
    "@media (max-width: 600px)": {
      flexDirection: "column"
    }
  },
  wrapColumn:{
    width: "50%",
    textAlign: "center",
    "@media (max-width: 600px)": {
      width: "100%"
    }
},
form:{
  width:"80%",
  textAlign: "center"
},
title:{
  margin: "35px",
  fontSize: "27px"
}
});
