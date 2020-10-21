import React, {useEffect, useState} from "react";
import Amplify, {API, graphqlOperation} from "aws-amplify";
import {getTodo, listTodos} from "./graphql/queries";
import NavigationBar from "./NavigationBar";
import {Link} from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import {createTodo} from "./graphql/mutations";
import awsExports from "./aws-exports";
import {Bar} from 'react-chartjs-2';

Amplify.configure(awsExports);

const UserInfo = (props) => {

    const [userInfo, setuserInfo] = useState({});
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetchTodos();
    }, []);

    async function fetchTodos() {
        try {
            console.log("fetching...");
            const todoData = await API.graphql(graphqlOperation(getTodo, {id:props.match.params.id}));
            const todos = todoData.data.getTodo;
            setuserInfo(todos);
            console.log(todos);
        } catch (err) {
            console.log("error fetching todos");
        }
    }

    const state = {
        labels: [userInfo.createdAt],
        datasets: [
            {
                label: 'Temperature',
                backgroundColor: 'rgba(16,166,247,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 1,
                data: [userInfo.temperature]
            }
        ]
    }

    return (
        <div>
            <NavigationBar/>
            <div style={{float:'left',width:'50%',height:'100%',paddingLeft:'20px',paddingTop:'20px'}}>
                <p>L'ID de l'identifiant: {props.match.params.id}</p>
                <p>Nom de l'identifiant: {userInfo.name}</p>
                <p>Température de l'indentifiant à {userInfo.createdAt} : {userInfo.temperature} °C</p>
            </div>
            <div style={{float:'left',width:'50%',height:'100%', paddingTop:'20px', paddingRight:'50px'}}>
                <Bar
                    data={state}
                    option={{
                        title:{
                            display: true,
                            text:'sssss',
                            fontSize:20
                        },
                        legend:{
                            display: true,
                            position:'right'
                        }
                    }}
                    />
            </div>

        </div>
    );
};


export default UserInfo;