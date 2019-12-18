import React from 'react'
import WritePostForm from '../components/WritePostForm'
import {writePost} from "../apis/apis";
import styles from '../app.module.css';

import {connect} from "react-redux";
import {enroll_shortcut, remove_shortcut} from "../redux/actions"


class WritePost extends React.Component {

    componentDidMount() {
        this.props.dispatch(enroll_shortcut("h", () => this.props.history.push("/")));
        this.props.dispatch(enroll_shortcut("u", () => this.props.history.push("/post/write")));
    }

    componentWillUnmount() {
        this.props.dispatch(remove_shortcut("h"));
        this.props.dispatch(remove_shortcut("u"));
    }

    handle_write_post = async data => {
        const saved_post = await this.save_post(data)
        this.props.history.push(`/post/${saved_post.id}`)
    }

    save_post = async data => {
        const writer_id = await this.props.currentUser.id
        const post = await writePost(writer_id, data.category.id, data.post.title, data.post.text)
        return post
    }

    render() {
        return (
            <div className={styles.post}>
                <WritePostForm
                    handle_write_post={this.handle_write_post}
                    save_post={this.handle_write_post}
                    category_id={this.props.match ? this.props.match.params.id : null}
                />
            </div>
            
        )
    }
}

const mapStateToProps = state => state.user

export default connect(mapStateToProps)(WritePost)
