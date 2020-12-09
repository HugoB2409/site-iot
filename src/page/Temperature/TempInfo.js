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
  maintitle: {
    marginTop: 10,
    flexGrow: 1,
  },
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
  test: {
    display: "flex",
    alignItems: "center",
    marginTop: 20,
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
        graphqlOperation(queries.getTemperature, { id: id })
      );
      console.log(tempData.data.getTemperature);

      if (tempData.data.getTemperature.url !== undefined) {
        Storage.get(tempData.data.getTemperature.url).then((value) => {
          console.log(value);

          setImage(value);
        });
      }
      setTemp(tempData.data.getTemperature);
    } catch (err) {
      console.log("error fetching temperature");
    }
  };
  return (
    <div>
      {!temp.Name ? (
        <div>
          <div className={classes.test}>
            <Typography variant="h4" className={classes.maintitle}>
              {temp.name}
            </Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => handleClick(temp.name)}
            >
              Voir profil
            </Button>
          </div>
          <Divider />
          <Typography variant="h5" className={classes.title}>
            Température: {temp.temperature}
          </Typography>
          <Typography variant="h5" className={classes.title}>
            Date: {temp.createdAt}
          </Typography>
          <div className={classes.test}>
            <Typography variant="h5" className={classes.title}>
              Photo:
            </Typography>
            <img src={image} width="400" alt="temp" />
          </div>
        </div>
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
};

export default TempInfo;
