import React from 'react'
import {connect} from "react-redux";
import PostDetailView from '../components/PostDetailView'
import {getPostDetail, writeComment} from "../apis/apis";
import CommentView from "../components/CommentView";
import styles from "../app.module.css";
import {Helmet} from "react-helmet";


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
            <div className={styles.postDetailContainer}>
                <Helmet>
                    <title>{`${this.state.post.category}: ${this.state.post.title}`}</title>
                </Helmet>
                <PostDetailView post_detail={this.state.post} />
                <CommentView
                    comment_list={this.state.comment_list}
                    handleWriteComment={this.handleWriteComment} />
            </div>
        )
    }
}

export default connect()(PostDetail)