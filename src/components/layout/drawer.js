import React from 'react'
import { IconButton, Drawer, List, ListItem, Typography, Box, Avatar } from "@material-ui/core"
import { AddCircle, Category, Home, Menu, Reorder, ViewList } from "@material-ui/icons"
import { useState } from "react"
import { makeStyles } from "@material-ui/core/styles"
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color: 'black'
  },
  menuIcon: {
    color: 'white'
  },
  container: {
    width: 250,
    position: 'absolute',
    top: 64,
    bottom: 0,
    backgroundColor:'#EAF4FB',
    overflow:'auto'
},
adminBox:{
    display:'flex',
    justifyContent:'space-evenly',
    alignItems:'center',
    height:70,
},
linkBox: {
  display:'flex',
  padding:'10px',
  color:'#43A0D6',
  '&:hover':{
      background: '#ABD5ED',
      borderLeft: '6px solid  #257AAA'
    }
},
a:{
    textDecoration:'none',
    color:'#43A0D6',
    
},
}))

const SideDrawer = ({navLinks}) => {
  const classes = useStyles()
  const [state, setState] = useState({ right: false })

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return
    }
    setState({ [anchor]: open })
  }

  const sideDrawerList = anchor => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List component="nav">
            <Box className={classes.adminBox}>
                <Typography><Avatar/></Typography>
                <Typography>Admin Name</Typography>
            </Box>
            <Divider/>
            <Typography className={classes.a} href='/' component='a'>
              <ListItem className={classes.linkBox}>
                  <Typography><Home/></Typography>
                  <Typography>Home</Typography>
              </ListItem>
            </Typography>
            <Typography className={classes.a} href='/category/create' component='a'>
              <ListItem className={classes.linkBox}>
                  <Typography><Category/></Typography>
                  Create Category
              </ListItem>
            </Typography>
            <Typography className={classes.a} href='/category/view' component='a'>
              <ListItem className={classes.linkBox}>
                  <Typography><ViewList/></Typography>
                  List Categories
              </ListItem>
            </Typography>
            <Typography className={classes.a} href='/expense/create' component='a'>
              <ListItem className={classes.linkBox}>
                  <Typography><AddCircle/></Typography>
                  Create Expense
              </ListItem>
            </Typography>
            <Typography className={classes.a} href='/expense/view' component='a'>
              <ListItem className={classes.linkBox}>
                  <Typography><Reorder/></Typography>
                  List Expenses
              </ListItem>
            </Typography>
      </List>
    </div>
  );

  return (
    <React.Fragment>
      <IconButton 
      edge="start" 
      aria-label="menu"
      onClick={toggleDrawer("left", true)}
      >
        <Menu fontSize='medium' className={classes.menuIcon}/>
      </IconButton>
      <Drawer
        anchor="left"
        open={state.left}
        onOpen={toggleDrawer("left", true)}
        onClose={toggleDrawer("left", false)}
        
      >
  {sideDrawerList("left")}
</Drawer>
    </React.Fragment>
  )
}

export default SideDrawer