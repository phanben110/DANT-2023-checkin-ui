import {
    FormControl,
    IconButton,
    InputBase,
    makeStyles,
    MenuItem,
    Select,
    Typography,
    withStyles,
  } from "@material-ui/core";
  import {
    NavigateBeforeOutlined,
    NavigateNextOutlined,
    SkipNextOutlined,
    SkipPreviousOutlined,
  } from "@material-ui/icons";
  import React from "react";
  
  export default function Pagination({
    offset = 1,
    limit = 15,
    totalCount = 25,
    totalPages = 0,
    handlePageChange,
  }) {
    const classes = useStyle();
  
    return (
      <div
      className = {classes.wrapper_pagination}
        style={{
         
        }}
      >
        <Typography className={classes.borderButton}>Rows per page:</Typography>
        <FormControl className={classes.borderButton}>
          <Select
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            value={limit}
            onChange={(e) => handlePageChange("filter", e.target.value)}
            input={<BootstrapInput />}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={totalCount}>All</MenuItem>
          </Select>
        </FormControl>
        <IconButton
          disabled={offset <= 1 ? true : false}
          className={classes.borderButton}
          onClick={() => handlePageChange("first", 1)}
        >
          <SkipPreviousOutlined className={classes.buttonFontSize} />
        </IconButton>
        <IconButton
          disabled={offset <= 1 ? true : false}
          className={classes.borderButton}
          onClick={() => handlePageChange("back", offset - 1)}
        >
          <NavigateBeforeOutlined className={classes.buttonFontSize} />
        </IconButton>
        <Typography
          className={classes.borderButton}
        >{`${offset} of ${totalPages}`}</Typography>
  
        <IconButton
          disabled={totalPages <= offset ? true : false}
          className={classes.borderButton}
          onClick={() => handlePageChange("next", offset + 1)}
        >
          <NavigateNextOutlined className={classes.buttonFontSize} />
        </IconButton>
        <IconButton
          disabled={totalPages <= offset ? true : false}
          className={classes.borderButton}
          onClick={() => handlePageChange("last", totalPages)}
        >
          <SkipNextOutlined className={classes.buttonFontSize} />
        </IconButton>
      </div>
    );
  }
  const BootstrapInput = withStyles((theme) => ({
    root: {
      "label + &": {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #ced4da",
      fontSize: 16,
      padding: "3px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
    },
  }))(InputBase);
  const useStyle = makeStyles((theme) => ({
    borderButton: {
      margin: "0 10px",
      height: "25px",
      borderRadius: "3px",
    },
    buttonFontSize: {
      fontSize: 24,
    },
    wrapper_pagination:{
      padding: "10px 0",
      display: "flex",
      justifyContent: "flex-end",
      alignItem: "center",
      position: 'absolute',
      bottom: 0,
      right: 0,
    }
  }));
  