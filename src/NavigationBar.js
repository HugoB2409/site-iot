import React from 'react';
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import styled from 'styled-components';
import {Button} from "@material-ui/core";
import {Auth} from "aws-amplify";

async function signOut() {
    try {
        await Auth.signOut().then(() => {
            window.location.reload();
        });
    } catch (error) {
        console.log("error signing out: ", error);
    }
}

const NavigationBar = () => (
    <Styles>
        <Navbar expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Button color="#FFFFFF" onClick={signOut}> Se déconnecter </Button>
        </Navbar>
    </Styles>
)

const Styles = styled.div`
  .navbar { background-color: #10A6F7; }
  a, .navbar-nav, .navbar-light .nav-link {
    color: #FFFFFF;
    &:hover { color: white; }
  }
  .navbar-brand {
    font-size: 1.4em;
    color: #FFFFFF;
    &:hover { color: white; }
  }
  .form-center {
    position: absolute !important;
    left: 25%;
    right: 25%;
  }
`;

export default NavigationBar