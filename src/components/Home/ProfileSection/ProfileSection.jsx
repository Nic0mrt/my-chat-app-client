import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ProfileBanner from "./ProfileBanner/ProfileBanner";

const useStyles = makeStyles((theme) => ({
  profileSection: {
    height: "100%",
    width: "30%",
    display: "flex",
    flexDirection: "column",
    border: "solid 1px #d9d9d9",
  },
}));

function ProfileSection(props) {
  const classes = useStyles();
  return (
    <div className={classes.profileSection}>
      <ProfileBanner user={props.user} />
    </div>
  );
}
export default ProfileSection;
