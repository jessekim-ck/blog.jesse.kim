import React from 'react';
import WritePostForm from '../components/WritePostForm';
import {editPost} from "../apis/apis";
import Unauthorized from "../components/Unauthorized";
import {Helmet} from "react-helmet";
import styles from "../app.module.css";

import {connect} from "react-redux";
import {enroll_shortcut, remove_shortcut} from "../redux/actions"


class EditPost extends React.Component {

    componentDidMount() {
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
        if (!this.props.authenticated) {
            return (
                <Unauthorized/>
            )
        }
        return (
            <div className={styles.post}>
                <Helmet>
                    <title>Edit post</title>
                </Helmet>
                <WritePostForm
                    handle_write_post={this.handle_write_post}
                    save_post={this.save_post}
                    post_id={this.props.match.params.id}
                />
            </div>
        )
    }
}

const mapStateToProps = state => state.user

export default connect(mapStateToProps)(EditPost)
