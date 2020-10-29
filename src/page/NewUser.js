import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { API, Auth } from "aws-amplify";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  button: {
    float: "right",
  },
  field: {
    margin: 20,
  },
  helper: {
    margin: 50,
  },
});

const NewUser = () => {
  const classes = useStyles();
  const initialState = { username: "", email: "", password: "" };
  const [userInfo, setUserInfo] = useState(initialState);

  function setInput(key, value) {
    setUserInfo({ ...userInfo, [key]: value });
  }

  const addUser = async () => {
    try {
      if (!userInfo.username || !userInfo.email || !userInfo.password) return;
      const username = userInfo.username;
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
      console.log(data);
      setUserInfo(initialState);
    } catch (err) {
      console.log("error creating todo:", err);
    }
  };

  return (
    <div>
      <Typography variant="h2" gutterBottom>
        Nouveau utilisateur
      </Typography>
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
      <Button
        variant="contained"
        className={classes.button}
        color="secondary"
        onClick={addUser}
      >
        Ajouter l'utilisateur
      </Button>
    </div>
  );
};

export default NewUser;
