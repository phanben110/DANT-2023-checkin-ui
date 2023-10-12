import React from "react";
import { Avatar, IconButton, makeStyles } from "@material-ui/core";
import { AddAPhotoOutlined } from "@material-ui/icons";

export default function AvatarImage({
  divClasses,
  imgClasses,
  avtStyle,
  iconStyle,
  src,
  avatar,
  toggle,
  handleCapture,
}) {
  const classes = useStyles();

  return (
    <div className={divClasses}>
      <Avatar
        classes={{ img: imgClasses }}
        className={avtStyle}
        alt="Avatar"
        src={src ? src.avatarPreview : avatar}
      ></Avatar>
      {toggle && (
        <IconButton
          component="label"
          className={iconStyle}
          classes={{ root: classes.buttonAvatar }}
        >
          <AddAPhotoOutlined />
          <input type="file" hidden onChange={(e) => handleCapture(e)} />
        </IconButton>
      )}
    </div>
  );
}

const useStyles = makeStyles(() => ({
  buttonAvatar: {
    "&:hover": {
      fontSize: 16,
      backgroundColor: "#dbdbdb",
      opacity: 0.5,
    },
  },
  avtStyle: {
    margin: "auto",
    width: "8rem",
    height: "8rem",
    zIndex: 0,
  },
}));
