import React from "react"
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import {getCategoryDetail, getCategoryList} from "../apis/apis";
import styles from "../app.module.css";
import {connect} from "react-redux";
import {Link} from "react-router-dom";


const PostItem = props => {

    const children_post_items = () => props.children_post_list.map(
        post => (
            <Link
                className={styles.touchable}
                to={`/post/${post.id}`} 
                key={post.id}
            >
                <Card.Body className={styles.contentNavItem}>
                    {post.title}
                </Card.Body>
            </Link>
        )
    )

    return children_post_items()
}


class CategoryItem extends React.Component {

    state = {
        children_category_list: [],
        children_post_list: [],
    }

    update_category_list = async category_id => {
        const state = await getCategoryDetail(category_id)
        this.setState({...state})
    }

    async componentDidMount() {
        await this.update_category_list(this.props.category.id)
    }

    children_category_items = () => this.state.children_category_list.map(
        category => <CategoryItem category={{...category}} key={category.id}/>
    )

    render() {
        return (
            <Accordion>
                <Accordion.Toggle
                    className={styles.contentNavItem}
                    eventKey={this.props.category.id}
                    as={Card.Header}
                >
                    <div className={styles.title}>
                        {this.props.category.title}
                    </div>
                    <div className={styles.description}>
                        {this.props.category.description} | {this.props.category.num_total_posts} posts
                    </div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={this.props.category.id}>
                    <div className={styles.contentNavChildren}>
                        <div>
                            {this.children_category_items()}
                        </div>
                        <div>
                            <PostItem children_post_list={this.state.children_post_list}/>
                        </div>
                    </div>
                </Accordion.Collapse>
            </Accordion>
        )
    }
}


class ContentNavigator extends React.Component {

    state = {
        children_category_list: [],
        children_post_list: [],
    }

    async componentDidMount() {
        const state = await getCategoryList()
        this.setState({...state})
    }

    parent_category_items = () => this.state.children_category_list.map(
        category => <CategoryItem category={{...category}} key={category.id} />
    )

    render() {
        return (
            <div className={styles.sidebar}>
                <div className={styles.contentNav}>
                    {this.parent_category_items()}
                    <PostItem children_post_list={this.state.children_post_list}/>
                </div>
                <div className={styles.authentication}>
                    {
                        this.props.authenticated ?
                        <div>
                            Logged in as {this.props.currentUser.username}
                            <div 
                                className={styles.touchable}
                                onClick={this.props.handle_logout}
                            >
                                LOGOUT
                            </div>
                        </div> :
                        <Link className={styles.touchable} to={"/login"}>
                            LOGIN
                        </Link>
                    }
                    
                </div>    
            </div>
            
        )
    }
}

const mapStateToProps = state => state.user

export default connect(mapStateToProps)(ContentNavigator)
