import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { HashRouter, Redirect, Route, Switch} from 'react-router-dom';
import DrawerRoutes from '../config/DrawerRoutes';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  
}));

export default function Home() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

 const  logout = () => {
    // localStorage.clear();
    window.location.hash = "/" ;
}

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Fajri Sang Legenda
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
            <ListItem button key='HRD' onClick={() =>{window.location.hash ='/App/HRD'}}>
              <ListItemIcon> <InboxIcon /></ListItemIcon>
              <ListItemText primary='HaErDai' />
            </ListItem>
            <ListItem button key='User'onClick={() =>{window.location.hash ='/App/User'}}>
              <ListItemIcon> <MailIcon /></ListItemIcon>
              <ListItemText primary='User Legenda' />
            </ListItem>
            <ListItem button key='StockBarang'onClick={() =>{window.location.hash ='/App/StockBarang'}}>
              <ListItemIcon> <MailIcon /></ListItemIcon>
              <ListItemText primary='Stock Barang' />
            </ListItem>
            <ListItem button key="Beli Barang" onClick={() =>{window.location.hash ='/App/BeliBarang'}}>
            <ListItemIcon> <MailIcon /></ListItemIcon>
            <ListItemText primary='Beli Barang' />
            </ListItem>
            <ListItem button key="InputStock" onClick={() =>{window.location.hash ='/App/InputStock'}}>
            <ListItemIcon> <MailIcon /></ListItemIcon>
            <ListItemText primary='InputStock' />
            </ListItem>
            <ListItem button key="Manajemen Gudang" onClick={() =>{window.location.hash ='/App/ManajemenGudang'}}>
            <ListItemIcon> <MailIcon /></ListItemIcon>
            <ListItemText primary='ManajemenGudang' />
            </ListItem>
            <ListItem button key="Barang" onClick={() =>{window.location.hash ='/App/Barang'}}>
            <ListItemIcon> <MailIcon /></ListItemIcon>
            <ListItemText primary='Barang' />
            </ListItem>
            <ListItem button key="Stock" onClick={() =>{window.location.hash ='/App/Stock'}}>
            <ListItemIcon> <MailIcon /></ListItemIcon>
            <ListItemText primary='Stock' />
            </ListItem>
            <ListItem button key="PENGEN KELUAR" onClick={logout}>
              <ListItemIcon> <ExitToAppIcon /> </ListItemIcon>
            <ListItemText primary ="PENGEN KELUAR" />
            </ListItem>
    
        </List>
        
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <HashRouter>
            <Switch>
                {
                    DrawerRoutes.map(
                    (item, index) => <Route key={index.toString()} path={item.path} name={item.name} component={item.component} />
                    )   
                }
                <Redirect exact from='*' to='/App/HRD'/>
            </Switch>
        </HashRouter>
      </main>
    </div>
  );
}