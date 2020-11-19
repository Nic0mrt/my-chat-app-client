import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Typography } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import { AuthContext } from "../../../../context/context";

const useStyles = makeStyles((theme) => ({
  profileSectionBanner: {
    height: "80px",
    width: "100%",
    padding: "10px 16px",
    boxShadow: "0px 3px 1px -1px rgba(217,217,217,1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  left: { display: "flex" },
  right: { display: "flex" },
  avatar: {
    height: "50px",
    width: "50px",
    backgroundColor: theme.palette.primary.main,
    marginRight: theme.spacing(2),
  },
  typography: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  settingsIcon: {
    cursor: "pointer",
  },
}));

const ProfileBanner = (props) => {
  const { userData } = useContext(AuthContext);
  const classes = useStyles();
  return (
    <div className={classes.profileSectionBanner}>
      <div className={classes.left}>
        <Avatar className={classes.avatar}></Avatar>
        <Typography className={classes.typography}>
          {props.user.firstname}
        </Typography>
      </div>
      <div className={classes.right}>
        <SettingsIcon
          className={classes.settingsIcon}
          color="secondary"
          fontSize="large"
        />
      </div>
    </div>
  );
};
export default ProfileBanner;
