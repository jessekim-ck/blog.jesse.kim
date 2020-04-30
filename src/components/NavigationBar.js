import React from "react";
import {Navbar, Nav} from "react-bootstrap";
import {connect} from "react-redux";
import styles from "../app.module.css";
import logo from '../logo.svg'
import {Link} from "react-router-dom";
import {searchPost} from "../apis/apis"


class SearchBar extends React.Component {
    
    state = {
        search_text: "",
        searched_posts: []
    }

    handle_change = e => {
        this.setState({search_text: e.target.value});
    }

    search_post = async event => {
        event.preventDefault();
        const result = await searchPost(this.state.search_text);
        const searched_posts = result.map(
            post => (
                <li key={post.id}><Link to={`/post/${post.id}`}>{post.title}</Link></li>
            )
        );
        this.setState({searched_posts});
    }

    render() {
        return (
            <div className={styles.searchBar}>
                <form onSubmit={this.search_post}>
                    <input 
                        type="text"
                        placeholder="Search"
                        value={this.state.search_text}
                        onChange={this.handle_change}
                    />
                    <input
                        type="submit"
                        style={{display: "none"}}
                    />
                </form>
                
                {this.state.searched_posts.length ? 
                    <div className={styles.searchResult}>
                        {this.state.searched_posts}
                    </div> : null
                }
                
            </div>
        )
    };
}


const NavigationBar = props => {

    return (
        <Navbar variant="dark" className={styles.navContainer}>
            <div>
                <Navbar.Collapse>
                    <Nav.Link className="navbar-brand" href="/">
                        JESSEKIM'S BLOG
                    </Nav.Link>
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
                <Navbar.Collapse>
                    <Nav className="mr-auto">
                        <Link className="nav-link" to="/">HOME</Link>
                        <Link className="nav-link" to="/about">ABOUT</Link>
                        {
                            props.authenticated &&
                            <Link className="nav-link" to="/post/write">+</Link>
                        }                    
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                        <SearchBar />
                    </Navbar.Collapse>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
}

const mapStateToProps = state => state.user;

export default connect(mapStateToProps)(NavigationBar);
