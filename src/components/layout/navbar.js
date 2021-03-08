import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Drawer from './drawer';
import { logOut } from '../../services/protectRoute';
import { loginAction } from '../../redux/actions/loginAction';
import { connect } from 'react-redux';
import { setProtection } from '../../redux/actions/setProtectionAction';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function ButtonAppBar(props) {
  const classes = useStyles();
  const isProtected = props.security.isProtected
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {isProtected? <Drawer/> : null}
          <Typography variant="h6" className={classes.title}>
            ETracker
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
const mapStateToProps = state =>({
  security: state.protection
});
export {ButtonAppBar};
export default connect(mapStateToProps, { setProtection})(ButtonAppBar);