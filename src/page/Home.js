import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { API, graphqlOperation } from "aws-amplify";
import { listTodos } from "../graphql/queries";
import ListTemp from "../component/ListTemp";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import * as subscriptions from "../graphql/subscriptions";

//TODO: UI

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
  const [temps, setTemps] = useState([]);

  useEffect(() => {
    fetchTodos();
    const subscription = API.graphql(
      graphqlOperation(subscriptions.onCreateTodo)
    ).subscribe({
      next: (tempData) => {
        setTemps((temps) => [tempData.value.data.onCreateTodo, ...temps]);
      },
    });
  }, []);

  const fetchTodos = async () => {
    try {
      const data = await API.graphql(graphqlOperation(listTodos));
      setTemps(data.data.listTodos.items);
    } catch (err) {
      console.log("error fetching todos");
    }
  };

  return (
    <div>
      <Link to="/newTemp">
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          Ajouter une temperature manuellement
        </Button>
      </Link>
      <Typography variant="h4" className={classes.title}>
        Lecture des temperature en temps reel
      </Typography>
      <Divider />
      <div className={classes.table}>
        <ListTemp data={temps} />
      </div>
    </div>
  );
};

export default Accueil;
