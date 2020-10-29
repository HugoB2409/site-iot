import React, { useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { createTodo } from "../graphql/mutations";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

//TODO: Liste deroulante pour selectionner a qu'elle user on veut ajouter une temperature

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

const NewTemp = () => {
  const classes = useStyles();
  const initialState = { name: "", temperature: "", sub: "" };
  const [tempInfo, setTempInfo] = useState(initialState);

  function setInput(key, value) {
    setTempInfo({ ...tempInfo, [key]: value });
  }

  async function addTemp() {
    try {
      if (!tempInfo.name || !tempInfo.temperature || !tempInfo.sub) return;
      const data = { ...tempInfo };
      setTempInfo(initialState);
      await API.graphql(graphqlOperation(createTodo, { input: data }));
    } catch (err) {
      console.log("error creating todo:", err);
    }
  }

  return (
    <div>
      <Typography variant="h2" gutterBottom>
        Température
      </Typography>
      <TextField
        id="standard-basic"
        label="Nom"
        variant="outlined"
        fullWidth
        value={tempInfo.name}
        className={classes.field}
        onChange={(event) => setInput("name", event.target.value)}
      />
      <TextField
        id="standard-basic"
        label="Temperature"
        variant="outlined"
        fullWidth
        value={tempInfo.temperature}
        className={classes.field}
        onChange={(event) => setInput("temperature", event.target.value)}
      />
      <TextField
        id="standard-basic"
        label="Id"
        variant="outlined"
        fullWidth
        value={tempInfo.sub}
        className={classes.field}
        onChange={(event) => setInput("sub", event.target.value)}
      />
      <Button
        variant="contained"
        className={classes.button}
        color="secondary"
        onClick={addTemp}
      >
        Ajouter la température
      </Button>
      <Typography variant="h5" gutterBottom className={classes.helper}>
        Id de l'utilisateur test: 8febc9ba-69b3-4ce0-94ce-6652b5ece18a
      </Typography>
    </div>
  );
};

export default NewTemp;
