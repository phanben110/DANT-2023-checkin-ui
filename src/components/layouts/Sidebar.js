import React, { forwardRef, useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  makeStyles,
  ListItemIcon,
  Typography,
  ListItemText
} from "@material-ui/core";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import clsx from "clsx";
import { Link } from "react-router-dom";

export default function Sidebar({ drawer, routes = [], prefix }) {
  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer)}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: drawer,
        }),
      }}
    >
      <h1 className={classes.appbarTitle}>
        Check.
        <span className={classes.colorTitle}>I/O</span>
      </h1>
      <List className={classes.listRoute}>
        {routes.map(({ path, title, icon, children }, index) => (
          <ListItem
            className={classes.route}
            button
            key={title}
            component={forwardRef((props, ref) => (
              <Link innerRef={ref} to={`${prefix}${path}`} {...props} />
            ))}
          >
             <ListItemIcon >{icon}</ListItemIcon>
               <ListItemText primary={title} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  )
}
const styleIcon = {
  width: "8px",
  height: "8px",
  marginRight: 8,
  marginLeft: -5
};

const useStyles = makeStyles((theme) => ({
  drawer: {
    flexShrink: 0,
    width: 220,
    whiteSpace: "nowrap",
    background: "#FAFBFC",
    fontFamily: "Nunito",
  },
  appbarTitle: {
    padding: "0.5rem",
    fontSize: "2rem",
  },
  drawerOpen: {
    width: 220,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    background: "#FAFBFC",
    boxShadow: "#D8D8D8 0px 0px 3px 0px inset, rgba(255, 255, 255, 0.5) 0px 0px 4px 1px inset",
  },
  colorTitle: {
    color: "#EF7960",
  },
  listRoute:{
    //marginLeft: 10,
   },
   route: {
     color: "black",
     marginBottom: -5,
   },
   colorItem: {
     color: "#dbdbdb",
   },
   hide: {
     display: "none",
   },
   title:{
     fontSize: 12,
   },
   navigationIcon:{
     marginRight: -20,
   }
}))