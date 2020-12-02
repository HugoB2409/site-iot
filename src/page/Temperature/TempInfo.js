import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { API, graphqlOperation, Storage } from "aws-amplify";
import * as queries from "../../graphql/queries";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

//TODO: UI

const useStyles = makeStyles({
  title: {
    marginTop: 10,
  },
  accordion: {
    marginTop: 35,
    marginBottom: 35,
  },
  button: {
    margin: 15,
  },
});

const TempInfo = (props) => {
  let id = props.match.params.id;
  const [temp, setTemp] = useState({});
  const [image, setImage] = useState("");
  const classes = useStyles();
  let history = useHistory();

  useEffect(() => {
    fetchTemps();
  }, []);

  const handleClick = (name) => {
    history.push(`/user/${name}`);
  };

  const fetchTemps = async () => {
    console.log(id);
    try {
      const tempData = await API.graphql(
        graphqlOperation(queries.getTodo, { id: id })
      );
      console.log(tempData.data.getTodo);

      if (tempData.data.getTodo.url !== undefined) {
        Storage.get(tempData.data.getTodo.url).then((value) => {
          console.log(value);

          setImage(value);
        });
      }
      setTemp(tempData.data.getTodo);
    } catch (err) {
      console.log("error fetching temperature");
    }
  };
  return (
    <div>
      {!temp.Name ? (
        <div>
          <Typography variant="h4" className={classes.title}>
            Info
          </Typography>
          <Divider />
          <Typography variant="h5" className={classes.title}>
            {temp.name}
          </Typography>
          <Typography variant="h5" className={classes.title}>
            {temp.temperature}
          </Typography>
          <Typography variant="h5" className={classes.title}>
            {temp.createdAt}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleClick(temp.name)}
          >
            Profil
          </Button>

          <img src={image} width="500" alt="temp" />
        </div>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
};

export default TempInfo;
