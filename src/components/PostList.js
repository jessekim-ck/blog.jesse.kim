import React from 'react'
import styles from '../app.module.css'
import CustomLink from "./CustomLink";


const PostItem = props => {

    return (
        <div className={styles.postListContainer} key={props.post.id}>
            <CustomLink to={`/post/${props.post.id}`}>
                <div className={styles.postListHeader}>
                    <div className={styles.postListTitle}>
                        {props.post.title}
                    </div>
                    <div className={styles.postListSubtitle}>
                        {props.post.writer} | {props.post.category || 'UNCATEGORIZED'} | {props.post.num_comments} comments
                    </div>
                </div>
                <div className={styles.postListBody}>
                    <div className={styles.postListText}>
                        {props.post.text}
                    </div>
                </div>
            </CustomLink>
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