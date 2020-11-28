import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';

const SendMessageDialog = props => {
  const [open, setOpen] = useState(false);
  const [contactSelected, setContactSelected] = useState({});
  const { onClose } = props;

  const handleClose = () => {
    onClose(contactSelected);
  };
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle id="send-message-dialog">Contacts</DialogTitle>
    </Dialog>
  );
};

export default SendMessageDialog;
