/* src/App.js */
import React, { useEffect, useState } from "react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { createTodo } from "./graphql/mutations";
import { listTodos } from "./graphql/queries";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";
import 'bootstrap/dist/css/bootstrap.css';
import awsExports from "./aws-exports";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import styled from "styled-components";
import NavigationBar from "./NavigationBar";
import {Navbar} from "react-bootstrap";
import {Button} from "@material-ui/core";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

Amplify.configure(awsExports);

const initialState = { name: "", temperature: "" };

const Accueil = () => {
    const [formState, setFormState] = useState(initialState);
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetchTodos();
    }, []);

    function setInput(key, value) {
        setFormState({ ...formState, [key]: value });
    }

    async function signOut() {
        try {
            await Auth.signOut().then(() => {
                window.location.reload();
            });
        } catch (error) {
            console.log("error signing out: ", error);
        }
    }

    async function fetchTodos() {
        try {
            console.log("fetching...");
            const todoData = await API.graphql(graphqlOperation(listTodos));
            const todos = todoData.data.listTodos.items;
            setTodos(todos);
            console.log(todos);
        } catch (err) {
            console.log("error fetching todos");
        }
    }

    async function addTodo() {
        try {
            if (!formState.name || !formState.temperature) return;
            const todo = { ...formState };
            setTodos([...todos, todo]);
            setFormState(initialState);
            await API.graphql(graphqlOperation(createTodo, { input: todo }));
        } catch (err) {
            console.log("error creating todo:", err);
        }
    }

    return (
        <div>
            <NavigationBar/>
            <div style={{float:'left',width:'50%',height:'100%',paddingLeft:'20px',paddingTop:'20px'}}>
                {todos.map((todo, index) => (
                    <div key={todo.id ? todo.id : index} style={styles.todo}>
                        <p style={styles.todoName}><Link to={`/user/${todo.id}`}>{todo.name}</Link></p>
                        {/*<p style={styles.todoDescription}>{todo.temperature}</p>*/}
                    </div>
                ))}
            </div>
            <div style={{float:'left',width:'50%',height:'100%', paddingTop:'20px'}}>
                <h2>Température</h2>
                <input
                    onChange={(event) => setInput("name", event.target.value)}
                    style={styles.input}
                    value={formState.name}
                    placeholder="Name"
                />
                <br/>
                <input
                    onChange={(event) => setInput("temperature", event.target.value)}
                    style={styles.input}
                    value={formState.temperature}
                    placeholder="temperature"
                />
                <br/>
                <button style={styles.button} onClick={addTodo}>
                    Ajouter la température
                </button>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>

        </div>

    );
};


const styles = {
    container: {
        width: 400,
        margin: "auto",
        marginTop: 100,
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        padding: 20,
    },
    todo: { marginBottom: 10 },
    input: {
        border: "none",
        backgroundColor: "#ddd",
        marginBottom: 10,
        padding: 8,
        fontSize: 18,
    },
    todoName: { fontSize: 20, fontWeight: "bold" },
    todoDescription: { marginBottom: 0 },
    button: {
        backgroundColor: "black",
        color: "white",
        outline: "none",
        fontSize: 18,
        padding: "12px 0px",
    },
};


export default Accueil;
