import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import styles from "../app.module.css";
import {Link} from "react-router-dom";
import button_ok from "../assets/button_ok.png";
import button_add from "../assets/button_add.png";

class SignupForm extends React.Component {
    
    state = {
        username: '',
        password: '',
    }

    handle_change = e => {
        const name = e.target.name
        const value = e.target.value
        this.setState(prevState => {
            const newState = { ...prevState }
            newState[name] = value
            return newState
        })
    }

    render() {
        return (
            <form>
                <div className={styles.authForm}>
                    <div className={styles.authFormHeader}>
                        SIGN UP
                    </div>
                    <input
                        className={styles.authFormInput}
                        type="text"
                        name="username"
                        value={this.state.username}
                        onChange={this.handle_change}
                    />
                    <input
                        className={styles.authFormInput}
                        type="password"
                        name="password"
                        value={this.state.password}
                        onChange={this.handle_change}
                    />
                    <div className={styles.authFormSubmit}>
                        <button
                            className={styles.touchable}
                            onClick={event => this.props.handle_signup(event, this.state)} >
                            <img src={button_add} width="60" height="60" alt="signup"/>
                        </button>
                        <Link className={styles.touchable} to="/login">
                            <img src={button_ok} width="60" height="60" alt="login"/>
                        </Link>
                    </div>
                </div>
            </form>
        )
    }
}

SignupForm.propTypes = {
    handle_signup: PropTypes.func.isRequired
}

export default connect()(SignupForm)
