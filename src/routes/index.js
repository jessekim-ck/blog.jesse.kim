import React from 'react'
import {connect} from "react-redux";
import PostList from "../components/PostList";
import {getPostList} from "../apis/apis";
import {setPostList} from "../redux/actions";


class Index extends React.Component {

    async componentDidMount() {
        const postList = await getPostList()
        this.props.dispatch(setPostList(postList))
    }

    render() {
        return (
            <div>
                <PostList postList={this.props.postList} />
            </div>
        )
    }
}

const mapStateToProps = state => state.post

export default connect(mapStateToProps)(Index)