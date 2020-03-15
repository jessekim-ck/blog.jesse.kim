import React from 'react';
import styles from "../app.module.css";
import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";
import {getPostDetail, writeComment} from "../apis/apis";
import button_edit from "../assets/button_edit.png";
import format_datetime from "../utils/format_datetime";

import {connect} from "react-redux";
import {enroll_shortcut, remove_shortcut} from "../redux/actions";

import CommentView from "../components/CommentView";
import MarkdownRenderer from "../components/MarkdownRenderer";
import FloatButton from "../components/FloatButton";
import Loader from "../components/Loader";


class PostDetail extends React.Component {

    state = {
        post: null,
        comment_list: null
    }

    componentDidMount() {
        this.updatePostDetail();
        const post_id = this.props.match.params.id;
        this.props.dispatch(enroll_shortcut("e", () => this.props.history.push(`/post/${post_id}/edit`)));
        this.props.dispatch(enroll_shortcut("h", () => this.props.history.push("/")));
        this.props.dispatch(enroll_shortcut("u", () => this.props.history.push("/post/write")));
    }

    componentDidUpdate(prevProps) {
        this.props.match.params.id !== prevProps.match.params.id && this.updatePostDetail();
    }

    componentWillUnmount() {
        this.props.dispatch(remove_shortcut("e"));
        this.props.dispatch(remove_shortcut("h"));
        this.props.dispatch(remove_shortcut("u"));
    }

    updatePostDetail = async () => {
        try {
            const post_detail = await getPostDetail(this.props.match.params.id);
            this.setState({...post_detail});
        } catch (err) {
            this.props.history.push("/");
        }
    }
    
    handleWriteComment = async (nickname, title) => {
        await writeComment(this.state.post.id, nickname, title);
        this.updatePostDetail();
    }

    render() {
        if (!this.state.post) {
            return (<Loader />);
        }

        const title = (this.state.post.category && (this.state.post.category + "-") + this.state.post.title) || "JesseKim's Blog";
        const description = this.state.post.text.split("\n\n")[0] || "제씨킴의 데이터사이언스 프로그래밍 일상 블로그";

        return (
            <div className={styles.post}>
                <Helmet>
                    <title>{title}</title>
                    <meta name="description" content={description}/>
                    <link rel="canonical" href={"https://blog.jesse.kim" + window.location.pathname}/>
                </Helmet>
                <div>
                    <div className={styles.subtitle}>
                        {
                            <Link className={styles.touchable} to={`/category/${this.state.post.category_id}`}>
                                {this.state.post.category}
                            </Link> 
                            || 
                            'UNCATEGORIZED'
                        }
                    </div>
                    <div className={styles.title}>
                        {this.state.post.title}
                    </div>
                    <div className={styles.description}>
                        <div>Writer: {this.state.post.writer} {this.state.post.is_private ? "(private)" : ""}</div>
                        <div>Created: {format_datetime(this.state.post.created)}</div>
                        <div>Last Updated: {format_datetime(this.state.post.updated)}</div>
                    </div>
                    <div id="post-body" className={styles.body}>
                        <MarkdownRenderer source={this.state.post.text}/>
                    </div>
                </div>
                <CommentView
                    comment_list={this.state.comment_list}
                    handleWriteComment={this.handleWriteComment}
                />
                {
                    this.props.user.authenticated &&
                    <Link
                        to={`/post/${this.state.post.id}/edit`}
                        className={styles.floatButton}
                    >
                        <FloatButton source={button_edit}/>
                    </Link>
                }
            </div>
        );
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(PostDetail);
