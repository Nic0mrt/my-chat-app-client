import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";
import {
  Snackbar,
  Typography,
  Button,
  Avatar,
  TextField,
  Container,
} from "@material-ui/core/";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { api } from "../utils/api";
import { AuthContext } from "../context/context";

const useStyles = makeStyles((theme) => ({
  main: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
  },

  loginBox: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(5),
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    alignSelf: "center",
    marginBottom: theme.spacing(3),
  },

  boxTitle: {
    textAlign: "center",
  },

  form: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  textfield: {
    marginBottom: theme.spacing(3),
    width: "100%",
  },
  submit: {
    marginBottom: theme.spacing(1),
  },
  signupLink: {
    float: "right",
  },
}));

const Login = () => {
  const classes = useStyles();
  const [textFields, setTextFields] = useState({
    pseudo: "",
    password: "",
  });
  const [isAlertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setalertMessage] = useState("");
  const history = useHistory();
  const context = useContext(AuthContext);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setTextFields({ ...textFields, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("submit", textFields);
    const data = await api("/users/login", "POST", textFields);
    if (data.success) {
      context.setUserData({ user: data.user });
      history.push("/");
    } else {
      setalertMessage(data.error);
      setAlertOpen(true);
    }
  };

  return (
    <Container className={classes.main} maxWidth="sm">
      <div className={classes.loginBox}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5" className={classes.boxTitle}>
          Se connecter
        </Typography>
        <form className={classes.form} onSubmit={handleFormSubmit}>
          <TextField
            className={classes.textfield}
            variant="outlined"
            required
            fullWidth
            id="pseudo"
            label="Pseudo"
            name="pseudo"
            autoFocus
            onChange={handleChange}
          ></TextField>
          <TextField
            className={classes.textfield}
            variant="outlined"
            required
            fullWidth
            id="password"
            label="Mot de passe"
            name="password"
            type="password"
            onChange={handleChange}
          ></TextField>
          <Button
            className={classes.submit}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Se connecter
          </Button>
          <Link
            style={{ textDecoration: "none" }}
            className={classes.signupLink}
            to="/signup"
          >
            Pas de compte ? Enregistrez-vous
          </Link>
        </form>
      </div>
      <Snackbar
        open={isAlertOpen}
        autoHideDuration={5000}
        onClose={() => setAlertOpen(false)}
      >
        <Alert severity="error">{alertMessage}</Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;
