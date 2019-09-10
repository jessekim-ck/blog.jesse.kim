import React from 'react'
import styles from '../app.module.css'
import CustomLink from "./CustomLink";

const PostItem = props => {
    const created = new Date(props.post.created)
    const
        year_created = created.getFullYear(),
        month_created = ('0' + (1 + created.getMonth())).slice(-2),
        date_created = ('0' + created.getDate()).slice(-2),
        hour_created = ('0' + created.getHours()).slice(-2),
        minute_created = ('0' + created.getMinutes()).slice(-2)

    return (
        <div className={styles.postListContainer} key={props.post.id}>
            <CustomLink to={`/post/${props.post.id}`}>
                <div className={styles.postListHeader}>
                    <div className={styles.postListTitle}>
                        {props.post.title}
                    </div>
                    <div className={styles.postListSubtitle}>
                        {props.post.category || 'UNCATEGORIZED'} | {year_created}-{month_created}-{date_created} {hour_created}:{minute_created}
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