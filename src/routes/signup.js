import React from 'react';
import SignupForm from '../components/SignupForm';
import {signupUser} from "../apis/apis";
import {login} from "../redux/actions";
import {connect} from "react-redux";
import {Helmet} from "react-helmet";


class Signup extends React.Component {

    componentDidMount() {
        if (this.props.authenticated) {
            alert("You are already logged in.");
            this.props.history.push("/");
        }
    }

    handle_signup = async (event, data) => {
        event.preventDefault();
        const code = prompt('code?');
        if (code === '2068') {
            const user = await signupUser(data.username, data.password);
            this.props.dispatch(login(user));
            this.props.history.goBack();
        } else {
            alert('Wrong code!');
        }
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>Signup</title>
                    <link rel="canonical" href="https://blog.jesse.kim/user/signup"/>
                </Helmet>
                <SignupForm handle_signup={this.handle_signup} />
            </div>
        );
    }
}

const mapStateToProps = state => state.user;

export default connect(mapStateToProps)(Signup);