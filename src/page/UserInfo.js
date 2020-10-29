import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { API } from "aws-amplify";
import { listTodos } from "../graphql/queries";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

//TODO: UI
//TODO: Ajouter graphique pour voir l'historique du user

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  title: {
    marginTop: 30,
  },
});

const UserInfo = (props) => {
  const [temps, setTemps] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    fetchTemps();
  }, []);

  let filter = {
    sub: {
      eq: props.match.params.sub,
    },
  };

  const fetchTemps = async () => {
    try {
      const tempData = await API.graphql({
        query: listTodos,
        variables: { filter: filter },
      });
      const temperatures = tempData.data.listTodos.items;
      setTemps(temperatures);
    } catch (err) {
      console.log("error fetching temperature");
    }
  };

  return (
    <div>
      <Typography variant="h4" className={classes.title}>
        Information supplementaires
      </Typography>
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
            {temps.map((row) => (
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
