import React from "react";
import Typography from "@material-ui/core/Typography";
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

const Warning = () => {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h4" className={classes.title}>
        Cas suspect
      </Typography>
    </div>
  );
};

export default Warning;
