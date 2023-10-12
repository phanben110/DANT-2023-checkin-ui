import React, { useState, useEffect } from "react";
import {
  AppBar,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
  Avatar,
  Typography,
  Box,
} from "@material-ui/core";
//import { useDispatch, useSelector } from "react-redux";
import { get } from "lodash";
import { logout } from "../../store/slices/userSlice";
import {useDispatch} from "react-redux"
import { useHistory } from "react-router-dom";


export default function TopNav({ drawer }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [dropdownProfile, setDropdownProfile] = useState(null);

  const onLogout = () => {
    dispatch(logout());
    setDropdownProfile(null);
    history.push("/app");
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar__admin}>
          <Typography component="div" inline className={classes.title}>
            <Box
              fontWeight="fontWeightBold"
              fontSize={14}
              className={classes.box}
              textAlign="right"
            >
              Welcome!
            </Box>
            <Box
              fontSize={12}
              className={classes.box}
              textAlign="right"
            >              
            </Box>
          </Typography>
        <IconButton
          style={{ marginLeft: "auto" }}
          onClick={(e) => setDropdownProfile(e.currentTarget)}
        >
          <Avatar
            alt="logo"
            className={classes.large}
          />{" "}
        </IconButton>{" "}
        <Menu
          id="menu"
          anchorEl={dropdownProfile}
          keepMounted={false}
          open={Boolean(dropdownProfile)}
          getContentAnchorEl={null}
          PaperProps={{
            style: {
              left: '50%',
              transform: 'translateX(0%) translateY(85%)',
            }
          }}
          onClose={() => setDropdownProfile(null)}
        >
          <MenuItem onClick={() => onLogout()}> Logout </MenuItem>{" "}
        </Menu>{" "}
      </Toolbar>{" "}
    </AppBar>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#FAFAFA",
    borderBottom: "2px solid #e5e5e5",
    boxShadow: "#D8D8D8 0px 0px 3px 0px inset, rgba(255, 255, 255, 0.5) 0px 0px 4px 1px inset",
  },
  menuButton: {
    marginRight: 40,
  },
  hide: {
    display: "none",
  },
  toolbar__admin: {
    display: "flex",
    justifyContent: "flex-start",
    alignContent: "center",
  },
  title: {
    color: "black",
    fontSize: 12,
    flexGrow: 1,
    justifyContent: "flex-end",
    flexDirection: "column",
    height: "90%",
  },
  box: {
    margin: 0,
  },
}));