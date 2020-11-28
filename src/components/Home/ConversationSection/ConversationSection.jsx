import React from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ConversationBanner from './ConversationBanner/ConversationBanner';
import ConversationMessages from './ConversationMessages/ConversationMessages';

const useStyles = makeStyles(theme => ({
  conversationSection: {
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
  },
}));

const ConversationSection = () => {
  const classes = useStyles();
  return (
    <section className={classes.conversationSection}>
      <ConversationBanner />
      <ConversationMessages />
    </section>
  );
};

export default ConversationSection;
