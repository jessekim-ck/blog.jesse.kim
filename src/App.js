import React from 'react';
import {Helmet} from "react-helmet";
import {connect} from 'react-redux'
import {getCurrentUser, refreshToken} from "./apis/apis"
import {login, logout} from "./redux/actions"
import styles from './app.module.css'
import favicon from './assets/favicon.ico'
import {BrowserRouter as Router} from "react-router-dom";
import ContentNavigator from './components/ContentNavigator';
import Route from './router';
import {Sidebar, Menu} from "semantic-ui-react";
import NavigationBar from './components/NavigationBar';
import {isMobile} from "react-device-detect";


class App extends React.Component {

    state = {
        sidebar_visible: false
    }
    
    async componentDidMount() {
        const token = localStorage.getItem('token')
        if (!token) {
            localStorage.removeItem('token')
        } else {
            await refreshToken()
            const currentUser = await getCurrentUser()
            await this.props.dispatch(login(currentUser))
        }
    }

    handle_logout = async () => {
        localStorage.removeItem('token')
        this.props.dispatch(logout())
    }

    toggle_sidebar = () => {
        this.setState(prevState => ({
            sidebar_visible: !prevState.sidebar_visible
        }))
    }

    render() {
        const sidebar_width = isMobile ? null : "wide"

        return (
            <div className={styles.app}>
                <div className="application">
                    <Helmet>
                        <link rel="shortcut icon" href={favicon}/>
                    </Helmet>
                </div>

                <div className={styles.app}>
                    <Router>
                        <NavigationBar toggle_sidebar={this.toggle_sidebar}/>
                        <div className={styles.appContainer}>
                            {Route}
                        </div>
                        <Sidebar
                            as={Menu}
                            onHide={this.toggle_sidebar}
                            animation="overlay"
                            direction="right"
                            width={sidebar_width}
                            visible={this.state.sidebar_visible}
                        >
                            <ContentNavigator 
                                handle_logout={this.handle_logout}
                            />
                        </Sidebar>
                    </Router>
                </div>
            </div>
        )
    }
}

export default connect()(App)
