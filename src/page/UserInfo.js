import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { API } from "aws-amplify";
import { listTodos } from "../graphql/queries";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Chart from "../component/chart";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

//TODO: UI
//TODO: Ajouter info sur user
//TODO: Ajouter graphique pour voir l'historique du user

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  title: {
    marginTop: 30,
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
  const [temps, setTemps] = useState([]);
  const classes = useStyles();
  var test = [];
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    fetchTemps();
  }, []);

  const fetchTemps = async () => {
    try {
      const tempData = await API.graphql({
        query: listTodos,
        variables: { filter: filter },
      });
      const temperatures = tempData.data.listTodos.items;
      setTemps(temperatures);
    } catch (err) {
      console.log("error fetching temperature");
    }
  };

  let filter = {
    sub: {
      eq: props.match.params.sub,
    },
  };

  return (
    <div>
      <Typography variant="h4" className={classes.title}>
        Information supplementaires
      </Typography>
      <Typography variant="h6" className={classes.title}>
        Nom: Hugo Belanger
      </Typography>
      <Typography variant="h6" className={classes.title}>
        Email: hugo@gmail.com
      </Typography>

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
        <Typography variant="h5" className={classes.title}>
          Historique
        </Typography>
        <Chart data={temps} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography variant="h5" className={classes.title}>
          Historique
        </Typography>
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
  );
};

export default UserInfo;
