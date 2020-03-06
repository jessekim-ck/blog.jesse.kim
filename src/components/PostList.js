import React from 'react'
import styles from '../app.module.css'
import {Link} from "react-router-dom";


const PostItem = props => {

    return (
        <div key={props.post.id} className={styles.postListItem}>
            <Link className={styles.touchable} to={`/post/${props.post.id}`}>
                <div className={styles.title}>
                    {props.post.title}
                </div>
                <div className={styles.description}>
                    {
                        `${props.post.writer} | ` +
                        `${props.post.category || 'UNCATEGORIZED'} | ` +
                        `${props.post.num_comments} comments` +
                        (props.post.is_private ? ` (private)` : "")
                    }
                </div>
                <div className={styles.body}>
                    {
                        props.post.text.replace(
                            // Remove markdown syntaxes from preview
                            /(\*+|---)/gi, ""
                        ).replace(
                            // Parse arrow
                            /-->/gi, "→"
                        ).replace(
                            // Remove math/code blocks from preview
                            /(\$\$|~~~|```)(\n|.)+?(\$\$|~~~|```)/gi, ""
                        ).replace(
                            // Handle titles
                            /#+ (.*)\n+/gi, "$1. "
                        ).replace(
                            // Handle multiple new lines
                            /\n+/gi, "\n"
                        )
                    }
                </div>
            </Link>
        </div>
    );
}


const PostList = props => {
    const post_list = props.post_list.map(
        post => <PostItem post={{...post}} key={post.id} />
    )

    return (
        <div>
            {post_list}
        </div>
    )
}

export default PostList