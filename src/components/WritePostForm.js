import React from 'react';
import styles from '../app.module.css';
import {getCategoryGenealogy} from "../apis/apis";
import FloatButton from "./FloatButton";
import button_ok from "../assets/button_ok.png";
import CategorySelector from "./CategorySelector";
import TextareaAutosize from 'react-textarea-autosize';
import {connect} from 'react-redux';
import {enroll_shortcut, remove_shortcut} from '../redux/actions';
import {Prompt} from "react-router-dom";


class ToastMessage extends React.Component {

    state = {
        visible: false
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.saved && this.props.saved) {
            this.setState({visible: true});
            this.timeout = setTimeout(
                () => this.setState({visible: false}), 1500
            );
        }
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    render() {
        if (!this.state.visible) {
            return null;
        } else {
            const now = new Date();
            return (
                <div className={styles.toast}>
                    {`Saved at ${now.getFullYear()}-${now.getMonth()}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`}
                </div>
            );
        }        
    }
}

class WritePostForm extends React.Component {

    state = {
        post: {
            title: '',
            text: '',
            is_private: false,
        },
        category: null,
        saved: true,
    }

    async componentDidMount() {
        this.props.dispatch(enroll_shortcut("s", this.save_post));
        this.props.dispatch(enroll_shortcut("b", () => this.decorate_text("**")));
        this.props.dispatch(enroll_shortcut("i", () => this.decorate_text("*")));
        this.props.dispatch(enroll_shortcut("m", () => this.decorate_text("$")));
    }

    componentDidUpdate(prevProps) {
        const is_post_changed = prevProps.post !== this.props.post;
        const is_category_changed = prevProps.category !== this.props.category;
        if (is_post_changed || is_category_changed) {
            const post = this.props.post || {title: "", text: "", is_private: false};
            const category = this.props.category || null;
            this.setState({post, category});
        }
    }

    componentWillUnmount() {
        this.props.dispatch(remove_shortcut("s"));
        this.props.dispatch(remove_shortcut("b"));
        this.props.dispatch(remove_shortcut("i"));
        this.props.dispatch(remove_shortcut("$"));
        window.onbeforeunload = null;
    }

    decorate_text = letter => {
        const body = document.getElementById("post_body");
        const start = body.selectionStart;
        const end = body.selectionEnd;
        const text = this.state.post.text;
        const len = letter.length;

        let new_text = ""
        let new_start = 0;
        let new_end = 0;

        if (
            text.substring(start - len, start) === letter &&
            text.substring(end, end + len) === letter
        ) {
            // remove decoration when the text is already decorated
            new_text = text.substring(0, start - len) +
                text.substring(start, end) +
                text.substring(end + len, text.length);
            new_start = start - len;
            new_end = end - len;
        } else {
            // add decoration when the text is not decorated
            new_text = text.substring(0, start) +
                letter + text.substring(start, end) + letter +
                text.substring(end, text.length);
            new_start = start + len;
            new_end = end + len;
        }

        this.setState({post: {...this.state.post, text: new_text}});
        this.unsave_post();

        body.selectionStart = new_start;
        body.selectionEnd = new_end;
    }

    save_post = async () => {
        if (this.state.saved) {
            this.props.post && this.props.history.push(`/post/${this.props.post.id}`);
        } else {
            try {
                this.setState({saved: true});
                await this.props.save_post(this.state);
                window.onbeforeunload = null;
            } catch (err) {
                this.unsave_post();
            }
        }
    }

    unsave_post = () => {
        this.setState({saved: false});
        window.onbeforeunload = () => true;
    }

    handleSelectCategory = async category_id => {
        const category = await getCategoryGenealogy(category_id);
        this.setState({category: category});
    }

    handle_change = event => {
        const name = event.target.name;
        let value;
        if (event.target.type === "checkbox") {
            value = event.target.checked;
        } else {
            value = event.target.value;
        }
        this.setState({post: {...this.state.post, [name]: value}});
        this.unsave_post();
    }

    render() {
        return (
            <div>
                <form>
                    <input
                        className={styles.title}
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={this.state.post.title}
                        onChange={event => this.handle_change(event)}
                    />
                    <div className={styles.options}>
                        <CategorySelector
                            handleSelectCategory={this.handleSelectCategory}
                            category={this.state.category}
                        />
                        <input 
                            className={styles.checkbox}
                            type="checkbox"
                            name="is_private"
                            checked={this.state.post.is_private}
                            onChange={event => this.handle_change(event)}
                        />
                    </div>
                    <TextareaAutosize
                        id="post_body"
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
                        handle_click={() => this.props.save_post(this.state)}
                    />
                    <ToastMessage saved={this.state.saved}/>
                </form>
                <Prompt
                    when={!this.state.saved}
                    message="Changes you made may not be saved."
                />
            </div>
        );
    }
}

export default connect()(WritePostForm);
