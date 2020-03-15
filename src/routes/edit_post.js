import React from 'react';
import WritePostForm from '../components/WritePostForm';
import {editPost, getPostDetail, getCategoryGenealogy} from "../apis/apis";
import {Helmet} from "react-helmet";
import styles from "../app.module.css";

import {connect} from "react-redux";
import {enroll_shortcut, remove_shortcut, update_post} from "../redux/actions"

import Loader from "../components/Loader";


class EditPost extends React.Component {

    state = {
        post: null,
        category: null
    }

    async componentDidMount() {

        // Update post information
        const state = {};
        const post_id = this.props.match.params.id;
        const post_detail = await getPostDetail(post_id);
        state.post = post_detail.post;
        state.post.category_id && (state.category = await getCategoryGenealogy(state.post.category_id));

        // Can only edit self-writed posts
        if (!this.props.user.authenticated || this.props.user.currentUser.id !== state.post.writer_id) {
            alert("You have no access to this page!");
            this.props.history.goBack();
        }

        this.setState({...state});
        
        // Enroll shortcuts
        this.props.dispatch(enroll_shortcut("h", () => this.props.history.push("/")));
        this.props.dispatch(enroll_shortcut("u", () => this.props.history.push("/post/write")));
    }

    componentWillUnmount() {
        this.props.dispatch(remove_shortcut("h"));
        this.props.dispatch(remove_shortcut("u"));
    }

    save_post = async data => {
        const saved_post = await editPost(
            data.post.id, 
            data.post.writer_id, 
            data.category ? data.category.id : null, 
            data.post.title, 
            data.post.text,
            data.post.is_private
        );
        this.props.dispatch(update_post(saved_post));
        return saved_post;
    }

    render() {
        if (!this.state.post) {
            return (<Loader />);
        } else {
            return (
                <div className={styles.post}>
                    <Helmet>
                        <title>Edit post</title>
                    </Helmet>
                    <WritePostForm
                        save_post={this.save_post}
                        post={this.state.post}
                        category={this.state.category}
                        history={this.props.history}
                    />
                </div>
            );
        }
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(EditPost);
