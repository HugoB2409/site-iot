import React, { useEffect, useState } from "react";
import ListUser from "../component/ListUser";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { API, Auth } from "aws-amplify";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

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

const User = () => {
  const classes = useStyles();
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

  return (
    <div>
      <Link to="/newUser">
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
        >
          Ajouter un utilisateur
        </Button>
      </Link>
      <Typography variant="h4" className={classes.title}>
        Liste des utilisateurs
      </Typography>
      <ListUser data={users} />
    </div>
  );
};

export default User;
