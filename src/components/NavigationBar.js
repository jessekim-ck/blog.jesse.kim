import React from "react";
import {Navbar, Nav} from "react-bootstrap";
import {connect} from "react-redux";
import styles from "../app.module.css";
import logo from '../logo.svg'


const NavigationBar = props => {

    return (
        <Navbar variant="dark" className={styles.navContainer}>
            <div>
                <Navbar.Collapse>
                    <Navbar.Brand href="/">
                        JESSEKIM'S BLOG
                    </Navbar.Brand>
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
                    <Nav.Link href="/">HOME</Nav.Link>
                    {
                        props.authenticated &&
                        <Nav.Link href="/post/write">+</Nav.Link>
                    }                    
                </Nav>
            </div>
        </Navbar>
    )
}

const mapStateToProps = state => state.user

export default connect(mapStateToProps)(NavigationBar)