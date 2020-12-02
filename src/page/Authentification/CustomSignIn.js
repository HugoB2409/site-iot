import React, { useState } from "react";
import { Auth } from "aws-amplify";
import Copyright from "../../component/Copyright";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

//TODO: Ajouter message d'erreur

const CustomSignIn = (props) => {
  const { authState, onStateChange } = props;
  const [formData, setFormData] = useState({
    username: "",
    password: "",
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
      await Auth.signIn(formData.username, formData.password);
      onStateChange(authState);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {props.authState === "signIn" ? (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div
            style={{
              marginTop: "40%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img src="logo2.png" width="128" alt="logo" />
            <Typography component="h1" variant="h4">
              Connexion
            </Typography>
            <form
              noValidate
              style={{
                width: "100%", // Fix IE 11 issue.
                marginTop: 10,
              }}
            >
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Nom d'utilisateur"
                name="username"
                id="username"
                onChange={handleInputChange}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mot de passe"
                type="password"
                id="password"
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
                Se connecter
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link
                    onClick={() => onStateChange("forgotPassword")}
                    variant="body2"
                  >
                    Mot de passe oublié?
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
  );
};
export default CustomSignIn;
