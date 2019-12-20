import React from 'react';
import styles from "../app.module.css";
import format_datetime from "../utils/format_datetime";
import MarkdownRenderer from "./MarkdownRenderer";

import {connect} from "react-redux";


class PostDetailView extends React.Component {

    render() {
        return (
            <div>
                <div className={styles.subtitle}>
                    {this.props.post_detail.category || 'UNCATEGORIZED'}
                </div>
                <div className={styles.title}>
                    {this.props.post_detail.title}
                </div>
                <div className={styles.description}>
                    <div>
                        writer: {this.props.post_detail.writer}
                    </div>
                    <div>
                        created: {format_datetime(this.props.post_detail.created)}
                    </div>
                    <div>
                        last updated: {format_datetime(this.props.post_detail.updated)}
                    </div>
                </div>
                <div className={styles.body}>
                    <MarkdownRenderer 
                        source={this.props.post_detail.text.replace(/-->/gi, "$\\rightarrow$")}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => state

export default connect(mapStateToProps)(PostDetailView)
