import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { fade, makeStyles } from "@material-ui/core/styles";
import { API } from "aws-amplify";
import { listTodos } from "../graphql/queries";
import { useHistory } from "react-router-dom";
import ListWaring from "../component/ListWarning";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import AddIcon from "@material-ui/icons/Add";
import FilterListIcon from "@material-ui/icons/FilterList";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import { Link } from "react-router-dom";
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
        Temperatures suspectes
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
            inputProps={{ "aria-label": "search" }}
          />
        </div>
        <div className={classes.grow} />
        <Tooltip title="Filtrer">
          <IconButton aria-label="filter list" className={classes.iconButton}>
            <FilterListIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      </div>

      <ListWaring data={temps} />
    </div>
  );
};

export default Warning;
