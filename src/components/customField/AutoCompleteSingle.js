import {
    FormControl,
    TextField,
    makeStyles,
    Typography,
  } from "@material-ui/core";
  import React from "react";
  import { Autocomplete } from "@material-ui/lab";
  
  export default function AutocompleteSingle({
    label = "",
    onChange,
    formStyle = "",
    list = [],
    propertyLabel = null,
    value = {},
    onClear = () => {},
    name = "",
    defaultValue = [],
    disabled = false,
    variant = "standard",
    textFieldStyle,
    singleDefaultValue,
    showLabelAsPlaceholder = false
  }) {
    const classes = useStyles();
    return (
      <div className={formStyle}>
        <Typography variant="h6" className={classes.labelTextField}>
          {!showLabelAsPlaceholder && label}
        </Typography>
        <FormControl style={{ width: "100%" }}>
          <Autocomplete
            disabled={disabled}
            options={list && list.map((item) => item)}
            value={value}
            name={name}
            defaultValue={
              singleDefaultValue
                ? singleDefaultValue
                : defaultValue.map((item) =>
                    propertyLabel ? item[propertyLabel] : item
                  )
            }
            onChange={(_, data, reason) => {
              if (reason === "clear") onClear();
              else onChange(data);
            }}
            getOptionLabel={(option) =>
              propertyLabel ? option[propertyLabel] : option
            }
            renderInput={(params) => {
              return (
                <TextField
                  {...params}
                  className={textFieldStyle ? textFieldStyle : classes.textField}
                  label = {showLabelAsPlaceholder && label}
                  variant={variant}
                />
              );
            }}
          />
        </FormControl>
      </div>
    );
  }
  
  const useStyles = makeStyles((theme) => ({
    errorInput: {
      marginLeft: theme.spacing(0.5),
      marginRight: theme.spacing(0.5),
      marginTop: 0,
      color: "red",
      fontSize: 10,
    },
    textField: {
      "& .MuiInputBase-root": {
        height: 38,
        borderRadius: 3,
        padding: "0 9px",
      },
    },
    labelTextField: {
      fontSize: 12,
      color: "#2C2C2C",
      fontWeight: 500,
    },
  }));
  