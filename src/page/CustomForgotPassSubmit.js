import React, { useState } from "react";
import { Auth } from "aws-amplify";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link href="/">TempReader</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

//TODO: Ajouter message d'erreur

const CustomForgotPass = (props) => {
  console.log(props);
  const { authState, onStateChange } = props;
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    code: "",
  });
  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const signInClick = async () => {
    try {
      if (formData.password === formData.confirmPassword) {
        await Auth.forgotPasswordSubmit(formData.code, formData.password);
        onStateChange("signIn");
      } else {
        setFormData({
          ...formData,
          password: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {" "}
      <div>
        {props.authState === "forgotPasswordSubmit" ? (
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div
              style={{
                marginTop: "50%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar style={{ margin: 10, backgroundColor: "red" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Entrer le code reçu par courriel
              </Typography>
              <form
                noValidate
                style={{
                  width: "100%",
                  marginTop: 10,
                }}
              >
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  label="Code"
                  name="code"
                  id="code"
                  onChange={handleInputChange}
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Nouveau mot de passe"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleInputChange}
                />

                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Entrer nouveau mot de passe"
                  type="password"
                  id="confirmPassword"
                  autoComplete="current-password"
                  onChange={handleInputChange}
                />

                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  style={{ marginTop: 20 }}
                  onClick={() => signInClick()}
                >
                  M'envoyer un code
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link
                      onClick={() => onStateChange("signIn")}
                      variant="body2"
                    >
                      Retour a la page de connexion
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
            <Box mt={8}>
              <Copyright />
            </Box>
          </Container>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default CustomForgotPass;
