import React, { useEffect, useState, useContext } from 'react';
import { api } from '../../../../utils/api';
import { AuthContext } from '../../../../context/context';
import { ListItemAvatar, ListItemText, Avatar } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: '1',
    overflow: 'auto',
  },
  list: {},
  listItem: {
    height: '100px',
    overflow: 'hidden',
  },
  listItemText: {},
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
  secondary: {
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
}));

const ConversationListItem = props => {
  const classes = useStyles();
  const [conversation, setConversation] = useState(null);
  const [contacts, setContacts] = useState(null);
  const { userData } = useContext(AuthContext);

  useEffect(() => {
    const getConversationInfo = async () => {
      const response = await api(`/conversations/${props._id}`, 'GET');

      if (response.success) {
        setConversation(response.conversation);
        setContacts(
          response.conversation.users.filter(user => {
            return user._id !== userData.user._id;
          })
        );
      }
    };

    getConversationInfo();
  }, []);

  return (
    <>
      <ListItemAvatar>
        <Avatar className={classes.avatar}></Avatar>
      </ListItemAvatar>
      <ListItemText
        className={classes.listItemText}
        primary={
          contacts
            ? contacts.map(contact => `${contact.firstname} ${contact.name}`)
            : null
        }
        secondary={
          <div className={classes.secondary}>
            {conversation ? conversation.lastMessage : null}
          </div>
        }
      ></ListItemText>
    </>
  );
};

export default ConversationListItem;
