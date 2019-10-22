import React from "react"
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import {getCategoryDetail, getCategoryList} from "../apis/apis";
import styles from "../app.module.css"
import CustomLink from "../components/CustomLink";


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

    children_post_items = () => this.state.children_post_list.map(
        post => (
            <CustomLink to={`/post/${post.id}`}>
                <Card.Body className={styles.categoryListChildPost} key={post.id}>
                        {post.title}
                </Card.Body>
            </CustomLink>
        )
    )


    render() {
        return (
            <Accordion className={styles.categoryList}>
                <Accordion.Toggle
                    className={styles.categoryListHeader}
                    eventKey={this.props.category.id}
                    as={Card.Header}>
                    <div className={styles.categoryListTitle}>{this.props.category.title}</div>
                    <div className={styles.categoryListDescription}>{this.props.category.description}</div>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={this.props.category.id}>
                    <div className={styles.categoryListChild}>
                        <div>
                            {this.children_category_items()}
                        </div>
                        <div>
                            {this.children_post_items()}
                        </div>
                    </div>
                </Accordion.Collapse>
            </Accordion>
        )
    }
}


class Category extends React.Component {

    state = {
        category_list: [],
    }

    async componentDidMount() {
        const category_list = await getCategoryList()
        this.setState({category_list})
    }

    parent_category_items = () => this.state.category_list.map(
        category => <CategoryItem category={{...category}} key={category.id} />
    )

    render() {
        return (
            <div>
                <div className={styles.categoryListCategory}>Category</div>
                {this.parent_category_items()}
            </div>
        )
    }
}

export default Category