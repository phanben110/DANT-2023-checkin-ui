import React from "react";
import { Card, CardHeader, Avatar, makeStyles, CardContent, CardActions, Button, Typography, Paper, Chip } from "@material-ui/core";
import { LocalLibrary, MeetingRoom } from "@material-ui/icons"

export default function JobCard({ data = {} }) {
  const classes = useStyles();
  return (
    // <Card className={classes.root} variant="outlined">
    //   <CardHeader
    //     avatar={
    //       <Avatar aria-label="recipe" className={classes.avatar}>
    //         R
    //       </Avatar>
    //     }
    //     title="Golangs"
    //     titleTypographyProps={{ variant: 'h5' }}
    //     subheader="Orient Software Development Corp"
    //   />
    //   <CardContent>
    //     <Typography variant="h5" component="h2"></Typography>
    //     <Typography className={classes.pos} color="textSecondary">
    //       Number: 3
    //     </Typography>
    //     <Typography variant="body2" component="p">
    //       Level: Middle - Senior
    //     </Typography>
    //   </CardContent>
    //   <CardActions>
    //     <Button size="small">Apply</Button>
    //   </CardActions>
    // </Card>
    <Paper className={classes.root}>
      <div className={classes.header}>

        <div className={classes.headerContent}>
          <Typography className={classes.mainTitle}>Golangs</Typography>
          <Typography>Orient Software Development Corp</Typography>
        </div>
        <div className={classes.headerAvatar}>
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        </div>
      </div>
      <div className={classes.content}>
        <div className={classes.level}>
          <Chip
            avatar={<Avatar>L</Avatar>}
            label="Level: Senior"
            color="secondary"
            variant="outlined"
          />
        </div>
        <div className={classes.requirement}>
          <div className={classes.experience}>
            <MeetingRoom style={{ color: "#FD6A47", marginRight: "8" }} />
            <Typography>2 postions</Typography>
          </div>
        </div>
        <div className={classes.requirement}>
          <div className={classes.experience}>
            <LocalLibrary style={{ color: "#FD6A47", marginRight: "8" }} />
            <Typography>+3 experience years</Typography>
          </div>
        </div>
      </div>
      <div className={classes.action}>
        <Button size="small" style={{backgroundColor:"#4FF9A3"}}>Apply</Button>
      </div>
    </Paper>
  )
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "2.5rem",
    padding: ".5rem",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  header: {
    display: "flex",
    padding: "16px",
    alignItems: "center",
  },
  headerContent: {
    flex: "1 1 auto",
  },
  headerAvatar: {
    flex: "0 0 auto",
    marginLeft: "16px",
  },
  mainTitle: {
    fontFamily: 'Readex Pro',
    fontSize: "1.2rem"
  },
  content: {
    height: "100px",
  },
  experience: {
    display: "flex",
    padding: "0 16px",
    color: "#636467",
  },
  chip: {
    width: "100px "
  },
  level:{
    padding: "0 8px 8px 16px",
  },
  action:{
    padding: "0 16px",
    display:"flex",
    justifyContent:"flex-end"
  }
}));