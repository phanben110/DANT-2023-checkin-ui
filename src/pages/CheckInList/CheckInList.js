import React, { useState, useEffect } from "react";
import {
  Drawer,
  List,
  ListItem,
  makeStyles,
  ListItemIcon,
  Typography,
  ListItemText,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CardHeader,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  withStyles,
  Paper,
  TextField,
  Box
} from "@material-ui/core";
import {
  PersonAddOutlined,
  FilterListOutlined,
  GetAppOutlined,
  CancelOutlined,
  ExpandLess,
  ExpandMore,
} from "@material-ui/icons";
import {
  Link,
  Route,
  Switch,
  useRouteMatch,
  withRouter,
} from "react-router-dom";
import { JobCard } from "../../components/cards/index";
import { getAllowedRoutes, history } from "../../utils";
import { useDispatch, useSelector } from "react-redux";

import Searchbar from "../../components/searchbar/Searchbar";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import queryString from "query-string";
import { getListCheckin } from "../../store/slices/checkinSlice";
import { get } from "lodash";

const field = ["Id", "Name", "Image", "Date", "Time", "Mask"]

function CheckInList({ children }) {
  const allowedRoutes = getAllowedRoutes(children);
  const dispatch = useDispatch();
  const classes = useStyles();
  const { path, url } = useRouteMatch();
  const [date, setDate] = useState(new Date());

  const selectorCheckin = useSelector((state) =>
    get(state, "checkinStore.listCheckin", {})
  );

  const listOfCheckin = get(selectorCheckin, "list", []);

  const [body, setBody] = useState({
    page: "",
    search: "",
    date__iexact: "",
  });

  const onShowDetail = async (id) => {
    history.push(`${url}/${id}`);
  }

  const onSearch = async (search) => {
    setBody({ ...body, search });
    const param = queryString.stringify(body);
    await dispatch(getListCheckin(param))
  }

  const onChangeDate = async (date) => {
    //setDate(date.toLocaleDateString('en-CA'))
    setBody({...body, date__iexact: date.toLocaleDateString('en-CA')})
    console.log("body",body)
  }

  useEffect(() => {
    dispatch(getListCheckin(body));
  }, [body]);

  return (
    <main className={classes.root}>
      <Switch>
        <Route exact path={path}>
          <Box component="div" className={classes.table}>
            <Paper
              elevation={3}
              className={classes.paper}
              style={{ overflow: "auto" }}>
              <TableContainer>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow hover>
                      {field.map((cell) => (
                        <StyledTableCell align="center">
                          <div className={classes.wrapper_sort}>
                            <Typography>{cell}</Typography>
                            {(cell === "Name") && (
                              <IconButton
                                className={classes.soft}
                                classes={{ label: classes.horizontal }}
                              >
                                <ExpandLess className={classes.fontIcon} />
                                <ExpandMore className={classes.fontIcon} />
                              </IconButton>
                            )}
                          </div>
                        </StyledTableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  {listOfCheckin.map((checkin, index) => (
                    <TableBody style={{ position: "relative" }}>
                      <TableRow hover onClick={() => onShowDetail(checkin?.student?.CCCD)}>
                        <TableCell
                          style={{ color: "#111743", fontWeight: "bold" }}
                          align="left"
                        >
                          {index}
                        </TableCell>
                        <TableCell align="left">{checkin?.student?.first_name + " " + checkin?.student?.last_name}</TableCell>
                        <TableCell align="left">
                          <Avatar
                            src={checkin?.student.image}
                          >

                          </Avatar>
                        </TableCell>
                        <TableCell align="left">{checkin.date}</TableCell>
                        <TableCell align="left">{checkin.time}</TableCell>
                        <TableCell align="left">{checkin.mask ? "Yes" : "No"}</TableCell>
                      </TableRow>
                    </TableBody>
                  ))}
                </Table>
              </TableContainer>
            </Paper>
          </Box>
          <Box className={classes.tool}>
            <div className={classes.toolPaper}>
              <Searchbar submitSearch={(keyWord) => onSearch(keyWord)} />
            </div>
            <div className={classes.toolPaper}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  label="Select date"
                  inputFormat="MM/dd/yyyy"
                  value={date}
                  onChange={(newValue) => {
                    onChangeDate(newValue)
                  }}
                  renderInput={(params) => <TextField className={classes.datePicker} variant="outlined" {...params} />}
                />
              </LocalizationProvider>
            </div>
          </Box>
        </Route>
        {allowedRoutes.map((route) => {
          const {
            path,
            component: Component,
            children,
            title,
            permission,
            ...rest
          } = route;
          return (
            <Route {...rest} key={path} path={`${url}${path}`}>
              <Component />
            </Route>
          );
        })}
      </Switch>
    </main>
  );
}

export default CheckInList;

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#d8d8d8",
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "4.5rem",
    padding: ".5rem",
    display: "flex"
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  container: {
    margin: 0,
  },
  wrapper_sort: {
    color: "#3c4060",
    fontWeight: "bold",
    display: "flex",
    alignItems: "center",
  },
  paper: {
    display: "flex",
    alignItems: "start",
    width: "100%",
    height: "78vh",
  },
  table: {
    width: "70%",
    margin: "1.5rem 1rem 0rem"
  },
  soft: {
    display: "flex",
    flexDirection: "column",
    padding: 0,
    width: 20,
    height: 20,
  },
  fontIcon: {
    fontSize: 12,
  },
  horizontal: {
    flexDirection: "column",
  },
  tool: {
    width: "30%"
  },
  toolPaper: {
    margin: "1.5rem",
    width: "80%"
  },
  datePicker: {
    width: "100%",
    "&:hover": {
      backgroundColor: "#FFFFFF",
      color: "black"
    },
  },
}));
