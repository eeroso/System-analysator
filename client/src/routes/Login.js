import React, { Component } from 'react';
import '../styles/Login.css';
import auth from '../components/Auth.js';


export default class Login extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
  
        this.state = {
            username: '',
            password: '',
            alert: ''
        }
    
    }
    
 

    handleSubmit(event){
        event.preventDefault();
        fetch('http://localhost:3001/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
        },
            body: JSON.stringify({
                username : this.state.username,
                password : this.state.password
            })
        })
        .then(res => res.json())
        .then((result) => {
            if(result===false){
                alert("Incorrect login credentials");
            }
            if(result===true){
                console.log(result);
                auth.login(() => {
                    this.props.history.push('/data');
                })

            } 
        })
    }


    render() {

        return (
            <div className='container'>
                <div className='login'>
                    <h1>Login</h1>
                    <input className='text' placeholder='username' type='text' name='username' onChange={e => this.setState({username : e.target.value})} /> <br/>
                    <input className='text' placeholder='password' type='password' name='password' onChange={e => this.setState({password : e.target.value})}/><br/>
                    <button onClick={this.handleSubmit}>Login</button>
                </div>
            </div>
        )
    }
}
