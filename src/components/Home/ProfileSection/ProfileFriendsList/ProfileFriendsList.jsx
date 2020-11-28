import React, { Fragment, useContext, useRef, useEffect } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ConversationListItem from './ConversationListItem';
import { List, ListItem } from '@material-ui/core';
import { AuthContext } from '../../../../context/context';
import openSocket from 'socket.io-client';

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

const ProfileFriendsList = () => {
  const classes = useStyles();
  const { userData, setUserData } = useContext(AuthContext);

  return (
    <div className={classes.root} id="item">
      <List className={classes.list}>
        {userData.conversations.map(conversation => {
          return (
            <div
              key={conversation}
              onClick={() => {
                console.log(conversation);
                setUserData({
                  ...userData,
                  conversationSelected: conversation,
                });
              }}
            >
              <ListItem className={classes.listItem} button name={conversation}>
                <ConversationListItem _id={conversation} />
              </ListItem>
            </div>
          );
        })}
      </List>
    </div>
  );
};

export default ProfileFriendsList;
