//React
import React from "react";

//Style
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useStyles } from "./Customers.style";

//Const
import { fields } from "../registration/consts";

//Redux
import { useSelector } from "react-redux";
import { selectCustomers } from "../../redux/selectors/customer";
import { selectBanks, selectBankBranches } from "../../redux/selectors/banks";
import { selectCities } from "../../redux/selectors/cities";


function Customerss() {
  const classes = useStyles();
  const customers = useSelector(selectCustomers);
  const bankBranches = useSelector(selectBankBranches);
  const banks = useSelector(selectBanks);
  const cities = useSelector(selectCities);
  return (
    <>
      <TableContainer component={Paper} className={classes.root}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {Object.keys(fields).map(field => (
                <TableCell key={field}>{fields[field]}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {customers?.map((row, rowIndex) => (
              <TableRow
                key={row.tz + rowIndex}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {Object.keys(fields).map((field, index) => (
                  <TableCell key={index + field}>
                    {field === "bank"
                      ? banks.find(x => x.Code === row[field])?.Description
                      : field === "bankBranch"
                      ? bankBranches.find(
                          x =>
                            x.BankCode === row.bank &&
                            x.BranchNumber === row[field]
                        )?.BranchName
                      : field === "birthDate"
                      ? row[field]?.toString()
                      : field === "city"
                      ? cities.find(x => x.id === row.city).name
                      : row[field]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      ); }
    </>
  );
}

export default Customerss;
