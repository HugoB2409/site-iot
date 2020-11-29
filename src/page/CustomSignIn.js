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

const CustomSignIn = (props) => {
  console.log(props);
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

    // <div>
    //   <form>
    //     <div>
    //       <label htmlFor="username"> Username</label>
    //       <input
    //         data-prop={"username"}
    //         onChange={handleInputChange}
    //         type="text"
    //         placeholder="Username"
    //       />
    //     </div>
    //     <div>
    //       <label htmlFor="password">Password</label>
    //       <input
    //         data-prop={"password"}
    //         onChange={handleInputChange}
    //         type="password"
    //         placeholder="******************"
    //       />
    //       <p>
    //         {" "}
    //         Forgot your password?{" "}
    //         <a onClick={() => onStateChange("forgotPassword")}>
    //           Reset Password
    //         </a>
    //       </p>
    //     </div>
    //     <div>
    //       <Button
    //         variant="contained"
    //         color="primary"
    //         type="button"
    //         onClick={() => signInClick()}
    //       >
    //         Login
    //       </Button>
    //     </div>
    //   </form>
    // </div>
  );
};
export default CustomSignIn;

// import React from "react";
// import Avatar from "@material-ui/core/Avatar";
// import Button from "@material-ui/core/Button";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import TextField from "@material-ui/core/TextField";
// import Link from "@material-ui/core/Link";
// import Grid from "@material-ui/core/Grid";
// import Box from "@material-ui/core/Box";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
// import Typography from "@material-ui/core/Typography";
// import { SignIn } from "aws-amplify-react";
// import Container from "@material-ui/core/Container";

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {"Copyright © "}
//       <Link href="/">TempReader</Link> {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

// export class CustomSignIn extends SignIn {
//   constructor(props) {
//     super(props);
//     this._validAuthStates = ["signIn", "signedOut", "signedUp"];
//   }

//   showComponent(theme) {
//     return (
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <div
//           style={{
//             marginTop: "50%",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <Avatar style={{ margin: 10, backgroundColor: "red" }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Sign in
//           </Typography>
//           <form
//             noValidate
//             style={{
//               width: "100%", // Fix IE 11 issue.
//               marginTop: 10,
//             }}
//           >
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               id="email"
//               label="Email Address"
//               name="username"
//               autoComplete="email"
//               onChange={this.handleInputChange}
//               autoFocus
//             />
//             <TextField
//               variant="outlined"
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//               onChange={this.handleInputChange}
//             />

//             <Button
//               fullWidth
//               variant="contained"
//               color="primary"
//               style={{ marginTop: 20 }}
//               onClick={() => super.signIn()}
//             >
//               Sign In
//             </Button>
//             <Grid container>
//               <Grid item xs>
//                 <Link
//                   onClick={() => super.changeState("forgotPassword")}
//                   variant="body2"
//                 >
//                   Forgot password?
//                 </Link>
//               </Grid>
//             </Grid>
//           </form>
//         </div>
//         <Box mt={8}>
//           <Copyright />
//         </Box>
//       </Container>
//     );
//   }
// }

// export default CustomSignIn;
