import React from 'react';
import PostList from "../components/PostList";
import {getCategoryDetail} from "../apis/apis";
import {Helmet} from "react-helmet";
import styles from "../app.module.css";

import {connect} from "react-redux";
import {enroll_shortcut, remove_shortcut} from "../redux/actions";

import Loader from "../components/Loader";


class Category extends React.Component {

    state = {
        category: null,
        children_post_list: null
    }

    componentDidMount() {
        this.update_category_detail();
        this.props.dispatch(enroll_shortcut("h", () => this.props.history.push("/")));
        this.props.dispatch(enroll_shortcut("u", () => this.props.history.push(`/category/${this.state.category.id}/write`)));
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.update_category_detail();
        }
    }

    componentWillUnmount() {
        this.props.dispatch(remove_shortcut("h"));
        this.props.dispatch(remove_shortcut("u"));
    }

    update_category_detail = async () => {
        const category_id = this.props.match.params.id;
        const category_detail = await getCategoryDetail(category_id);
        this.setState({...category_detail});
    }

    render() {
        if (!this.state.category) {
            return (<Loader />);
        } else {
            return (
                <div>
                    <Helmet>
                        <title>Jessekim's Blog</title>
                        <meta name="description" content="제씨킴의 데이터사이언스 프로그래밍 일상 블로그"/>
                        <link rel="canonical" href="https://blog.jesse.kim"/>
                    </Helmet>
                    <div className={styles.postList}>
                        <div className={styles.title}>{this.state.category.title}</div>
                        <div className={styles.description}>{this.state.category.description}</div>
                        <PostList post_list={this.state.children_post_list}/>
                    </div>
                </div>
            );
        }
    }
}

export default connect()(Category);
