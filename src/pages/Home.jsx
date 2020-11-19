import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/context";
import { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Avatar, Typography } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import ProfileSection from "../components/Home/ProfileSection/ProfileSection";

const useStyles = makeStyles((theme) => ({
  main: {
    height: "100vh",
    padding: "25px 0",
  },
  container: {
    margin: "0 auto",
    width: "90%",
    height: "100%",
    display: "flex",
    border: "solid 1px #d9d9d9",
  },

  profileSection: {
    width: "30%",
    display: "flex",
    flexDirection: "column",
    border: "solid 1px #d9d9d9",
  },
  profileSectionBanner: {
    height: "80px",
    padding: "10px 16px",
    boxShadow: "0px 3px 1px -1px rgba(217,217,217,1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },

  avatar: {
    height: "50px",
    width: "50px",
    backgroundColor: theme.palette.primary.main,
    marginRight: theme.spacing(2),
  },

  conversationSection: {
    flexGrow: "1",
  },
  conversationSectionBanner: {
    height: "80px",
    padding: "10px 16px",
    boxShadow: "0px 3px 1px -1px rgba(217,217,217,1)",
  },
}));

function Home() {
  const history = useHistory();
  const { userData } = useContext(AuthContext);
  const classes = useStyles();

  useEffect(() => {
    const checkIfUser = async () => {
      console.log("check if user");
      if (Object.keys(userData.user).length === 0) {
        history.push("/login");
      }
    };

    checkIfUser();
  }, []);

  return (
    <div className={classes.main}>
      <div className={classes.container}>
        <ProfileSection user={userData.user} />
        <section className={classes.conversationSection}>
          <div className={classes.conversationSectionBanner}></div>
        </section>
      </div>
    </div>
  );
}
export default Home;
