import React, { useContext, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../context/context';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { api } from '../utils/api';
import ProfileSection from '../components/Home/ProfileSection/ProfileSection';
import ConversationSection from '../components/Home/ConversationSection/ConversationSection';
import openSocket from 'socket.io-client';

const useStyles = makeStyles(theme => ({
  main: {
    display: 'flex',
    height: '100vh',
    padding: '25px 0',
    backgroundColor: '#eeeeee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    height: '100%',
    display: 'flex',
  },
}));

function Home() {
  const history = useHistory();
  const { userData, setUserData } = useContext(AuthContext);
  const classes = useStyles();
  const socket = useRef(null);

  useEffect(() => {
    const checkIfUser = async () => {
      console.log('check if user');
      if (Object.keys(userData.user).length === 0) {
        history.push('/login');
      }
    };

    const getUserConversations = async () => {
      const response = await api(
        `/users/${userData.user._id}/conversations`,
        'GET'
      );

      if (response.success) {
        console.log(response.conversations);
        setUserData({ ...userData, conversations: response.conversations });
      }
    };

    checkIfUser();
    getUserConversations();
    if (userData.user) {
      socket.current = openSocket('http://localhost:8000');
      socket.current.emit('user', userData.user._id);
      socket.current.on('refresh', message => {
        console.log(message);
      });
    }
  }, []);

  return (
    <div className={classes.main}>
      <Paper className={classes.container}>
        <ProfileSection />
        <ConversationSection />
      </Paper>
    </div>
  );
}
export default Home;
