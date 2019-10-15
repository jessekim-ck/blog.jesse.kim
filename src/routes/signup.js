import React from 'react'
import SignupForm from '../components/SignupForm'
import {signupUser} from "../apis/apis";
import {login} from "../redux/actions";
import {connect} from "react-redux";

class Signup extends React.Component {

    handle_signup = async (event, data) => {
        try {
            await event.preventDefault()
            const code = prompt('code?')
            if (code === '2068') {
                const response = await signupUser(data.username, data.password)
                await this.props.history.goBack()
                await this.props.dispatch(login(response))
            } else {
                alert('You cannot sign up!')
            }
        } catch (err) {
            console.log('Signup failed!')
            console.log("Error message: " + err)
        }
    }

    render() {
        if (this.props.authenticated === true) {this.props.history.push("/")}
        return (
            <div>
                <SignupForm handle_signup={this.handle_signup} />
            </div>
        )
    }
}

const mapStateToProps = state => state.user

export default connect(mapStateToProps)(Signup)