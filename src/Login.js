import React from 'react';
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
import {HashRouter, Redirect, Route, Switch,NavLink  } from "react-router-dom";

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

export default function SignIn() {
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
        
            autoFocus
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
          >
            Login 
            <Link href="https://www.fpi-online.com/">
              </Link>
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
    </Container>
  );
}