import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { API, Auth } from "aws-amplify";
import { listTodos } from "../../graphql/queries";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Chart from "../../component/chart";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";

//TODO: UI
//TODO: Combiner les button activer et desactiver en un seul
//TODO: Permettre de pouvoir cliquer sur un element du graphiquee ou une ranger du tableau pour naviguer a la page d'info sur la temperature
//TODO: Faire que le graphique affiche seuleument les 7 dernieres temperature

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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const UserInfo = (props) => {
  const classes = useStyles();
  const [temps, setTemps] = useState([]);
  const [value, setValue] = React.useState(0);
  const [users, setUsers] = useState({});
  const [image, setImage] = useState("");

  useEffect(() => {
    getUser();
    fetchTemps();
  }, []);

  const getUser = async () => {
    let apiName = "AdminQueries";
    let path = "/getUser";
    let username = props.match.params.name;
    let myInit = {
      queryStringParameters: {
        username: username,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `${(await Auth.currentSession())
          .getAccessToken()
          .getJwtToken()}`,
      },
    };
    const data = await API.get(apiName, path, myInit);
    setUsers(data);
  };

  const fetchTemps = async () => {
    try {
      const tempData = await API.graphql({
        query: listTodos,
        variables: { filter: filter },
      });
      const temperatures = tempData.data.listTodos.items;
      console.log(temperatures);
      setTemps(temperatures);
    } catch (err) {
      console.log("error fetching temperature");
    }
  };

  let filter = {
    name: {
      eq: props.match.params.name,
    },
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const enableUser = async () => {
    try {
      let apiName = "AdminQueries";
      let path = "/enableUser";
      let myInit = {
        body: {
          username: users.Username,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `${(await Auth.currentSession())
            .getAccessToken()
            .getJwtToken()}`,
        },
      };

      const data = await API.post(apiName, path, myInit);
    } catch (err) {
      console.log("error creating todo:", err);
    }
  };

  const disableUser = async () => {
    try {
      let apiName = "AdminQueries";
      let path = "/disableUser";
      let myInit = {
        body: {
          username: users.Username,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `${(await Auth.currentSession())
            .getAccessToken()
            .getJwtToken()}`,
        },
      };

      const data = await API.post(apiName, path, myInit);
    } catch (err) {
      console.log("error creating todo:", err);
    }
  };

  return (
    <div>
      {users.Username ? (
        <div>
          <Typography variant="h4" className={classes.title}>
            {users.Username}
          </Typography>
          <Divider />

          <div className={classes.accordion}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>
                  Informations
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  variant="h6"
                  className={classes.title}
                  key={value.Name}
                >
                  Status: {users.UserStatus}
                </Typography>
                <Typography
                  variant="h6"
                  className={classes.title}
                  key={value.Name}
                >
                  Date creer: {users.UserCreateDate}
                </Typography>
                <Typography
                  variant="h6"
                  className={classes.title}
                  key={value.Name}
                >
                  Active: {users.Enabled}
                </Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography className={classes.heading}>
                  Informations supplémentaires
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {users.UserAttributes !== undefined ? (
                  users.UserAttributes.map((value) => (
                    <Typography
                      variant="h6"
                      className={classes.title}
                      key={value.Name}
                    >
                      {value.Name}: {value.Value}
                    </Typography>
                  ))
                ) : (
                  <h4>nothing</h4>
                )}
              </AccordionDetails>
            </Accordion>
          </div>
          <Button
            variant="outlined"
            color="primary"
            onClick={enableUser}
            className={classes.button}
          >
            Activer
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={disableUser}
            className={classes.button}
          >
            Desactiver
          </Button>

          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="simple tabs example"
              centered
            >
              <Tab label="Graphique" {...a11yProps(0)} />
              <Tab label="Tableau" {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <Chart data={temps} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Nom</TableCell>
                    <TableCell align="right">Temperature(°C)</TableCell>
                    <TableCell align="right">Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {temps.map((row) => (
                    <TableRow key={row.id} hover>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.temperature}</TableCell>
                      <TableCell align="right">{row.createdAt}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
        </div>
      ) : (
        <h1>loading...</h1>
      )}
    </div>
  );
};

export default UserInfo;
