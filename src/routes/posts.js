import React from 'react'
import PostList from "../components/PostList";
import {getPostList} from "../apis/apis";
import styles from '../app.module.css'


class Posts extends React.Component {

    state = {
        postList: []
    }

    async componentDidMount() {
        const postList = await getPostList(this.props.match.params.id)
        this.setState({postList})
    }

    render() {
        return (
            <div>
                <div className={styles.postDetailCategory}>
                    {'Recents'}
                </div>
                <div>
                    <PostList postList={this.state.postList} />
                </div>
            </div>
        )
    }
}


export default Posts