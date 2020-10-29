import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  title: {
    marginTop: 30,
  },
});

const Parameter = () => {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="h4" className={classes.title}>
        Parametres
      </Typography>
    </div>
  );
};

export default Parameter;
