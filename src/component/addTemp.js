import React, { useState } from "react";
import NavBar from "./NavigationBar";
import { API, graphqlOperation } from "aws-amplify";
import { createTodo } from "../graphql/mutations";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

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

const initialState = { name: "", temperature: "", sub: "" };

const AddTemp = () => {
  const [formState, setFormState] = useState(initialState);
  const classes = useStyles();

  function setInput(key, value) {
    setFormState({ ...formState, [key]: value });
  }

  async function addTodo() {
    try {
      if (!formState.name || !formState.temperature || !formState.sub) return;
      const todo = { ...formState };
      setFormState(initialState);
      await API.graphql(graphqlOperation(createTodo, { input: todo }));
    } catch (err) {
      console.log("error creating todo:", err);
    }
  }

  return (
    <div>
      <NavBar />
      <Container>
        <Typography variant="h2" gutterBottom>
          Température
        </Typography>
        <TextField
          id="standard-basic"
          label="Nom"
          variant="outlined"
          fullWidth
          value={formState.name}
          className={classes.field}
          onChange={(event) => setInput("name", event.target.value)}
        />
        <TextField
          id="standard-basic"
          label="Temperature"
          variant="outlined"
          fullWidth
          value={formState.temperature}
          className={classes.field}
          onChange={(event) => setInput("temperature", event.target.value)}
        />
        <TextField
          id="standard-basic"
          label="Id"
          variant="outlined"
          fullWidth
          value={formState.sub}
          className={classes.field}
          onChange={(event) => setInput("sub", event.target.value)}
        />
        <Button
          variant="contained"
          className={classes.button}
          color="secondary"
          onClick={addTodo}
        >
          Ajouter la température
        </Button>
        <Typography variant="h5" gutterBottom className={classes.helper}>
          Id de l'utilisateur test: 8febc9ba-69b3-4ce0-94ce-6652b5ece18a
        </Typography>
      </Container>
    </div>
  );
};

export default AddTemp;
