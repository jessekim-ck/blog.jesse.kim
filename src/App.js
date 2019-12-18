import React from 'react';
import {Helmet} from "react-helmet";
import {getCurrentUser, refreshToken} from "./apis/apis"
import styles from './app.module.css'
import favicon from './assets/favicon.ico'
import {BrowserRouter as Router} from "react-router-dom";
import ContentNavigator from './components/ContentNavigator';
import Route from './router';
import {Sidebar, Menu} from "semantic-ui-react";
import NavigationBar from './components/NavigationBar';
import {isMobile} from "react-device-detect";

import {connect} from 'react-redux'
import {
    login,
    logout,
    enroll_shortcut,
    toggle_sidebar,
    set_sidebar
} from "./redux/actions"


class App extends React.Component {
    
    async componentDidMount() {
        const token = localStorage.getItem('token');
        this.props.dispatch(enroll_shortcut("i", this.toggle_sidebar));
        if (token) {
            await refreshToken();
            const currentUser = await getCurrentUser();
            this.props.dispatch(login(currentUser));
        }

        window.addEventListener('keydown', this.onMetaUp);
        window.addEventListener('keyup', this.onMetaDown);
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.onMetaUp);
	    window.removeEventListener("keyup", this.onMetaDown);
    }

    onMetaUp = event => {
        if (event.key === "Meta" || event.key === "Control") {
            window.addEventListener('keydown', this.onKeyUp);
        }
    }

    onMetaDown = event => {
        if (event.key === "Meta" || event.key === "Control") {
            window.removeEventListener('keydown', this.onKeyUp);
        }
    }

    onKeyUp = event => {
        if (this.props.shortcut.registered[event.key]) {
            event.preventDefault();
            this.props.shortcut.registered[event.key]();
        }
    }

    handle_logout = async () => {
        localStorage.removeItem('token')
        this.props.dispatch(logout())
    }

    toggle_sidebar = () => this.props.dispatch(toggle_sidebar())

    render() {
        const sidebar_width = isMobile ? null : "wide"

        return (
            <div className={styles.app}>
                <Helmet>
                    <link rel="shortcut icon" href={favicon}/>
                </Helmet>

                <Router>
                    <NavigationBar toggle_sidebar={this.toggle_sidebar}/>
                    <div className={styles.appContainer}>
                        {Route}
                    </div>
                    <Sidebar
                        as={Menu}
                        onHide={() => this.props.dispatch(set_sidebar(false))}
                        animation="overlay"
                        direction="right"
                        width={sidebar_width}
                        visible={this.props.sidebar.visible}
                    >
                        <ContentNavigator 
                            handle_logout={this.handle_logout}
                        />
                    </Sidebar>
                </Router>
            </div>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(App)
