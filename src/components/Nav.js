import React from 'react';
import {connect} from "react-redux";
import {logout} from "../redux/actions";
import logo from '../logo.svg'
import styles from '../app.module.css'
import CustomLink from '../components/CustomLink'
import Dropdown from "react-bootstrap/Dropdown";


class Navigation extends React.Component {

    state = {
        currentPath: window.location.pathname.split('/')[1]
    }

    handle_logout = async () => {
        await localStorage.removeItem('token')
        this.props.dispatch(logout())
    }

    mapFontColor = to => {
        if (to === this.state.currentPath) {
            return 'white'
        } else {
            return 'grey'
        }
    }

    render() {
        const authenticated = this.props.user.authenticated
        return (
            <div className={styles.navContainer}>
                <div>
                    <div className={styles.navBarTop}>
                        <div>
                            <CustomLink
                                to="/"
                                color='white'
                                onClick={() => this.setState({ currentPath: "" })}
                                hover_opacity={1}>
                                JESSEKIM'S BLOG.
                            </CustomLink>
                        </div>
                        <div>
                            <Dropdown>
                                <Dropdown.Toggle as={CustomToggle}>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item>
                                        {
                                            authenticated ?
                                                this.props.user.currentUser.username :
                                                <CustomLink to="/login" color="black">Login</CustomLink>
                                        }
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    {
                                        authenticated &&
                                        <Dropdown.Item onClick={this.handle_logout}>
                                            Logout
                                        </Dropdown.Item>
                                    }
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                    <div className={styles.navBarBottom}>
                        <div className={styles.navBarBottom}>
                            <div className={styles.navBarItem}>
                                <CustomLink
                                    to="/"
                                    onClick={() => this.setState({ currentPath: "" })}
                                    color={this.mapFontColor("")} >
                                    HOME
                                </CustomLink>
                            </div>
                            <div className={styles.navBarItem}>
                                <CustomLink
                                    to="/category"
                                    onClick={() => this.setState({ currentPath: "category" })}
                                    color={this.mapFontColor("category")} >
                                    CATEGORY
                                </CustomLink>
                            </div>
                            {
                                authenticated &&
                                <div className={styles.navBarItem}>
                                    <CustomLink
                                        to="/write_post"
                                        onClick={() => this.setState({ currentPath: "write_post" })}
                                        color={this.mapFontColor("write_post")} >
                                        +
                                    </CustomLink>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const CustomToggle = props => {

    const handleClick = e => {
        e.preventDefault();
        props.onClick(e);
    }

    return (
        <div onClick={handleClick}>
            <img src={logo} width="30" height="30" alt="JesseKim" />
        </div>
    );
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(Navigation)
