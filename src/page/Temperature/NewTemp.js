import React, { useState, useEffect } from "react";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { createTemperature } from "../../graphql/mutations";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

//TODO: Ajouter validations et message d'erreurs
//TODO: Changer l'information dans le pop-up
//TODO: Apres avoir creer la temperature, rediriger vers la page d'accueil

const useStyles = makeStyles({
  title: {
    marginTop: 10,
  },
  field: {
    marginTop: 30,
  },
  button: {
    marginRight: 20,
  },
  helper: {
    margin: 50,
  },
  test: {
    display: "flex",
    alignItems: "center",
    marginTop: 20,
  },
  grow: {
    flexGrow: 1,
  },
  link: {
    textDecoration: "none",
  },
});

const NewTemp = () => {
  const classes = useStyles();
  const initialState = { name: "", temperature: "", sub: "" };
  const [tempInfo, setTempInfo] = useState(initialState);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    let apiName = "AdminQueries";
    let path = "/listUsers";
    let myInit = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${(await Auth.currentSession())
          .getAccessToken()
          .getJwtToken()}`,
      },
    };
    const data = await API.get(apiName, path, myInit);
    setUsers(data.Users);
  };

  function setInput(key, value) {
    setTempInfo({ ...tempInfo, [key]: value });
  }

  async function addTemp() {
    try {
      if (!tempInfo.temperature || !tempInfo.sub) return;
      const user = users.find(
        (user) => user.Attributes[0].Value === tempInfo.sub
      );
      const data = {
        type: "Temperature",
        name: user.Username,
        temperature: tempInfo.temperature,
        sub: tempInfo.sub,
      };
      await API.graphql(graphqlOperation(createTemperature, { input: data }));
      setTempInfo(initialState);
    } catch (err) {
      console.log("error creating todo:", err);
    }
  }

  return (
    <div>
      <Typography variant="h4" className={classes.title}>
        Ajoutée une température
      </Typography>
      <Divider />
      <FormControl fullWidth variant="outlined" className={classes.field}>
        <InputLabel id="demo-simple-select-label">Nom</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          label="Nom"
          id="demo-simple-select"
          value={tempInfo.user}
          onChange={(event) => {
            setInput("sub", event.target.value);
          }}
        >
          {users.map((row) => (
            <MenuItem key={row.Username} value={row.Attributes[0].Value}>
              {row.Username}
            </MenuItem>
          ))}
        </Select>

        <div className={classes.test}>
          <TextField
            id="standard-basic"
            type="number"
            label="Température corporelle(°C)"
            variant="outlined"
            fullWidth
            className={classes.button}
            onChange={(event) => {
              setInput("temperature", event.target.value);
            }}
          />
          <TextField
            id="standard-basic"
            type="number"
            label="Température ambiante(°C)"
            variant="outlined"
            fullWidth
          />
        </div>
        <div className={classes.test}>
          <Link to="/" className={classes.link}>
            <Button variant="contained" className={classes.button}>
              Retour
            </Button>
          </Link>
          <div className={classes.grow} />
          <Button variant="contained" color="secondary" onClick={addTemp}>
            Ajouter la température
          </Button>
        </div>
      </FormControl>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Utilisateur ajouter avec succès."}
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Le id du nouveau user est : <br />
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

export default NewTemp;
