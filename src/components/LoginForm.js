import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import styles from '../app.module.css'
import button_add from '../assets/button_add.png'
import button_ok from '../assets/button_ok.png'
import CustomLink from './CustomLink'


class LoginForm extends React.Component {

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
                <div className={styles.authenticateFormContainer}>
                    <div className={styles.authenticateFormHeader}>
                        LOG IN.
                    </div>
                    <div>
                        <input
                            className={styles.authenticateFormInput}
                            type="text"
                            name="username"
                            value={this.state.username}
                            onChange={this.handle_change} />
                    </div>
                    <div>
                        <input
                            className={styles.authenticateFormInput}
                            type="password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handle_change} />
                    </div>
                    <div className={styles.authenticateFormSubmit}>
                        <button
                            className={styles.touchableOpacity}
                            onClick={event => this.props.handle_login(event, this.state)}>
                                <img src={button_ok} width="66" height="66" alt="login"/>
                        </button>
                        <CustomLink to="/signup">
                            <img src={button_add} width="66" height="66" alt="signup"/>
                        </CustomLink>
                    </div>
                </div>
            </form>
        )
    }
}

LoginForm.propTypes = {
    handle_login: PropTypes.func.isRequired,
}

export default connect()(LoginForm)


