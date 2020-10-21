import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { API, graphqlOperation } from "aws-amplify";
import { listTodos } from "../graphql/queries";
import NavigationBar from "./NavigationBar";
import ListTemp from "./ListTemp";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

//TODO: UI
//TODO: Boutton pour ajouter un user
//TODO: Update la liste en temps reel

const useStyles = makeStyles({
  table: {
    marginTop: 10,
  },
  button: {
    float: "right",
    margin: 20,
  },
  title: {
    marginTop: 30,
  },
});

const Accueil = () => {
  const classes = useStyles();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    try {
      const todoData = await API.graphql(graphqlOperation(listTodos));
      const todos = todoData.data.listTodos.items;
      setTodos(todos);
    } catch (err) {
      console.log("error fetching todos");
    }
  }

  return (
    <div>
      <NavigationBar />
      <CssBaseline />
      <Link to="/newTemp">
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          Ajouter une temperature manuellement
        </Button>
      </Link>
      <Container>
        <Typography variant="h4" className={classes.title}>
          Lecture des temperature en temps reel
        </Typography>

        <div className={classes.table}>
          <ListTemp data={todos} />
        </div>
      </Container>
    </div>
  );
};

export default Accueil;
