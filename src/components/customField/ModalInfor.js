import React from "react";
import { makeStyles, Modal, Backdrop, Fade } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[3],
    padding: theme.spacing(4, 4),
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 5,
  },
}));
export default function ModalInfor({ open, handleClose, children, style = ""}) {
  const classes = useStyles();
  return (
    <Modal
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      style = {style}
    >
      <Fade in={open}>
        <div className={classes.paper}>{children}</div>
      </Fade>
    </Modal>
  );
}
