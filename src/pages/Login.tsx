import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import { Link, useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import React, { useEffect, useState } from "react";

import "firebase/auth";
import firebase from "firebase/app";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        const errorCode = err.code;
        const errorMessage = err.message;
        if (errorCode === "auth/wrong-password") {
          alert("Wrong password.");
        } else {
          alert(errorMessage);
        }
        console.log(err);
      });
  };
  useEffect(() => {
    document.body.style.display = "none";
    firebase.auth().onAuthStateChanged((user) => {
      user && history.push("/dashboard");
      document.body.style.display = "block";
      
    },err=>{
      if(err){
        firebase.auth().signOut();
        history.push("/");
      }
    });
  }, [history]);
  return (
    <>
      { (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                label="Email Address"
                autoComplete="email"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => handleSignIn()}
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Typography variant="body2">
                    <Link to="/SignUp">{"Don't have an account? Sign Up"}</Link>
                  </Typography>
                </Grid>
              </Grid>
            </form>
          </div>
        </Container>
      )}
    </>
  );
};

export default Login;
