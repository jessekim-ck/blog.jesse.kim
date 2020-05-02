import React from "react";
import {Navbar, Nav} from "react-bootstrap";
import {connect} from "react-redux";
import styles from "../app.module.css";
import logo from '../logo.svg'
import {Link} from "react-router-dom";
import {searchPost} from "../apis/apis";
import {enroll_shortcut, remove_shortcut} from "../redux/actions";


class SearchBar extends React.Component {
    
    state = {
        search_text: "",
        searched_posts: []
    }

    componentDidMount() {
        const search_bar = document.getElementById('search_bar');
        const search_result = document.getElementById('search_result');
        const initialize_searched_posts = event => {
            if (event.key === "Escape") {
                this.setState({searched_posts: []});
            }
        };

        search_bar.addEventListener('focus', () => {
            search_result.style.display = "block";
            window.addEventListener('keydown', initialize_searched_posts);
        });
        search_bar.addEventListener('focusout', () => {
            setTimeout(() => {
                search_result.style.display = "none";
            }, 100);
            window.removeEventListener('keydown', initialize_searched_posts);
        });
    }

    handle_change = e => {
        this.setState({search_text: e.target.value});
    }

    search_post = async event => {
        event.preventDefault();
        const result = await searchPost(this.state.search_text);
        let searched_posts;
        if (result.length) {
            searched_posts = result.map(post => (
                <li key={post.id}><Link to={`/post/${post.id}`}>{post.title}</Link></li>
            ));
        } else {
            searched_posts = [<li key={0}>No post found</li>];
        }
        
        this.setState({searched_posts});
    }

    render() {
        return (
            <div className={styles.searchBar}>
                <form onSubmit={this.search_post}>
                    <input 
                        id="search_bar"
                        type="text"
                        placeholder="Search posts"
                        value={this.state.search_text}
                        onChange={this.handle_change}
                    />
                    <input
                        type="submit"
                        style={{display: "none"}}
                    />
                </form>
                
                <div id="search_result">
                    {this.state.searched_posts.length ? 
                        <div className={styles.searchResult}>
                            {this.state.searched_posts}
                        </div> : null}
                </div>
            </div>
        )
    };
}


class NavigationBar extends React.Component {

    componentDidMount() {
        const search_bar = document.getElementById("search_bar");
        this.props.dispatch(enroll_shortcut("p", () => search_bar.focus()));
    }

    componentWillUnmount() {
        this.props.dispatch(remove_shortcut("p"));
    }

    render() {
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
                                onClick={this.props.toggle_sidebar}
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
                                this.props.authenticated &&
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
}

const mapStateToProps = state => state.user;

export default connect(mapStateToProps)(NavigationBar);
