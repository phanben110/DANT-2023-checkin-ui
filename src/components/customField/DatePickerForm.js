import { FormControl, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { Controller } from "react-hook-form";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

export default function DatePickerForm({
  name = "",
  control,
  defaultValue = new Date(),
  label = "",
  disabled = false,
  formStyle = "",
  errors,
  minDate = null,
  minDateMessage = "",
  useMaterialStyle = true,
}) {
  const classes = useStyles();
  return (
    <>
    <div className={formStyle}>
    <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <FormControl style={{width:"100%"}}>
            <Typography variant="h6" className={classes.labelTextField}>
              {label}
            </Typography>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disabled={disabled}
                variant="inline"
                format="dd/MM/yyyy"
                onChange={onChange}
                value={value}
                className={classes.textField}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                minDate={minDate}
                minDateMessage={minDateMessage}
                InputProps={{
                  classes: {
                    input: useMaterialStyle && classes.input,
                  },
                }}
              />
            </MuiPickersUtilsProvider>
          </FormControl>
        )}
      />
      {errors[name] && (
        <p aria-roledescription="error" className={classes.errorInput}>
          Be required
        </p>
      )}
    </div>     
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  errorInput: {
    margin: "0 .5rem",
  },
  input: {
    padding: 0,
  },
  textField: {
    "& .MuiInputBase-root": {
      height: 38,
    },
  },
  labelTextField: {
    fontSize: 12,
    color: "#2C2C2C",
    fontWeight: 500,
  },
}));
