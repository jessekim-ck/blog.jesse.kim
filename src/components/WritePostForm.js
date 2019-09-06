import React from 'react'
import styles from '../app.module.css'
import button_ok from "../assets/button_ok.png";
import Form from 'react-bootstrap/Form'
import {getCategoryDetailRecursive, getCategoryList, getPostDetail} from "../apis/apis";
import FloatButton from "./FloatButton";
import CategorySelector from "./CategorySelector";


class WritePostForm extends React.Component {

    state = {
        title: '',
        text: '',
        category: {
            id: null,
            title: null,
        },
    }

    async componentDidMount() {
        const post_id = await this.props.post_id
        if (post_id) {
            const postDetail = await getPostDetail(post_id)
            const category = await getCategoryDetailRecursive(postDetail.category_id)
            const childrenCategory = await getCategoryList(postDetail.category_id)
            this.setState({...postDetail, category, childrenCategory})
        }
        const category_id = await this.props.category_id
        if (category_id) {
            const category = await getCategoryDetailRecursive(category_id)
            this.setState({category})
        }
    }

    handleSelectCategory = async category_id => {
        const category = await getCategoryDetailRecursive(category_id)
        this.setState({category})
    }

    handle_change = event => {
        const name = event.target.name
        const value = event.target.value
        this.setState({
            [name]: value
        })
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
                            value={this.state.title}
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
                            value={this.state.text}
                            onChange={event => this.handle_change(event)} />
                    </div>
                    <div>
                        <FloatButton
                            source={button_ok}
                            handle_click={() => this.props.handle_write_post(this.state)}/>
                    </div>
                </div>
            </form>
        )
    }
}

export default WritePostForm