import React, { useEffect, useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import { API } from "aws-amplify";
import { listTodos } from "../graphql/queries";
import NavigationBar from "./NavigationBar";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

//TODO: UI
//TODO: Ajouter graphique pour voir l'historique du user

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const UserInfo = (props) => {
  const [todos, setTodos] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    fetchTodos();
  }, []);

  let filter = {
    sub: {
      eq: props.match.params.sub,
    },
  };

  const fetchTodos = async () => {
    try {
      const todoData = await API.graphql({
        query: listTodos,
        variables: { filter: filter },
      });
      const todos = todoData.data.listTodos.items;
      setTodos(todos);
      console.log(todos);
    } catch (err) {
      console.log("error fetching todos");
    }
  };

  return (
    <div>
      <NavigationBar />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nom</TableCell>
              <TableCell align="right">Temperature</TableCell>
              <TableCell align="right">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos.map((row) => (
              <TableRow key={row.name} hover>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.temperature}</TableCell>
                <TableCell align="right">{row.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UserInfo;
