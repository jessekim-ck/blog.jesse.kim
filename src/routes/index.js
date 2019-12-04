import React from 'react'
import {connect} from "react-redux";
import PostList from "../components/PostList";
import {getPostList} from "../apis/apis";
import styles from "../app.module.css";
import {Helmet} from "react-helmet"

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
                <Helmet>
                    <title>Jessekim's Blog</title>
                    <meta name="description" content="제씨킴의 데이터사이언스 프로그래밍 일상 블로그"/>
                    <link rel="canonical" href="https://blog.weekend.kim"/>
                </Helmet>
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

export default connect()(Index)