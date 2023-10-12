import { FormControl, TextField, makeStyles, Typography } from "@material-ui/core";
import React from "react";
import { Controller } from "react-hook-form";

export default function TextFieldForm({
  name,
  control,
  type,
  label,
  errors,
  variant,
  style = "",
  formStyle = "",
  multiline,
  textFieldStyle = "",
  rows,
  defaultValue,
}) {
  const classes = useStyles();
  return (
    <div className = {formStyle}>
      <Typography variant="h6" className = {classes.labelTextField}>{label}</Typography>
      <Controller
        style={style}
        name={name}
        defaultValue={defaultValue}
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <FormControl >
            <TextField
              type={type}
              inputProps={{ min: 0 }}
              InputProps={{ className: [textFieldStyle , classes.textField]}}
              variant={variant}
              multiline={multiline}
              rows={rows}
              {...field}
            />
          </FormControl>
        )}
      />
      {errors && (
        <p aria-roledescription="error" className={classes.errorInput}>
          Be required
        </p>
      )}
    </div>
  );
}
const useStyles = makeStyles((theme) => ({
  errorInput: {
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
    marginTop: 0,
    fontSize: 10,
  },
  textField: {
    height: 38,
    borderRadius: 3,
  },
  labelTextField:{
    fontSize: 12,
    color: "#2C2C2C",
    fontWeight: 500,
  },
  WrapperTextField:{
    width: 380,
    paddingBottom: 5,
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
  }
}));
