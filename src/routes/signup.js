import React from 'react'
import SignupForm from '../components/SignupForm'
import {signupUser} from "../apis/apis";
import {login} from "../redux/actions";
import {connect} from "react-redux";

class Signup extends React.Component {

    handle_signup = async (event, data) => {
        try {
            event.preventDefault()
            const code = prompt('code?')
            if (code === '2068') {
                const response = await signupUser(data.username, data.password)
                await this.props.dispatch(login(response))
                await this.props.history.push('/')
            } else {
                alert('You cannot sign up.')
            }
        } catch (err) {
            console.log('signup failed!')
        }
    }

    render() {
        return (
            <div>
                <SignupForm handle_signup={this.handle_signup} />
            </div>
        )
    }
}


export default connect()(Signup)