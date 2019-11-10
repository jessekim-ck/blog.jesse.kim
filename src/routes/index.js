import React from 'react'
import {connect} from "react-redux";
import PostList from "../components/PostList";
import {getPostList} from "../apis/apis";
import styles from "../app.module.css";


class Index extends React.Component {

    async componentDidMount() {
        const post_list = await getPostList()
        this.setState({post_list})
    }

    state = {
        post_list: []
    }

    render() {
        return (
            <div>
                <div className={styles.categoryListCategory}>
                    {'Recents'}
                </div>
                <div>
                    <PostList post_list={this.state.post_list} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => state.recentPost

export default connect(mapStateToProps)(Index)