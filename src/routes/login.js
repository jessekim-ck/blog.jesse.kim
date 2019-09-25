import React from 'react'
import LoginForm from '../components/LoginForm'
import {authenticateUser, getCurrentUser} from "../apis/apis";
import {login} from "../redux/actions";
import {connect} from "react-redux";

class Login extends React.Component {

    handle_login = async (event, data) => {
        try {
            event.preventDefault()
            await authenticateUser(data.username, data.password)
            const currentUser = await getCurrentUser()
            await this.props.dispatch(login(currentUser))
            this.props.history.push('/')
        } catch (err) {
            console.log('login failed!')
        }
    }

    render() {
        return (
            <div>
                <LoginForm handle_login={this.handle_login}/>
            </div>
        )
    }
}

const mapStateToProps = state => state.user

export default connect(mapStateToProps)(Login)