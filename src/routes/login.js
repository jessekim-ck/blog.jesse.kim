import React from 'react'
import LoginForm from '../components/LoginForm'
import {authenticateUser, getCurrentUser} from "../apis/apis";
import {login} from "../redux/actions";
import {connect} from "react-redux";
import {Helmet} from "react-helmet"


class Login extends React.Component {

    handle_login = async (event, data) => {
        try {
            await event.preventDefault()
            await authenticateUser(data.username, data.password)
            await this.props.history.goBack()
            const currentUser = await getCurrentUser()
            await this.props.dispatch(login(currentUser))
        } catch (err) {
            console.log('Login failed!')
            console.log("Error message: " + err)
        }
    }

    render() {
        if (this.props.authenticated === true) {this.props.history.push("/")}
        return (
            <div>
                <Helmet>
                    <title>Login</title>
                    <link rel="canonical" href="https://blog.jesse.kim/login"/>
                </Helmet>
                <LoginForm handle_login={this.handle_login}/>
            </div>
        )
    }
}

const mapStateToProps = state => state.user

export default connect(mapStateToProps)(Login)