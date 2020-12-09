import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { API, Auth } from "aws-amplify";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

//TODO: Ajouter validations et message d'erreurs

const useStyles = makeStyles({
  button: {
    float: "right",
  },
  field: {
    marginTop: 20,
  },
  test: { display: "flex", alignItems: "center", marginTop: 20 },
  grow: {
    flexGrow: 1,
  },
  title: {
    marginTop: 10,
  },
});

const NewUser = () => {
  let history = useHistory();
  const classes = useStyles();
  const initialState = { username: "", email: "", password: "" };
  const [sub, setSub] = React.useState(0);
  const [userInfo, setUserInfo] = useState(initialState);
  const [open, setOpen] = React.useState(false);

  function setInput(key, value) {
    setUserInfo({ ...userInfo, [key]: value });
  }

  const handleClose = () => {
    setOpen(false);
    setUserInfo(initialState);
    history.push(`/User`);
  };

  const addUser = async () => {
    try {
      if (!userInfo.username || !userInfo.email || !userInfo.password) return;
      const username = userInfo.username.split(" ").join("_");
      const password = userInfo.password;
      const email = userInfo.email;

      let apiName = "AdminQueries";
      let path = "/createUser";
      let myInit = {
        body: {
          username: username,
          password: password,
          email: email,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `${(await Auth.currentSession())
            .getAccessToken()
            .getJwtToken()}`,
        },
      };

      const data = await API.post(apiName, path, myInit);
      setSub(data.User.Attributes[0].Value);
      setOpen(true);
    } catch (err) {
      console.log("error creating todo:", err);
    }
  };

  return (
    <div>
      <Typography variant="h4" className={classes.title}>
        Ajoutée un utilisateur
      </Typography>
      <Divider />
      <TextField
        id="standard-basic"
        label="Nom"
        variant="outlined"
        fullWidth
        value={userInfo.username}
        className={classes.field}
        onChange={(event) => setInput("username", event.target.value)}
      />
      <TextField
        id="standard-basic"
        label="Email"
        variant="outlined"
        fullWidth
        value={userInfo.email}
        className={classes.field}
        onChange={(event) => setInput("email", event.target.value)}
      />
      <TextField
        id="standard-basic"
        label="Mot de passe temporaire"
        variant="outlined"
        fullWidth
        value={userInfo.password}
        className={classes.field}
        onChange={(event) => setInput("password", event.target.value)}
      />
      <div className={classes.test}>
        <Link to="/User" className={classes.link}>
          <Button variant="contained" className={classes.button}>
            Retour
          </Button>
        </Link>
        <div className={classes.grow} />
        <Button
          variant="contained"
          className={classes.button}
          color="secondary"
          onClick={addUser}
        >
          Ajouter l'utilisateur
        </Button>
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          {"Utilisateur ajouter avec succès."}
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Veulliez enregistrer la puce au nom de : <b>{userInfo.username}</b> <br /><br />
            Si nécessaire, envoyer un email a <b>{userInfo.email}</b> avec le mot de passe temporaire <b>{userInfo.password}</b>{" "}
            pour qu'il puisse se connecter a l'application mobile SmarterTemp.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Terminer
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NewUser;
