import React from 'react'
import {connect} from "react-redux";
import PostList from "../components/PostList";
import {getPostList} from "../apis/apis";
import {setPostList} from "../redux/actions";
import styles from "../app.module.css";


class Index extends React.Component {

    async componentDidMount() {
        const postList = await getPostList()
        this.props.dispatch(setPostList(postList))
    }

    render() {
        return (
            <div>
                <div className={styles.categoryListCategory}>
                    {'Recents'}
                </div>
                <div>
                    <PostList postList={this.props.postList} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => state.post

export default connect(mapStateToProps)(Index)