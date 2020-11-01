import React from 'react';
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { Link, useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import firebase from 'firebase/app';
import 'firebase/auth';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    tabItems:{
        margin:theme.spacing(2),
    },
    tabItem:{
      padding:theme.spacing(2),
    },
    title: {
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    headerRightPart:{
        display:"flex",
        justifyContent:"flex-end",
        alignItems:"center",
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
        width: 'auto',
   
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
   
  }),
);

export default function Header({searchID,setSearchID}:{searchID?:string,setSearchID?:React.Dispatch<React.SetStateAction<string>>}) {
  const classes = useStyles();
  const history = useHistory();
  const handleSignOut = ()=>{
      firebase.auth().signOut();
      history.push("/");
  }
  return (
    <div className={classes.grow}>
      <AppBar style={{backgroundColor:"#0f85dd"}} position="static">
        <Toolbar style={{justifyContent:"space-between"}}>
          <Typography className={classes.title} variant="h6" noWrap>
            Asteroid-Explorer
          </Typography>
          <div className={classes.headerRightPart}>
         {setSearchID&& <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              value={searchID}
              onChange={e=>setSearchID(e.target.value)}
              placeholder='Search by Asteroid ID'
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
            </div>}
            <div className={classes.tabItems}>
               <Link className={"link"} to="/"> <Button >Dashboard</Button></Link>
               <Link className={"link"} to="/favorites"> <Button >Favorites</Button></Link>
                <Button  onClick={()=>handleSignOut()}>Sign Out</Button>
            </div>
          </div>
         
        </Toolbar>
      </AppBar>
    </div>
  );
}