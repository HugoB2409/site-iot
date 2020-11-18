import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import PeopleIcon from "@material-ui/icons/People";
import WarningIcon from "@material-ui/icons/Warning";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Auth } from "aws-amplify";
import { fade, makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  customizeToolbar: {
    minHeight: 72,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    flexGrow: 1,
    textDecoration: "none",
    color: fade(theme.palette.common.white, 1),
    "&:hover": {
      color: fade(theme.palette.common.white, 0.8),
    },
  },
}));

const NavigationBar = () => {
  let history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickParam = () => {
    history.push(`/parameter`);
  };

  const handleClickUser = () => {
    history.push(`/User`);
  };

  const handleClickWarning = () => {
    history.push(`/warning`);
  };

  const signOut = async () => {
    try {
      await Auth.signOut({ global: true });
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };

  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar className={classes.customizeToolbar}>
          <Link to="/" className={classes.link}>
            <Typography variant="h4" className={classes.title}>
              TempReader
            </Typography>
          </Link>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleClickUser}
              color="inherit"
            >
              <PeopleIcon fontSize="large" />
            </IconButton>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleClickWarning}
              color="inherit"
            >
              <WarningIcon fontSize="large" />
            </IconButton>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle fontSize="large" />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClickParam}>Parametres</MenuItem>
              <MenuItem onClick={signOut}>Deconnexion</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default NavigationBar;
