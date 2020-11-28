import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Typography, Paper } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import MessageIcon from '@material-ui/icons/Message';
import { AuthContext } from '../../../../context/context';

const useStyles = makeStyles(theme => ({
  profileSectionBanner: {
    minHeight: '80px',
    width: '100%',
    padding: '10px 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    display: 'flex',
  },
  right: {
    display: 'flex',
  },
  avatar: {
    height: '50px',
    width: '50px',
    backgroundColor: theme.palette.primary.main,
    marginRight: theme.spacing(2),
  },
  typography: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    marginRight: theme.spacing(2),
    cursor: 'pointer',
  },
}));

const ProfileBanner = props => {
  const { userData } = useContext(AuthContext);
  const classes = useStyles();
  return (
    <Paper className={classes.profileSectionBanner} elevation={1}>
      <div className={classes.left}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography className={classes.typography}>
          {userData.user.firstname}
        </Typography>
      </div>
      <div className={classes.right}>
        <SettingsIcon className={classes.icon} fontSize="large" />
        <MessageIcon className={classes.icon} fontSize="large" />
      </div>
    </Paper>
  );
};
export default ProfileBanner;
