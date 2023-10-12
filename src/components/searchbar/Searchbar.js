import { InputBase, makeStyles, fade, IconButton } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import React, { useState } from "react";

export default function SearchBar({submitSearch}) {
  const classes = useStyles();
  const [keyWord, setKeyWord] = useState("");
  return (
    <div className={classes.search}>
      <InputBase
        value={keyWord}
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ "aria-label": "search" }}
        onChange={(event) => {
          setKeyWord(event.target.value);
        }}
      />
        <IconButton className={classes.searchIcon} onClick = {() => submitSearch(keyWord)}>
          <Search />
        </IconButton>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    "&:hover": {
      backgroundColor:"#FFFFFF",
      color:"black"
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      //marginLeft: theme.spacing(3),
      width: "100%",
    },
    display: "flex",
    borderRadius:4,
    borderStyle:"solid",
    borderWidth:1,
    borderColor: "rgba(0, 0, 0, 0.23)"
  },
  searchIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));
