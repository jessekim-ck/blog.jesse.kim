import React from 'react'
import {connect} from "react-redux";
import PostDetailView from '../components/PostDetailView'
import {getPostDetail} from "../apis/apis";


class PostDetail extends React.Component {

    // Should I process this information through Redux?
    state = {
        id: '',
        title: '',
        text: '',
    }

    async componentDidMount() {
        const state = await getPostDetail(this.props.match.params.id)
        this.setState({...state})
    }

    render() {
        return (
            <div>
                <PostDetailView post_detail={this.state} />
            </div>
        )
    }
}

export default connect()(PostDetail)