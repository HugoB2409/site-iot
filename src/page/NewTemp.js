import React, { useState, useEffect } from "react";
import { API, graphqlOperation, Auth } from "aws-amplify";
import { createTodo } from "../graphql/mutations";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

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
  const [users, setUsers] = useState([]);

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
        name: user.Username,
        temperature: tempInfo.temperature,
        sub: tempInfo.sub,
      };
      await API.graphql(graphqlOperation(createTodo, { input: data }));
      setTempInfo(initialState);
    } catch (err) {
      console.log("error creating todo:", err);
    }
  }

  return (
    <div>
      <Typography variant="h2" gutterBottom>
        Température
      </Typography>
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
      </FormControl>
      <TextField
        id="standard-basic"
        label="Temperature"
        variant="outlined"
        fullWidth
        value={tempInfo.temperature}
        className={classes.field}
        onChange={(event) => setInput("temperature", event.target.value)}
      />
      <Button
        variant="contained"
        className={classes.button}
        color="secondary"
        onClick={addTemp}
      >
        Ajouter la température
      </Button>
    </div>
  );
};

export default NewTemp;
