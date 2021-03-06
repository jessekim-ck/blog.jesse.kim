import React from 'react';
import {Helmet} from "react-helmet";
import {getCurrentUser, refreshToken} from "./apis/apis";
import styles from './app.module.css';
import favicon from './assets/favicon.ico';
import {BrowserRouter as Router} from "react-router-dom";
import ContentNavigator from './components/ContentNavigator';
import Route from './router';
import {Sidebar, Menu} from "semantic-ui-react";
import NavigationBar from './components/NavigationBar';
import {isMobile} from "react-device-detect";

import {connect} from 'react-redux';
import {
    login,
    logout,
    enroll_shortcut,
    toggle_sidebar,
    set_sidebar
} from "./redux/actions";

import ReactGa from "react-ga";


class App extends React.Component {

    state = {
        render: false,
        pathname: null,
    }
    
    async componentDidMount() {
        ReactGa.initialize("UA-160691470-1"); // initialize GA module
        const token = localStorage.getItem('token');
        if (token) {
            const token_refreshed = await refreshToken();
            if (token_refreshed) {
                const currentUser = await getCurrentUser();
                this.props.dispatch(login(currentUser));
            }
        }

        this.props.dispatch(enroll_shortcut(";", this.toggle_sidebar));
        window.addEventListener('keydown', this.onMetaDown);
        window.addEventListener('keyup', this.onMetaUp);

        this.setState({render: true});
    }

    componentDidUpdate() {
        if (this.state.pathname !== window.location.pathname) {
            // update current pathname and invoke GA pageview
            this.setState({pathname: window.location.pathname}); 
            ReactGa.pageview(window.location.pathname + window.location.search);
        }
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.onMetaDown);
	    window.removeEventListener("keyup", this.onMetaUp);
    }

    onMetaDown = event => {
        if (event.key === "Meta" || event.key === "Control") {
            window.addEventListener('keydown', this.onKeyDown);
            const interval = window.setInterval(
                () => {
                    if (!document.hasFocus()) {
                        window.removeEventListener('keydown', this.onKeyDown);
                        window.clearInterval(interval);
                    }
                }, 500
            );
        }
    }

    onMetaUp = event => {
        if (event.key === "Meta" || event.key === "Control") {
            window.removeEventListener('keydown', this.onKeyDown);
        }
    }

    onKeyDown = event => {
        if (this.props.shortcut.registered[event.key]) {
            event.preventDefault();
            this.props.shortcut.registered[event.key]();
        }
    }

    handle_logout = () => {
        localStorage.removeItem('token');
        this.props.dispatch(logout());
    }

    toggle_sidebar = () => this.props.dispatch(toggle_sidebar())

    render() {
        if (!this.state.render) {
            return (<div></div>);
        } else {
            const sidebar_width = isMobile ? null : "wide";
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
            );
        }
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(App);
