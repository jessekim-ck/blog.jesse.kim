import React from 'react';
import PostList from "../components/PostList";
import {getPostList} from "../apis/apis";
import {Helmet} from "react-helmet";
import styles from "../app.module.css";

import {connect} from "react-redux";
import {enroll_shortcut, remove_shortcut} from "../redux/actions";


class Index extends React.Component {

    async componentDidMount() {
        const post_list = await getPostList()
        this.setState({post_list})
        
        this.props.dispatch(enroll_shortcut("h", () => this.props.history.push("/")));
        this.props.dispatch(enroll_shortcut("u", () => this.props.history.push("/post/write")));
    }

    componentWillUnmount() {
        this.props.dispatch(remove_shortcut("h"));
        this.props.dispatch(remove_shortcut("u"));
    }

    state = {
        post_list: []
    }

    render() {
        return (
            <div>
                <Helmet>
                    <title>Jessekim's Blog</title>
                    <meta name="description" content="제씨킴의 데이터사이언스 프로그래밍 일상 블로그입니다."/>
                    <link rel="canonical" href="https://blog.jesse.kim"/>
                </Helmet>
                <div className={styles.postList}>
                    <PostList post_list={this.state.post_list}/>
                </div>
            </div>
        )
    }
}

export default connect()(Index)
