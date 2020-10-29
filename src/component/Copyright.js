import React from "react";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

//TODO: le margin bottom devrait seuleument etre sur mobile

const Copyright = () => {
  return (
    <Typography
      style={{ marginBottom: "15px" }}
      variant="body2"
      gutterBottom
      color="textSecondary"
      align="center"
    >
      {"Copyright © "}
      <Link to="/">TempReader</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Copyright;
