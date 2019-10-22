import React from 'react'
import {connect} from "react-redux";
import PostList from "../components/PostList";
import {getRecentPostList} from "../apis/apis";
import {setRecentPostList} from "../redux/actions";
import styles from "../app.module.css";


class Index extends React.Component {

    async componentDidMount() {
        const postList = await getRecentPostList()
        this.props.dispatch(setRecentPostList(postList))
    }

    render() {
        return (
            <div>
                <div className={styles.categoryListCategory}>
                    {'Recents'}
                </div>
                <div>
                    <PostList post_list={this.props.recentPostList} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => state.recentPost

export default connect(mapStateToProps)(Index)