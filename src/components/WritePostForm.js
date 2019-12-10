import React from 'react'
import styles from '../app.module.css'
import button_ok from "../assets/button_ok.png";
import Form from 'react-bootstrap/Form'
import {getCategoryGenealogy, getPostDetail} from "../apis/apis";
import FloatButton from "./FloatButton";
import CategorySelector from "./CategorySelector";


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
        shortcut_prefix: "",
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

        window.addEventListener(
            'keydown',
            event => {
                if (event.key === "Meta") {
                    window.addEventListener('keydown', this.onKeyUp);
                }
            }
        )

        window.addEventListener(
            'keyup',
            event => {
                if (event.key === "Meta") {
                    window.removeEventListener('keydown', this.onKeyUp);
                }
            }
        )
    }

    onKeyUp = event => {
        if (event.key === "s") {
            event.preventDefault();
            this.props.save_post(this.state);
            this.setState({saved: true})
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
                <div className={styles.postDetailContainer}>
                    <div>
                        <input
                            className={styles.postDetailTitle}
                            type="text"
                            name="title"
                            placeholder="Title"
                            value={this.state.post.title}
                            onChange={event => this.handle_change(event)} />
                    </div>
                    <div>
                        <CategorySelector
                            handleSelectCategory={this.handleSelectCategory}
                            category={this.state.category} />
                    </div>
                    <div>
                        <Form.Control
                            as="textarea"
                            className={styles.postDetailText}
                            name="text"
                            rows="20"
                            placeholder="Write your post..."
                            value={this.state.post.text}
                            onChange={event => this.handle_change(event)} />
                    </div>
                    <div className={styles.floatButtonContainer}>
                        <FloatButton
                            source={button_ok}
                            handle_click={() => this.props.handle_write_post(this.state)} />
                    </div>
                </div>
            </form>
        )
    }
}

export default WritePostForm