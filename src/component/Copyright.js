import React from "react";
import Typography from "@material-ui/core/Typography";

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
      <a href="/">SmarterTemp</a> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Copyright;
