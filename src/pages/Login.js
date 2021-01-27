import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {HashRouter, Redirect, Route, Switch,NavLink,} from "react-router-dom";
import { Alert, AlertTitle } from '@material-ui/lab';

const base_url = 'http://localhost:3003';

function Copyright() { 
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.fpi-online.com/">
          Login Sang Habib
      </Link>{' '}
        {new Date().getFullYear() }
      {'.'}
    </Typography>
  );
}


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const [tampilError, setTampilError] = useState(false)
  const [NIK, setNIK] = useState("")
  const [Password, setPassword] = useState("")
  const onClickLogin = function () {
    console.log(NIK,Password)
    // window.location.hash ='/App'
    let option = {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          "NIK": NIK,
          "password": Password
      })
  }
  fetch(base_url + '/login', option).then(res => res.json()).then(response => {
      console.log(response.login)
      if (response.login === true) {
        window.location.hash = '/App'
      }
      else {
        setTampilError(true)
      }
  });
  }

  const onNIKChange = function (element) {
    console.log(element.target.value);
    setNIK(element.target.value)
}
const onPasswordChange = function (element) {
  console.log(element.target.value);
  setPassword(element.target.value)
}
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
        </Avatar>
        <Typography component="h1" variant="h5">
          Menjadi Habib
        </Typography>
        <form className={classes.form} noValidate>
          <TextField 
            variant="outlined"
            margin="normal"
            type="number"
            required
            fullWidth
            id=""
            label="NIK"
            name=""
            autoComplete="current-password"
            autoFocus
            onChange={function(element){
              onNIKChange(element)}
            }
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name=""
            label="Password"
            type="password"
            id=""
            autoComplete="current-password"
            onChange={function(element){
              onPasswordChange(element)}
            }
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Ingat Aku Ya :3"
          />
          <Button 
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick=  {onClickLogin} >
            Login 
          
          </Button>
          {/* <Grid container>
            <Grid item xs>
              <NavLink to="/LupaPassword" >
                {'lupa Password?'}
                <br></br>
                {'Akowokwokwok'}
              </NavLink>
              </Grid>
            <Grid item>
              <NavLink to="/Daftar" >
                {"Gak punya akun? macam "} 
                <br></br>
                 {"tak betul je budak ni"}
              </NavLink>
            </Grid>
          </Grid> */}
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
      {tampilError &&
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        This is an error alert — <strong>check it out!</strong>
      </Alert>
      }

    </Container>
  );
}