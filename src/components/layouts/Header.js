import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";

export default function Header() {
  const classes = useStyle();
  return (
      <AppBar
        sx={{ background: "none", boxShadow: "none" }}
        className={classes.appbar}
        position="fixed"
        elevation={0}
      >
        <Toolbar className={classes.toolbar}>
          <h1 className={classes.appbarTitle}>
            Check
            <span className={classes.colorTitle}>.I/O</span>
          </h1>
        </Toolbar>
      </AppBar> 
  );
}

const useStyle = makeStyles((theme) => ({
  appbar: {
    fontFamily: "Nunito",
    background: "none", boxShadow: "none" 
  },
  appbarTitle: {
    flexGrow: 1,
    color: "#E6F7E4",
    fontSize: "2.3rem",
  },
  toolbar: {
    width: "94%",
    margin: "0 auto",
  },
  colorTitle: {
    color: "#EF7960",
  },
  loginBtn:{
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 1,
    borderColor:"white",
    borderStyle: "solid",
    borderRadius: 15,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    padding: '0 30px',
    height:40
  },
  loginText:{
      color:"white"
  },
}));
