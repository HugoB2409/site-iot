import React, { useEffect, useState } from "react";
import ListUser from "../component/ListUser";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { API, Auth } from "aws-amplify";
import { Link } from "react-router-dom";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import AddIcon from "@material-ui/icons/Add";
import FilterListIcon from "@material-ui/icons/FilterList";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: 10,
  },
  button: {
    float: "right",
    margin: 20,
  },
  title: {
    marginTop: 10,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.black, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.black, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "40%",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "40ch",
    },
  },
  test: { display: "flex", alignItems: "center", marginTop: 20 },
  grow: {
    flexGrow: 1,
  },
  iconButton: {},
}));

const User = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [filterUsers, setFilterUsers] = useState([]);

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
    setFilterUsers(data.Users);
  };

  const onChange = (e) => {
    const value = e.target.value;
    let array = users.filter((o) =>
      o.Username.toLowerCase().includes(value.toLowerCase())
    );
    setFilterUsers(array);
  };

  return (
    <div>
      <Typography variant="h4" className={classes.title}>
        Utilisateurs
      </Typography>
      <Divider />
      <div className={classes.test}>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
            onChange={onChange}
            inputProps={{ "aria-label": "search" }}
          />
        </div>
        <div className={classes.grow} />
        <Tooltip title="Filtrer">
          <IconButton aria-label="filter list" className={classes.iconButton}>
            <FilterListIcon fontSize="large" />
          </IconButton>
        </Tooltip>
        <Link to="/newUser">
          <Tooltip title="Ajouter utilisateur">
            <IconButton color="secondary" className={classes.iconButton}>
              <AddIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        </Link>
      </div>
      <ListUser data={filterUsers} />
    </div>
  );
};

export default User;
