import React from 'react'
import styles from "../app.module.css";
import CodeBlock from './CodeBlock'
import CustomLink from "./CustomLink";
import button_edit from "../assets/button_edit.png";
import {connect} from "react-redux";
import ReactMarkdown from 'react-markdown'
import FloatButton from "./FloatButton";
import format_datetime from "../utils/format_datetime"

class PostDetailView extends React.Component {

    render() {
        return (
            <div >
                <CustomLink to={ this.props.post_detail.category_id ? `/category/${this.props.post_detail.category_id}` : '/category'}>
                    <div className={styles.postDetailCategory}>
                        {this.props.post_detail.category || 'UNCATEGORIZED'}
                    </div>
                </CustomLink>
                <div className={styles.postDetailTitle}>
                    {this.props.post_detail.title}
                </div>
                <div className={styles.postDetailSubtitle}>
                    <div>
                        Writer: {this.props.post_detail.writer}
                    </div>
                    <div>
                        Created: {format_datetime(this.props.post_detail.created)}
                    </div>
                    <div>
                        Last Updated: {format_datetime(this.props.post_detail.updated)}
                    </div>
                </div>
                <div className={styles.postDetailText}>
                    <ReactMarkdown
                        source={this.props.post_detail.text}
                        renderers={{code: CodeBlock}} />
                </div>
                {
                    this.props.user.authenticated &&
                    <CustomLink
                        to={`/post/${this.props.post_detail.id}/edit`}
                        className={styles.floatButtonContainer} >
                        <FloatButton source={button_edit} />
                    </CustomLink>
                }
            </div>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(PostDetailView)