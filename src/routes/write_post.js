import React from 'react';
import {writePost, getCategoryGenealogy} from "../apis/apis";
import styles from '../app.module.css';

import {connect} from "react-redux";
import {enroll_shortcut, remove_shortcut, update_post} from "../redux/actions"

import WritePostForm from '../components/WritePostForm';
import Loader from 'react-spinners/PulseLoader';


class WritePost extends React.Component {

    state = {
        category: null,
        render: false,
    }

    async componentDidMount() {
        if (!this.props.user.authenticated) {
            alert("You have no access to this page!");
            this.props.history.goBack();
        }

        const category_id = this.props.match.params.id;
        category_id && await this.update_category(category_id); // wait until category is loaded!

        this.props.dispatch(enroll_shortcut("h", () => this.props.history.push("/")));
        this.props.dispatch(enroll_shortcut("u", () => this.props.history.push("/post/write")));

        this.setState({render: true});
    }

    componentDidUpdate(prevProps) {
        const is_history_changed = prevProps.match.params.id !== this.props.match.params.id
        is_history_changed && this.update_category(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.dispatch(remove_shortcut("h"));
        this.props.dispatch(remove_shortcut("u"));
    }

    update_category = async category_id => {
        const category = category_id ? await getCategoryGenealogy(category_id) : null;
        this.setState({category});
    }

    save_post = async data => {
        const writer_id = this.props.user.currentUser.id;
        const saved_post = await writePost(
            writer_id,
            data.category ? data.category.id : null,
            data.post.title,
            data.post.text,
            data.post.is_private
        );
        this.props.dispatch(update_post(saved_post));
        this.props.history.push(`/post/${saved_post.id}/edit`);
    }

    render() {
        if (!this.state.render) {
            return (<Loader />);
        } else {
            return (
                <div className={styles.post}>
                    <WritePostForm
                        save_post={this.save_post}
                        post={null}
                        category={this.state.category}
                        history={this.props.history}
                    />
                </div>
            );
        }
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(WritePost);
