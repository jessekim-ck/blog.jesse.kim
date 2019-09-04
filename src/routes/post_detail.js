import React from 'react'
import {connect} from "react-redux";
import PostDetailView from '../components/PostDetailView'
import {getPostDetail} from "../apis/apis";


class PostDetail extends React.Component {

    // Should I process this information through Redux?
    state = {
        postDetail: {
            id: '',
            title: '',
            text: '',
        }
    }

    async componentDidMount() {
        const postDetail = await getPostDetail(this.props.match.params.id)
        this.setState({
            postDetail
        })
    }

    render() {
        return (
            <div>
                <PostDetailView postDetail={this.state.postDetail} />
            </div>
        )
    }
}

export default connect()(PostDetail)