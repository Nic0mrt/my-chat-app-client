import React from 'react';
import { useState, useEffect, useRef, useContext } from 'react';
import { TextField, Button, Typography } from '@material-ui/core';
import { api } from '../../../../utils/api';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { AuthContext } from '../../../../context/context';
import openSocket from 'socket.io-client';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
  },
  messagesSection: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  message: {
    padding: theme.spacing(2),
    backgroundColor: '#f2f2f2',
    marginBottom: theme.spacing(2),

    width: '60%',
    wordWrap: 'break-word',
    float: 'left',
    borderRadius: '1em',
  },

  me: {
    padding: theme.spacing(2),
    backgroundColor: '#41a1eb',
    color: 'white',
    fontWeight: '600',
    marginBottom: theme.spacing(2),
    width: '60%',
    wordWrap: 'break-word',
    float: 'right',
    borderRadius: '1em',
  },
  lastBlankMessage: {
    content: '',
    display: 'block',
    width: '100%',
    float: 'inline-end',
  },

  form: {
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    flexGrow: '1',
    marginRight: theme.spacing(2),
  },
}));

const ConversationMessages = () => {
  const classes = useStyles();
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const input = useRef(null);
  const messageSectionEnd = useRef(null);
  const { userData } = useContext(AuthContext);
  const socket = useRef(null);

  useEffect(() => {
    messageSectionEnd.current.scrollIntoView();
  }, [messages]);

  useEffect(() => {
    if (userData.conversationSelected) {
      socket.current = openSocket('http://localhost:8000/');
      socket.current.on('new-message', message => {
        getMessages();
      });
      socket.current.emit('room', userData.conversationSelected);
    }
    return () => {
      if (socket.current) socket.current.disconnect();
      console.log('unmount');
    };
  }, [userData.conversationSelected]);

  const getMessages = async () => {
    const response = await api(
      `/conversations/${userData.conversationSelected}/messages`,
      'GET'
    );
    if (response.success) {
      setMessages(response.messages);
    }
  };

  useEffect(() => {
    getMessages();
  }, [userData]);

  const onSubmitSocket = async event => {
    event.preventDefault();
    const messageToSend = {
      sender: userData.user._id,
      message: {
        author: userData.user.pseudo,
        text: inputText,
      },
    };

    socket.current.emit('sent-message', messageToSend);
    setInputText('');
  };

  const onSubmit = async event => {
    event.preventDefault();
    const messageToSend = {
      message: {
        author: userData.user.pseudo,
        text: inputText,
      },
    };
    const response = await api(
      `/conversations/${userData.conversationSelected}/messages/`,
      'POST',
      messageToSend
    );
    if (response.success) {
      setMessages(response.messages);
    }
    setInputText('');
  };

  const enter = e => {
    if (e.key === 'Enter') {
      onSubmitSocket(e);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.messagesSection}>
        {messages.map((message, index) => {
          return (
            <div
              className={
                message.author === userData.user.pseudo
                  ? classes.me
                  : classes.message
              }
              key={message._id}
            >
              <Typography>{message.text}</Typography>
            </div>
          );
        })}
        <div className={classes.lastBlankMessage} ref={messageSectionEnd}></div>
      </div>

      <form className={classes.form} onSubmit={onSubmitSocket}>
        <TextField
          className={classes.input}
          rowsMax={6}
          variant="outlined"
          multiline
          placeholder="Message..."
          value={inputText}
          onChange={event => setInputText(event.target.value)}
          onKeyDown={enter}
        />
        <Button type="submit" variant="contained" color="primary" ref={input}>
          Envoyer
        </Button>
      </form>
    </div>
  );
};

export default ConversationMessages;
