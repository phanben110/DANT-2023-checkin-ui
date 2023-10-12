import React from "react";
import {
  makeStyles,
  Modal,
  Backdrop,
  Fade,
  Box,
  Typography,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: "flex",
    flexDirection: "column",
  },
  title: {
      padding: '1rem',
      fontSize: '1.1rem',
  },
  container__button: {
      marginTop: '.5rem',
      display: 'flex',
      justifyContent: 'flex-end'
  },
  button: {
      margin: '0 .5rem'
  }
}));
export default function ModalConfirm({ open, handleClose, title, handleYes }) {
  const classes = useStyles();
  return (
    <Modal
      className={classes.modal}
      open={open}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <Typography className={classes.title}>{title}</Typography>
          <Box className={classes.container__button}>
            <Button onClick={handleClose} variant="contained" className={classes.button}>No</Button>
            <Button variant="contained" color='secondary' className={classes.button} onClick={handleYes}>Yes</Button>
          </Box>
        </div>
      </Fade>
    </Modal>
  );
}
