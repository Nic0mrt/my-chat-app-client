import React from 'react';
import { Paper } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  conversationSectionBanner: {
    minHeight: '80px',
    padding: '10px 16px',
  },
}));

const ConversationBanner = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.conversationSectionBanner} elevation={1}></Paper>
  );
};

export default ConversationBanner;
