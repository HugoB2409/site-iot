import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import { API } from "aws-amplify";
import { listTodos } from "../graphql/queries";
import { useHistory } from "react-router-dom";

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

const Warning = () => {
  const classes = useStyles();
  const [temps, setTemps] = useState([]);
  let history = useHistory();

  useEffect(() => {
    fetchTodos();
  }, []);

  let filter = {
    temperature: {
      gt: 38,
    },
  };

  const fetchTodos = async () => {
    try {
      const data = await API.graphql({
        query: listTodos,
        variables: { filter: filter },
      });
      setTemps(data.data.listTodos.items);
    } catch (err) {
      console.log("error fetching todos");
    }
  };

  const handleClick = (name) => {
    history.push(`/user/${name}`);
  };

  return (
    <div>
      <Typography variant="h4" className={classes.title}>
        Cas suspect
      </Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Nom</b>
              </TableCell>
              <TableCell align="right">
                <b>Temperature(°C)</b>
              </TableCell>
              <TableCell align="right">
                <b>Date prise</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {temps.map((row) => (
              <TableRow
                key={row.id}
                hover
                onClick={() => handleClick(row.name)}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.temperature}</TableCell>
                <TableCell align="right">{row.createdAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Warning;
