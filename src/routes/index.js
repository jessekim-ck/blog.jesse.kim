import React from 'react';
import PostList from "../components/PostList";
import {getPostList} from "../apis/apis";
import {Helmet} from "react-helmet";
import styles from "../app.module.css";

import {connect} from "react-redux";
import {enroll_shortcut, remove_shortcut, update_post_list, update_render_list} from "../redux/actions";

import Loader from "../components/Loader";


class Index extends React.Component {

    componentDidMount() {
        this.update_posts();
        this.props.dispatch(enroll_shortcut("h", () => this.props.history.push("/")));
        this.props.dispatch(enroll_shortcut("u", () => this.props.history.push("/post/write")));
        document.addEventListener('scroll', this.handle_scroll);
    }

    update_posts = async () => {
        const post_list = await getPostList();
        this.props.dispatch(update_post_list(post_list));
    }

    componentWillUnmount() {
        this.props.dispatch(remove_shortcut("h"));
        this.props.dispatch(remove_shortcut("u"));
        document.removeEventListener('scroll', this.handle_scroll);
    }

    handle_scroll = () => {
        const body = document.body;
        const html = document.documentElement;

        // Window(browser) height
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        // Document(page) height
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        // Scroll Height
        const windowBottom = windowHeight + window.pageYOffset;

        if (windowBottom >= docHeight) {
            this.props.dispatch(update_render_list());
        }
    }

    render() {
        if (!this.props.render_list.length) {
            return (<Loader />);
        } else {
            return (
                <div>
                    <Helmet>
                        <title>Jessekim's Blog</title>
                        <meta name="description" content="제씨킴의 데이터사이언스 프로그래밍 일상 블로그"/>
                        <link rel="canonical" href="https://blog.jesse.kim"/>
                    </Helmet>
                    <div className={styles.postList}>
                        <PostList post_list={this.props.render_list}/>
                    </div>
                </div>
            );
        }
    }
}

const mapStateToProps = state => state.post;

export default connect(mapStateToProps)(Index);
