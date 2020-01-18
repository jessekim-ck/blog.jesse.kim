import React from 'react';
import {writePost, getCategoryGenealogy} from "../apis/apis";
import styles from '../app.module.css';
import WritePostForm from '../components/WritePostForm';

import {connect} from "react-redux";
import {enroll_shortcut, remove_shortcut} from "../redux/actions"


class WritePost extends React.Component {

    state = {
        category: null
    }

    async componentDidMount() {
        if (!this.props.authenticated) {
            alert("You have no access to this page!");
            this.props.history.goBack();
        }

        const category_id = this.props.match.params.id

        if (category_id) {
            const category = await getCategoryGenealogy(category_id);
            this.setState({category});
        }

        this.props.dispatch(enroll_shortcut("h", () => this.props.history.push("/")));
        this.props.dispatch(enroll_shortcut("u", () => this.props.history.push("/post/write")));
    }

    componentWillUnmount() {
        this.props.dispatch(remove_shortcut("h"));
        this.props.dispatch(remove_shortcut("u"));
    }

    // handle_write_post = async data => {
    //     const saved_post = await this.save_post(data);
    //     this.props.history.push(`/post/${saved_post.id}`);
    // }

    save_post = async data => {
        const writer_id = await this.props.currentUser.id;
        const saved_post = await writePost(writer_id, data.category.id, data.post.title, data.post.text);
        this.props.history.push(`/post/${saved_post.id}/edit`);
        return;
    }

    render() {
        return (
            <div className={styles.post}>
                <WritePostForm
                    save_post={this.save_post}
                    category={this.state.category}
                    history={this.props.history}
                />
            </div>
        )
    }
}

const mapStateToProps = state => state.user

export default connect(mapStateToProps)(WritePost)
