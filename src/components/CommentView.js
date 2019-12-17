import React from 'react'
import Form from "react-bootstrap/Form";
import styles from "../app.module.css";


const CommentRow = props => (
    <div className={styles.commentRow}>
        <div className={styles.commentRowNickname}>
            {props.comment.nickname || 'Stranger'}
        </div>
        <div className={styles.commentRowText}>
            {props.comment.text}
        </div>
    </div>
)

class CommentForm extends React.Component {

    state = {
        nickname: '',
        text: ''
    }

    handle_change = event => {
        const name = event.target.name
        const value = event.target.value
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <div className={styles.commentForm}>
                <div className={styles.commentFormHeader}>
                    <input
                        className={styles.commentFormNickname}
                        type="text"
                        name="nickname"
                        placeholder="Nickname"
                        value={this.state.nickname}
                        onChange={event => this.handle_change(event)}
                    />
                    <div
                        className={styles.commentFormButton}
                        onClick={() => {
                            this.props.handleWriteComment(this.state.nickname, this.state.text)
                            this.setState({nickname: '', text: ''})
                        }}>
                        Comment
                    </div>
                </div>
                <Form.Control
                    as="textarea"
                    className={styles.commentFormText}
                    name="text"
                    rows="3"
                    placeholder="You can comment anything, but it can be deleted."
                    value={this.state.text}
                    onChange={event => this.handle_change(event)}
                />
            </div>
        )
    }
}


const CommentView = props => {

    const comment_list = props.comment_list.map(
        comment => <CommentRow comment={comment} key={comment.id} />
    )

    return (
        <div className={styles.comment}>
            {comment_list}
            <CommentForm handleWriteComment={props.handleWriteComment} />
        </div>
    )
}

export default CommentView
