import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { useHistory } from "react-router-dom";

//TODO: Ajouter la pagination
//TODO: Ajouter des filtre

const useStyles = makeStyles({
  table: {
    minWidth: 260,
  },
});

const ListTemp = (props) => {
  let history = useHistory();
  const classes = useStyles();
  const rows = props.data;

  const handleClick = (name) => {
    history.push(`/user/${name}`);
  };

  return (
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
          {rows.map((row) => (
            <TableRow key={row.id} hover onClick={() => handleClick(row.name)}>
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
  );
};

export default ListTemp;
