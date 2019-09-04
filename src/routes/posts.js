import React from 'react'
import PostList from "../components/PostList";
import {getPostList} from "../apis/apis";


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
                <PostList postList={this.state.postList} />
            </div>
        )
    }
}


export default Posts