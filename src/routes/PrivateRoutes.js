import React, { useState } from "react";
import { Redirect, useRouteMatch } from "react-router-dom";
import { Sidebar, Toolbar } from "../components/layouts";
import { createTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { Typography } from "@mui/material";
import { Login, StudentMng, CheckInList, Detail } from "../pages";
import { Work, AssignmentInd, Group } from "@material-ui/icons";
import { isLoggedIn } from "../utils";
import { getAllowedRoutes } from "../utils/getAllowedRoutes";
import MapAllowedRoutes from "./MapAllowedRoutes";

const styleIcon = {
  width: "20px",
  height: "20px",
};

const privateRouters = [
  {
    component: CheckInList,
    path: "/checkin",
    title: "Check in",
    icon: <Group />,
    children: [
      {
        component: Detail,
        path:"/:id",
      }
    ]
  },
  {
    component: StudentMng,
    path: "/studentMng",
    title: "Student Management",
    icon: <AssignmentInd />,
    children: []
  },
]

function PrivateRoutes() {
  const match = useRouteMatch("/app");
  const [drawer, setDrawer] = useState(true);
  const handleDrawerToggle = () => setDrawer(!drawer);
  let allowedRoutes = [];

  if (isLoggedIn()) allowedRoutes = privateRouters;
  else{
    console.log("here")
    return <Redirect to= "/" />
  };
  return (
    <MuiThemeProvider theme={theme}>
      <Toolbar />
      <Sidebar 
        drawer={drawer}
        handleDrawerToggle={handleDrawerToggle}
        routes={allowedRoutes}
        prefix={match.path}
      />
      <MapAllowedRoutes routes={allowedRoutes} basePath="/app" isAddNotFound />
    </MuiThemeProvider>
  );
}

const theme = createTheme({
  typography: {
    useNextVariants: true,
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "Roboto",
      "Arial",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      '"Helvetica Neue"',
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    fontSize: 12,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

export default PrivateRoutes;