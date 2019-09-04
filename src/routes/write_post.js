import React from 'react'
import WritePostForm from '../components/WritePostForm'
import { writePost } from "../apis/apis";
import { connect } from "react-redux";

class WritePost extends React.Component {

    handle_write_post = async data => {
        const writer_id = await this.props.currentUser.id
        const post = await writePost(writer_id, data.category.id, data.title, data.text)
        this.props.history.push(`/post/${post.id}`)
    }

    render() {
        return (
            <WritePostForm
                handle_write_post={this.handle_write_post}
                category_id={this.props.match ? this.props.match.params.id : null} />
        )
    }
}

const mapStateToProps = state => state.user

export default connect(mapStateToProps)(WritePost)