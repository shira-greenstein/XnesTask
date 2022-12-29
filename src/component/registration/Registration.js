//React
import React, { useState, useEffect, useMemo } from "react";

//Redux
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { postCustomerToCustomers } from "../../redux/actions/customers";
import { selectCities } from "../../redux/selectors/cities";
import { selectBanks, selectBankBranches } from "../../redux/selectors/banks";
import { selectError } from "../../redux/selectors/customer";
import { catchError } from "../../redux/actions/customers";

//Style
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { useStyles } from "./Registration.style";
import Button from "@mui/material/Button";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

//Route
import { useNavigate } from "react-router-dom";

function Registration() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bankBranches = useSelector(selectBankBranches);
  const banks = useSelector(selectBanks);
  const cities = useSelector(selectCities);
  const err = useSelector(selectError);

  const [register, setRegister] = useState({
    Id: 1,
    Tz: "",
    FullName: "",
    FullNameEnglish: "",
    BirthDate: new Date(),
    City: null,
    Bank: "",
    BankBranch: "",
    AccountNumber: ""
  });

  const bankBranchesForBank = useMemo(() => {
    return bankBranches.filter(x => x.BankCode === Number(register.Bank));
  }, [register.Bank]);

  const hebrew = /^[\'\ \u0590-\u05FF]*$/;
  const english = /^[\'\ A-Za-z]*$/;
  const digits = /^\d+$/;

  const isHebrewMatch = str => {
    if (hebrew.test(str) || !str) return true;
    return false;
  };

  const isEnglishMatch = str => {
    if (english.test(str) || !str) return true;
    return false;
  };

  const isDigitsMatch = str => {
    if (digits.test(str) || !str) return true;
    return false;
  };

  useEffect(() => {
    dispatch(catchError({}));
  }, []);

  useEffect(() => {
    ValidatorForm.addValidationRule("isHebrewMatch", str => isHebrewMatch(str));
  }, [register.FullName]);

  useEffect(() => {
    ValidatorForm.addValidationRule("isEnglishMatch", str =>
      isEnglishMatch(str)
    );
  }, [register.FullNameEnglish]);

  useEffect(() => {
    ValidatorForm.addValidationRule("isDigitsMatch", str => isDigitsMatch(str));
  }, [register.Tz, register.AccountNumber]);

  const handleChange = (field, value) => {
    setRegister({ ...register, [field]: value });
  };

  const handleSave = () => {
    dispatch(postCustomerToCustomers(register));
  };

  const handleClick = () => {
    navigate("/customers");
  };

  return (
    <div>
      <Card sx={{ minWidth: 275 }} className={classes.root}>
        <span className={classes.title}>טופס רישום:</span>
        <ValidatorForm onSubmit={handleSave} className={classes.form}>
          <div className={classes.wrapText}>
            <div className={classes.wrapColumn}>
              <TextValidator
                key={"FullName"}
                className={classes.textField}
                margin="dense"
                label={"שם מלא"}
                onChange={e => handleChange("FullName", e.target.value)}
                name="FullName"
                value={register.FullName && register.FullName}
                validators={["required", "maxStringLength:20", "isHebrewMatch"]}
                errorMessages={["שדה חובה", "עד 20 תווים", "בעברית בלבד"]}
              />

              <TextValidator
                key={"FullNameEnglish"}
                className={classes.textField}
                margin="dense"
                label={"שם מלא באנגלית"}
                onChange={e => handleChange("FullNameEnglish", e.target.value)}
                name="FullNameEnglish"
                value={register.FullNameEnglish && register.FullNameEnglish}
                validators={[
                  "required",
                  "maxStringLength:15",
                  "isEnglishMatch"
                ]}
                errorMessages={["שדה חובה", "עד 15 תווים", "באנגלית בלבד"]}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                
                  label="תאריך לידה"
                  value={register.BirthDate}
                  onChange={e => handleChange("BirthDate", e)}
                  renderInput={params => <TextField {...params} />}
                  className={classes.textField}
                />
              </LocalizationProvider>
              <TextValidator
                key={"Tz"}
                className={classes.textField}
                margin="dense"
                label={"תעודת זהות"}
                onChange={e => handleChange("Tz", e.target.value)}
                name="Tz"
                value={register.Tz && register.Tz}
                validators={[
                  "required",
                  "maxStringLength:9",
                  "minStringLength:9",
                  "isDigitsMatch"
                ]}
                errorMessages={[
                  "שדה חובה",
                  "9 ספרות בלבד",
                  "9 ספרות בלבד",
                  "ספרות בלבד"
                ]}
              />
            </div>
            <div className={classes.wrapColumn}>
              <FormControl fullWidth className={classes.textField}>
                <InputLabel id="labelBank">עיר</InputLabel>
                <Select
                  id="city"
                  required
                  value={register && register.City ? register.City : ""}
                  label="city"
                  onChange={e => handleChange("City", e.target.value)}
                >
                  {cities &&
                    cities.length > 0 &&
                    cities.map((city, index) => {
                      return (
                        <MenuItem key={city.id} value={city.id}>
                          {city.name}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
              <FormControl fullWidth className={classes.textField}>
                <InputLabel id="labelBank">בנק</InputLabel>
                <Select
                  id="bank"
                  required
                  value={register && register.Bank ? register.Bank : ""}
                  label="bank"
                  onChange={e => handleChange("Bank", e.target.value)}
                >
                  {banks &&
                    banks.length > 0 &&
                    banks.map((bank, index) => {
                      return (
                        <MenuItem key={bank.Code} value={bank.Code}>
                          {bank.Description}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>

              <FormControl fullWidth className={classes.textField}>
                <InputLabel id="labelBranch">סניף</InputLabel>
                <Select
                  id="branch"
                  value={
                    register && register.BankBranch ? register.BankBranch : ""
                  }
                  label="branch"
                  required
                  disabled={!(register.Bank != "")}
                  onChange={e => handleChange("BankBranch", e.target.value)}
                >
                  {bankBranchesForBank &&
                    bankBranchesForBank.length > 0 &&
                    bankBranchesForBank.map((bankBranch, index) => {
                      return (
                        <MenuItem key={index} value={bankBranch.BranchNumber}>
                          {bankBranch.BranchName}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>

              <TextValidator
                key={"AccountNumber"}
                className={classes.textField}
                margin="dense"
                label={"מספר חשבון"}
                onChange={e => handleChange("AccountNumber", e.target.value)}
                name="AccountNumber"
                value={
                  register && register.AccountNumber && register.AccountNumber
                }
                validators={["required", "maxStringLength:10", "isDigitsMatch"]}
                errorMessages={["שדה חובה", "עד 10 ספרות", "ספרות בלבד"]}
              />
            </div>
          </div>
          <Button type="submit" variant="contained" className={classes.save}>
            שמירה
          </Button>
        </ValidatorForm>
        <div className={classes.wrapButton}></div>

        {err && <span>{err.status === 409 && "משתמש קיים"}</span>}
        {!err && (
          <>
            <span>"משתמש נוסף בהצלחה"</span>
            <Button className={classes.save} onClick={handleClick}>
              המשך
            </Button>
          </>
        )}
      </Card>
    </div>
  );
}

export default Registration;
