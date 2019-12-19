import React from 'react'
import PostDetailView from '../components/PostDetailView'
import {getPostDetail, writeComment} from "../apis/apis";
import CommentView from "../components/CommentView";
import styles from "../app.module.css";
import {Helmet} from "react-helmet";
import {Link} from "react-router-dom";
import button_edit from "../assets/button_edit.png";
import FloatButton from "../components/FloatButton";

import {connect} from "react-redux";
import {enroll_shortcut, remove_shortcut} from "../redux/actions";


class PostDetail extends React.Component {

    state = {
        post: {
            id: '',
            title: '',
            text: '',
            category: '',
        },
        comment_list: []
    }

    handleWriteComment = async (nickname, title) => {
        await writeComment(this.state.post.id, nickname, title)
        await this.updatePostDetail()
    }

    async componentDidMount() {
        await this.updatePostDetail();
        
        const post_id = this.props.match.params.id;
        this.props.dispatch(enroll_shortcut("e", () => this.props.history.push(`/post/${post_id}/edit`)));
        this.props.dispatch(enroll_shortcut("h", () => this.props.history.push("/")));
        this.props.dispatch(enroll_shortcut("u", () => this.props.history.push("/post/write")));
    }

    async componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            await this.updatePostDetail()
        }
    }

    componentWillUnmount() {
        this.props.dispatch(remove_shortcut("e"));
        this.props.dispatch(remove_shortcut("h"));
        this.props.dispatch(remove_shortcut("u"));
    }

    updatePostDetail = async () => {
        const state = await getPostDetail(this.props.match.params.id)
        if (!state) {
            alert("Invalid post id")
            this.props.history.push("/")
        } else {
            this.setState({...state})
        }
    }

    render() {

        const title = (this.state.post.category && (this.state.post.category + "-") + this.state.post.title) || "JesseKim's Blog"
        const description = this.state.post.text.split("\n\n")[0] || "제씨킴의 데이터사이언스 프로그래밍 일상 블로그입니다."

        return (
            <div className={styles.post}>
                <Helmet>
                    <title>{title}</title>
                    <meta name="description" content={description}/>
                    <link rel="canonical" href={"https://blog.jesse.kim" + window.location.pathname}/>
                </Helmet>
                <PostDetailView post_detail={this.state.post}/>
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
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(PostDetail)
