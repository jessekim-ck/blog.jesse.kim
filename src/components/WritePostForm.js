import React from 'react';
import styles from '../app.module.css';
import {getCategoryGenealogy, getPostDetail} from "../apis/apis";
import FloatButton from "./FloatButton";
import button_ok from "../assets/button_ok.png";
import CategorySelector from "./CategorySelector";
import TextareaAutosize from 'react-textarea-autosize';
import { connect } from 'react-redux';
import { enroll_shortcut, remove_shortcut } from '../redux/actions';


class ToastMessage extends React.Component {

    state = {
        visible: false
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.saved && this.props.saved) {
            this.setState({visible: true})
            setTimeout(
                () => this.setState({visible: false}),
                1500
            )
        }
    }

    render() {

        if (!this.state.visible) {
            return null
        }

        const now = new Date()

        return (
            <div className={styles.toast}>
                Saved at {`${now.getFullYear()}-${now.getMonth()}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`}
            </div>
        )
    }
}

class WritePostForm extends React.Component {

    state = {
        post: {
            title: '',
            text: '',
        },
        category: {
            id: null,
            title: null,
        },
        saved: true,
    }

    async componentDidMount() {
        const post_id = await this.props.post_id
        const category_id = await this.props.category_id
        const state = {}
        if (post_id) {
            // When editing post
            const post_detail = await getPostDetail(post_id)
            state.post = await post_detail.post
            if (state.post.category_id) {
                state.category = await getCategoryGenealogy(state.post.category_id)
            }
        } else if (category_id) {
            // When creating post with selected category - now not used
            state.category = await getCategoryGenealogy(category_id)
        }
        this.setState({...state})

        this.props.dispatch(enroll_shortcut("s", this.save_post))
    }

    componentWillUnmount() {
        this.props.dispatch(remove_shortcut("s"))
    }

    save_post = () => {
        if (this.state.saved) {
	    this.props.handle_write_post(this.state)
	} else {
	    this.props.save_post(this.state);
            this.setState({saved: true});
	}
    }

    handleSelectCategory = async category_id => {
        const category = await getCategoryGenealogy(category_id)
        this.setState({category: category})
    }

    handle_change = event => {
        const name = event.target.name
        const value = event.target.value
        this.setState({
            post: {
                ...this.state.post,
                [name]: value
            }
        })
        this.setState({saved: false})
    }

    render() {
        return (
            <form>
                <input
                    className={styles.title}
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={this.state.post.title}
                    onChange={event => this.handle_change(event)}
                />
                <CategorySelector
                    handleSelectCategory={this.handleSelectCategory}
                    category={this.state.category}
                />
                <TextareaAutosize
                    className={styles.body}
                    minRows={12}
                    as="textarea"
                    name="text"
                    placeholder="Write your post..."
                    value={this.state.post.text}
                    onChange={event => this.handle_change(event)}
                />
                <FloatButton
                    source={button_ok}
                    handle_click={() => this.props.handle_write_post(this.state)}
                />
                <ToastMessage saved={this.state.saved}/>
            </form>
        )
    }
}

export default connect()(WritePostForm)
