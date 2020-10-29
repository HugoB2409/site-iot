import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { API, graphqlOperation } from "aws-amplify";
import { listTodos } from "../graphql/queries";
import ListTemp from "../component/ListTemp";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";

//TODO: UI
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
  const [temps, setTemps] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const data = await API.graphql(graphqlOperation(listTodos));
      const temperatures = data.data.listTodos.items;
      setTemps(temperatures);
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

      <div className={classes.table}>
        <ListTemp data={temps} />
      </div>
    </div>
  );
};

export default Accueil;
