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

const useStyles = makeStyles({
  table: {
    minWidth: 260,
  },
});

const ListUser = (props) => {
  let history = useHistory();
  const classes = useStyles();
  const rows = props.data;
  console.log(rows[0]);

  const handleClick = (sub) => {
    history.push(`/user/${sub}`);
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
              <b>Date de creation</b>
            </TableCell>
            <TableCell align="right">
              <b>Status</b>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.Username}
              hover
              onClick={() => handleClick(row.Attributes[0].Value)}
            >
              <TableCell component="th" scope="row">
                {row.Username}
              </TableCell>
              <TableCell align="right">{row.UserCreateDate}</TableCell>
              <TableCell align="right">{row.UserStatus}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListUser;
