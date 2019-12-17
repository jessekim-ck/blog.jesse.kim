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
                    {props.post.writer} | {props.post.category || 'UNCATEGORIZED'} | {props.post.num_comments} comments
                </div>
                <div className={styles.body}>
                    {props.post.text}
                </div>
            </Link>
        </div>
    )
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