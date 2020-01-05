import React from 'react';
import WritePostForm from '../components/WritePostForm';
import {editPost, getPostDetail, getCategoryGenealogy} from "../apis/apis";
import {Helmet} from "react-helmet";
import styles from "../app.module.css";

import {connect} from "react-redux";
import {enroll_shortcut, remove_shortcut} from "../redux/actions"


class EditPost extends React.Component {

    state = {
        post: null,
        category: null
    }

    async componentDidMount() {

        // Update post information
        const state = {}
        const post_id = this.props.match.params.id
        const post_detail = await getPostDetail(post_id)
        state.post = await post_detail.post
        if (state.post.category_id) {
            state.category = await getCategoryGenealogy(state.post.category_id)
        }

        // Can only edit self-writed posts
        if (this.props.currentUser.id !== state.post.writer_id || !this.props.authenticated) {
            alert("You have no access to this page!");
            this.props.history.goBack();
        }

        this.setState({...state})
        
        // Enroll shortcuts
        this.props.dispatch(enroll_shortcut("h", () => this.props.history.push("/")));
        this.props.dispatch(enroll_shortcut("u", () => this.props.history.push("/post/write")));
    }

    componentWillUnmount() {
        this.props.dispatch(remove_shortcut("h"));
        this.props.dispatch(remove_shortcut("u"));
    }

    handle_write_post = async data => {
        await this.save_post(data)
        this.props.history.push(`/post/${data.post.id}`)
    }

    save_post = async data => {
        await editPost(data.post.id, data.post.writer_id, data.category.id, data.post.title, data.post.text)
    }

    render() {
        return (
            <div className={styles.post}>
                <Helmet>
                    <title>Edit post</title>
                </Helmet>
                <WritePostForm
                    handle_write_post={this.handle_write_post}
                    save_post={this.save_post}
                    post={this.state.post}
                    category={this.state.category}
                />
            </div>
        )
    }
}

const mapStateToProps = state => state.user

export default connect(mapStateToProps)(EditPost)
