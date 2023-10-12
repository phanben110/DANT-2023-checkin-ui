import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { get } from "lodash";
import { makeStyles, Box, Avatar, Typography, Paper, TextField, Tabs, Tab, IconButton, Icon, ButtonBase } from "@material-ui/core";
import {
  Link,
  Route,
  Switch,
  useRouteMatch,
  withRouter,
} from "react-router-dom";
import { useHistory } from "react-router-dom";
import Searchbar from "../../components/searchbar/Searchbar";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Wc, Mail, Cake } from "@material-ui/icons";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { Timeline, TimelineContent, TimelineSeparator, TimelineDot, TimelineOppositeContent, TimelineConnector, TimelineItem } from "@material-ui/lab"
import { getAllowedRoutes, history } from "../../utils";
import { getDetailCheckin, getDetailStudent } from '../../store/slices/checkinSlice';
import {img_person} from "../../assets/images"

function Detail() {
  const classes = useStyles();
  const { path, url } = useRouteMatch();
  const dispatch = useDispatch();
  const history = useHistory();

  const selectorDetail = useSelector((state) =>
    get(state, "checkinStore.detailCheckin", {})
  );

  const detail = get(selectorDetail, "current", [])

  const selectorStudent = useSelector((state) =>
    get(state, "checkinStore.detailStudent", {})
  );

  const student = get(selectorStudent, "current", {})

  console.log("detail", detail)

  const {
    params: { id },
  } = useRouteMatch();

  useEffect(() => {
    dispatch(getDetailCheckin(id));
    dispatch(getDetailStudent(id))
  }, [])

  return (
    <main className={classes.root}>
      <Box component="div" className={classes.table}>
        <Paper
          elevation={3}
          className={classes.paper}
          style={{ overflow: "auto" }}>
          <div>
            <Avatar
              className={classes.avtStyle}
              alt="Avatar"
              src={student.image}
            ></Avatar>
          </div>
          <div style={{ margin: "12px auto" }}>
            <Typography style={{
              fontSize: "24px", fontFamily: "Nunito",
              color: "#533e6b"
            }}>{student?.first_name + " " + student?.last_name}</Typography>
          </div>
          <div className={classes.content}>
            <Typography className={classes.typoItem}><Mail/> : <span>{student.email ? student.email : "None"}</span></Typography>
            <Typography className={classes.typoItem}><Wc/> : <span>{student.sex ? student.sex === 1 ? "Male" : "Female" : "None"}</span></Typography>
            <Typography className={classes.typoItem}><Cake/> : <span>{student.birthday ? student.birthday : "None"}</span></Typography>
          </div>
          <div className={classes.timeline}>
            <Timeline style={{ margin: 0 }}>
              {detail.map((item, index) => (
                <TimelineItem className={classes.timelineItem}>
                  <TimelineOppositeContent className={classes.timelineOpp}>
                    <Typography color="textSecondary">{item.date}</Typography>
                    <Typography color="textSecondary">{item.time}</Typography>
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot />
                    {index + 1 !== detail.length && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent><Paper elevation={3} className={classes.card}>
                    <Avatar
                      alt="Avatar"
                      src={`https://do-an-tot-nghiep.s3.amazonaws.com/${item?.image}`}
                    ></Avatar>
                    <Typography style={{ color: "#ea3c3c", fontFamily: "Nunito", fontSize: "16px" }}>Mask: <span style={{color:"#533e6b"}}>{item.mask ? "Yes" : "No"}</span></Typography>
                  </Paper></TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </div>
        </Paper>
      </Box>
    </main>
  )
}

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    padding: ".5rem",
    display: "flex",
    justifyContent: "center"
  },
  box: {
    width: "70%",
    margin: "1.5rem 1rem 0rem",
    justifyContent: "center",
  },
  avtStyle: {
    margin: "auto",
    width: "6rem",
    height: "6rem",
    zIndex: 0,
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    height: "78vh",
    overflow: "auto",
    padding: "6px"
  },
  table: {
    width: "70%",
    margin: "1.5rem 1rem 0rem",
    display: "flex",
    justifyContent: "center",
  },
  tool: {
    width: "30%"
  },
  toolPaper: {
    margin: "1.5rem",
    width: "80%",
  },
  datePicker: {
    width: "100%",
    "&:hover": {
      backgroundColor: "#FFFFFF",
      color: "black"
    },
  },
  card: {
    padding: '6px 16px',
  },
  tab: {
    minWidth: 0,
    //fontSize:"8px",
    //borderRadius:"50%",
    //backgroundColor: "#DCF4FF",
    '&::focus': {
      backgroundColor: "yellow"
    }
  },
  iconBtn: {
    fontSize: 12,
    color: "black",
    backgroundColor: "#fcca88",
    textTransform: "capitalize",
    "::focus": {
      backgroundColor: "blue",
    }
  },
  content: {
    display: "flex",
    justifyContent: "center"
  },
  timeline: {
    maxHeight: 400,
    overflow: "auto",
    padding: "12px 24px",
  },
  typoItem: {
    margin: "6px 6px",
    fontFamily: "Nunito",
    color: "#533e6b",
    justifyContent:"center",
    alignItems:"center",
    display:"flex",
    marginRight:"2rem",
    fontSize:"16px"
  },
  timelineItem: {
    '&.MuiTimelineItem-missingOppositeContent:before': {
      flexGrow: 4
    }
  },
  timelineOpp: {
    flex: "none",
  },
}))

{/* <Box className={classes.box}>

</Box> */}

export default Detail;