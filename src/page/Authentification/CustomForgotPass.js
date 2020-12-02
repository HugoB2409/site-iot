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

const CustomForgotPass = (props) => {
  const { authState, onStateChange } = props;
  const [formData, setFormData] = useState({
    username: "",
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
      await Auth.forgotPassword(formData.username);
      props.setUsername(formData.username);
      onStateChange("forgotPasswordSubmit");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      {" "}
      <div>
        {props.authState === "forgotPassword" ? (
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
              <img src="logo2.png" width="128" alt="logo" />
              <Typography component="h1" variant="h5">
                Réinitialisez votre mot de passe
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
