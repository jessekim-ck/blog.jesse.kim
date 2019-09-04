import React from 'react'
import WritePostForm from '../components/WritePostForm'
import { connect } from "react-redux";
import { editPost } from "../apis/apis";
import Unauthorized from "../components/Unauthorized";


class EditPost extends React.Component {

    handle_write_post = async data => {
        await editPost(data.id, data.writer_id, data.title, data.text)
        this.props.history.push(`/post/${this.props.match.params.id}`)
    }

    render() {
        if (!this.props.authenticated) {
            return (
                <Unauthorized/>
            )
        }
        return (
            <div>
                <WritePostForm
                    handle_write_post={this.handle_write_post}
                    post_id={this.props.match.params.id} />
            </div>
        )
    }
}

const mapStateToProps = state => state.user

export default connect(mapStateToProps)(EditPost)