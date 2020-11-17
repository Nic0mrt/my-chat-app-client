import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { api } from "../utils/api";
import {
  Typography,
  Button,
  Avatar,
  TextField,
  Container,
  Grid,
} from "@material-ui/core/";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

const useStyles = makeStyles((theme) => ({
  main: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
  },

  signupBox: {
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
  loginLink: {
    float: "right",
  },
}));
const Signup = () => {
  const classes = useStyles();
  const [textFields, setTextFields] = useState({
    name: "",
    firstname: "",
    email: "",
    pseudo: "",
    password: "",
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setTextFields({ ...textFields, [name]: value });
    console.log(textFields);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const data = await api("/users/signup", "POST", textFields);
    console.log(data);
  };

  return (
    <Container className={classes.main} maxWidth="sm">
      <div className={classes.signupBox}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5" className={classes.boxTitle}>
          Créer un compte
        </Typography>
        <form className={classes.form} onSubmit={handleFormSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                className={classes.textfield}
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Nom"
                name="name"
                autoFocus
                onChange={handleChange}
              ></TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className={classes.textfield}
                variant="outlined"
                required
                fullWidth
                id="firstname"
                label="Prénom"
                name="firstname"
                onChange={handleChange}
              ></TextField>
            </Grid>
          </Grid>
          <TextField
            className={classes.textfield}
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            type="email"
            onChange={handleChange}
          ></TextField>
          <TextField
            className={classes.textfield}
            variant="outlined"
            required
            fullWidth
            id="pseudo"
            label="Pseudo"
            name="pseudo"
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
            Créer un compte
          </Button>
          <Link
            style={{ textDecoration: "none" }}
            className={classes.loginLink}
            to="/login"
          >
            Vous avez déjà un compte ? Connectez-vous
          </Link>
        </form>
      </div>
    </Container>
  );
};

export default Signup;
