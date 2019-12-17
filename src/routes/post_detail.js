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
        await this.updatePostDetail()
        this.props.dispatch(
            enroll_shortcut("e", () => this.props.history.push(`/post/${this.props.match.params.id}/edit`))
        )
    }

    async componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            await this.updatePostDetail()
        }
    }

    componentWillUnmount() {
        this.props.dispatch(remove_shortcut("e"))
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
        return (
            <div className={styles.post}>
                <Helmet>
                    <title>{`${this.state.post.category || "Uncategorized"}-${this.state.post.title}`}</title>
                    <meta name="description" content={`${this.state.post.category}-${this.state.post.title}`}/>
                    <link rel="canonical" href={`https://blog.jesse.kim/post/${this.props.match.params.id}`}/>
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
