import React from 'react';
import LoginForm from '../components/LoginForm';
import {authenticateUser} from "../apis/apis";
import {login} from "../redux/actions";
import {connect} from "react-redux";
import {Helmet} from "react-helmet";


class Login extends React.Component {

    handle_login = async (event, data) => {
        event.preventDefault();
        const user = await authenticateUser(data.username, data.password);
        this.props.dispatch(login(user));
        this.props.history.goBack();
    }

    componentDidMount() {
        if (this.props.authenticated) {
            alert("You are already logged in.")
            this.props.history.push("/");
        }
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>Login</title>
                    <link rel="canonical" href="https://blog.jesse.kim/user/login"/>
                </Helmet>
                <LoginForm handle_login={this.handle_login}/>
            </div>
        );
    }
}

const mapStateToProps = state => state.user;

export default connect(mapStateToProps)(Login);
