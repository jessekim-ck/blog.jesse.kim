import React from 'react'
import {connect} from "react-redux";
import PostDetailView from '../components/PostDetailView'
import {getPostDetail, writeComment} from "../apis/apis";
import CommentView from "../components/CommentView";
import styles from "../app.module.css";


class PostDetail extends React.Component {

    // Should I process this information through Redux?
    state = {
        post: {
            id: '',
            title: '',
            text: '',
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
        this.setState({...state})
    }

    render() {
        return (
            <div className={styles.postDetailContainer}>
                <PostDetailView post_detail={this.state.post} />
                <CommentView
                    comment_list={this.state.comment_list}
                    handleWriteComment={this.handleWriteComment} />
            </div>
        )
    }
}

export default connect()(PostDetail)