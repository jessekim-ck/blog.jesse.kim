import React from 'react';
import PostList from "../components/PostList";
import {getPostList} from "../apis/apis";
import {Helmet} from "react-helmet";
import styles from "../app.module.css";

import {connect} from "react-redux";
import {enroll_shortcut, remove_shortcut} from "../redux/actions";

import Loader from "../components/Loader";


class Index extends React.Component {

    state = {
        post_list: [],
        render_list: [],
    }

    async componentDidMount() {
        const post_list = await getPostList()
        this.setState({
            post_list: post_list,
            render_list: post_list.slice(0, 9),
        })
        
        this.props.dispatch(enroll_shortcut("h", () => this.props.history.push("/")));
        this.props.dispatch(enroll_shortcut("u", () => this.props.history.push("/post/write")));
        document.addEventListener('scroll', this.handle_scroll);
    }

    componentWillUnmount() {
        this.props.dispatch(remove_shortcut("h"));
        this.props.dispatch(remove_shortcut("u"));
        document.removeEventListener('scroll', this.handle_scroll);
    }

    update_render_list = () => {
        const current_length = this.state.render_list.length;
        const new_length = Math.min(this.state.post_list.length, current_length + 10);
        this.setState({
            render_list: this.state.post_list.slice(0, new_length - 1),
        })
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
            this.update_render_list();
        }
    }

    render() {
        if (this.state.post_list.length === 0) {
            return (
                <Loader />
            )
        }
        
        return (
            <div>
                <Helmet>
                    <title>Jessekim's Blog</title>
                    <meta name="description" content="제씨킴의 데이터사이언스 프로그래밍 일상 블로그입니다."/>
                    <link rel="canonical" href="https://blog.jesse.kim"/>
                </Helmet>
                <div className={styles.postList}>
                    <PostList post_list={this.state.render_list}/>
                </div>
            </div>
        )
    }
}

export default connect()(Index);
