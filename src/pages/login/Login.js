import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { img_background } from "../../assets/images";
import { Controller, useForm } from "react-hook-form";
import { CssBaseline } from "@mui/material";
import Header from "../../components/layouts/Header";
import { Typography, Grid, Box, Avatar, TextField, FormControlLabel, Checkbox, Button, Paper } from "@material-ui/core";
import { display } from "@mui/system";
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {login} from "../../store/slices/userSlice"

export default function Login() {
  const classes = useStyle();
  const history = useHistory();
  const dispatch = useDispatch();
  const status = useSelector((state) => state.userStore);

  useEffect(() => {
    if (status.success && status.current) history.push("/app");
  }, [status.success]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ username, password }) => {
    await dispatch(
      login({
        username,
        password,
        cb: () => {
          history.push("/app");
        },
      })
    );
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
      <div className={classes.imgContent}>
        <Box
          component={Paper}
          sx={{
            height: 400,
            width: 400,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            alignSelf: "center",
            padding:"1rem",
            borderRadius:8
          }}
          className={classes.box}
          square
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box>
          <form
              autoComplete="off"
              onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="username"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Email Address"
                    name="username"
                    autoComplete="email"
                    autoFocus
                    {...field}
                  />
                )}
              />
              {errors.email && (
                <p aria-roledescription="error" className={classes.error}>
                  Email must be required
                </p>
              )}
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    {...field}
                  />
                )}
              />
              {errors.password && (
                <p aria-roledescription="error" className={classes.error}>
                  Password must be required
                </p>
              )}
              <div style={{marginTop:'0.5rem'}}>
                <Typography style={{fontSize:14}}> To check your status without logging in! <Link to="/search">Click here</Link>  </Typography>                       
              </div>          
              <Button
                type="submit"
                fullWidth
                style={{marginTop:"2rem"}}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </form>
          </Box>
        </Box>
      </div>
    </div>
  );
}

const useStyle = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    width: "100%",
    backgroundImage: `url(${img_background})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: "flex",
    position: "relative"

  },
  imgContent: {
    display: "flex",
    width: "100%",
    justifyContent:"center"
  },
  imgStyle: {
    width: 450,
    alignSelf: "flex-end",
    transform: "scaleX(-1)"
  },
  box: {
    margin:"auto"
  },
  formControlLabel:{
    margin:"1rem 0 2rem"
  },
}));
