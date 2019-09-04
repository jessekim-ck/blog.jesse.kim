import React from 'react'
import SignupForm from '../components/SignupForm'
import {signupUser} from "../apis/apis";
import {login} from "../redux/actions";
import {connect} from "react-redux";

class Signup extends React.Component {

    handle_signup = async (e, data) => {
        const response = await signupUser(data.username, data.password)
        this.props.dispatch(login(response.username))
        this.props.history.push('/')
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