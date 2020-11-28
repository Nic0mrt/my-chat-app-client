import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ProfileBanner from './ProfileBanner/ProfileBanner';
import ProfileFriendsList from './ProfileFriendsList/ProfileFriendsList';

const useStyles = makeStyles(theme => ({
  profileSection: {
    width: '30%',
    display: 'flex',
    flexDirection: 'column',
    borderRight: 'solid 2px #eeeeee',
  },
}));

function ProfileSection(props) {
  const classes = useStyles();
  return (
    <section className={classes.profileSection}>
      <ProfileBanner user={props.user} />
      <ProfileFriendsList />
    </section>
  );
}
export default ProfileSection;
