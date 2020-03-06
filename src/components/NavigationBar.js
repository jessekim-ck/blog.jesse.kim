import React from "react";
import {Navbar, Nav} from "react-bootstrap";
import {connect} from "react-redux";
import styles from "../app.module.css";
import logo from '../logo.svg'
import {Link} from "react-router-dom";


const NavigationBar = props => {

    return (
        <Navbar variant="dark" className={styles.navContainer}>
            <div>
                <Navbar.Collapse>
                    <Link className="navbar-brand" to="/">
                        JESSEKIM'S BLOG
                    </Link>
                    <Navbar.Collapse className="justify-content-end">
                        <img 
                            src={logo} 
                            width="30" 
                            height="30" 
                            alt="JesseKim" 
                            onClick={props.toggle_sidebar}
                        />
                    </Navbar.Collapse>
                </Navbar.Collapse>
            </div>
            <div>
                <Nav className="mr-auto">
                    <Link className="nav-link" to="/">HOME</Link>
                    <Link className="nav-link" to="/about">ABOUT</Link>
                    {
                        props.authenticated &&
                        <Link className="nav-link" to="/post/write">+</Link>
                    }                    
                </Nav>
            </div>
        </Navbar>
    );
}

const mapStateToProps = state => state.user;

export default connect(mapStateToProps)(NavigationBar);
