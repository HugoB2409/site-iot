import React, { useEffect, useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import { API, graphqlOperation } from "aws-amplify";
import { listTodos } from "../graphql/queries";
import ListTemp from "../component/ListTemp";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import * as subscriptions from "../graphql/subscriptions";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import AddIcon from "@material-ui/icons/Add";
import FilterListIcon from "@material-ui/icons/FilterList";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import _, { debounce } from "lodash";

//TODO: UI

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

const Accueil = () => {
  const classes = useStyles();
  const [temps, setTemps] = useState([]);

  useEffect(() => {
    fetchTodos();
    const subscription = API.graphql(
      graphqlOperation(subscriptions.onCreateTodo)
    ).subscribe({
      next: (tempData) => {
        console.log(tempData.value.data.onCreateTodo);
        if (tempData.value.data.onCreateTodo != null) {
          setTemps((temps) => [tempData.value.data.onCreateTodo, ...temps]);
        }
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

  const onChange = (e) => {
    const value = e.target.value;
    handleFilter(value);
  };

  const handleFilter = debounce((val) => {
    searchTodos(val);
  }, 250);

  const searchTodos = async (val) => {
    try {
      const data = await API.graphql({
        query: listTodos,
        variables: {
          filter: {
            name: {
              contains: val,
            },
          },
        },
      });
      setTemps(data.data.listTodos.items);
    } catch (err) {
      console.log("error fetching todos");
    }
  };

  return (
    <div>
      <Typography variant="h4" className={classes.title}>
        Temperatures
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
        <Link to="/newTemp">
          <Tooltip title="Ajouter temperature">
            <IconButton color="secondary" className={classes.iconButton}>
              <AddIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        </Link>
      </div>
      <div className={classes.table}>
        <ListTemp data={temps} />
      </div>
    </div>
  );
};

export default Accueil;
