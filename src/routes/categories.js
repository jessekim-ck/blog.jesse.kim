import React from 'react'
import CategoryList from '../components/CategoryList'
import {getCategoryDetail, getCategoryList, getPostList} from "../apis/apis";
import PostList from "../components/PostList";
import styles from "../app.module.css";
import {connect} from "react-redux";
import {CATEGORY, POST} from '../redux/reducers'
import {loadCategoryChildren} from '../redux/actions'
import FloatButton from "../components/FloatButton";
import button_add from '../assets/button_add.png'
import button_directory from '../assets/button_directory.png'
import CustomLink from "../components/CustomLink";


class Categories extends React.Component {

    updateCategoryList = async category_id => {
        const state = {};

        // Get children of current category
        const childrenCategories = await getCategoryList(category_id)

        // If no child category
        if (childrenCategories.length === 0) {
            const childrenPosts = await getPostList(category_id)
            // If no child post too
            if (childrenPosts.length === 0) {
                state.list = []
                state.categoryOrPost = null
            } else {
                state.list = childrenPosts
                state.categoryOrPost = POST
            }
        } else {
            state.list = childrenCategories
            state.categoryOrPost = CATEGORY
        }

        // Get new category information
        if (category_id) {
            state.category = await getCategoryDetail(category_id)
        } else {
            state.category = {
                id: null,
                title: null,
                parent_category_id: null,
            }
        }
        this.props.dispatch(loadCategoryChildren(state.category, state.categoryOrPost, state.list))
    }

    async componentDidMount() {
        await this.updateCategoryList()
    }

    renderButton = () => {
        switch (this.props.category.categoryOrPost) {
            case CATEGORY:
                return (
                    <div>
                        <FloatButton source={button_directory}/>
                    </div>
                )
            case POST:
                return (
                    <CustomLink to={`/category/${this.props.category.category.id}/write_post`}>
                        <FloatButton source={button_add}/>
                    </CustomLink>
                )
            default:
                return (
                    <CustomLink to={`/category/${this.props.category.category.id}/write_post`}>
                        <FloatButton source={button_add}/>
                    </CustomLink>
                )
        }
    }

    render() {
        const renderList = () => {
            switch (this.props.category.categoryOrPost) {
                case CATEGORY:
                    return (
                        <div>
                            <CategoryList
                                categoryList={this.props.category.list}
                                updateCategoryList={this.updateCategoryList} />
                        </div>
                    )
                case POST:
                    return (
                        <div>
                            <PostList postList={this.props.category.list} />
                        </div>
                    )
                default:
                    return (
                        <div>
                            Nothing's there
                        </div>
                    )
            }
        }

        return (
            <div>
                <div
                    className={styles.categoryListCategory}
                    onClick={() => this.updateCategoryList(this.props.category.category.parent_category_id)} >
                    {this.props.category.category.title ? `< ${this.props.category.category.title}` : 'Category'}
                </div>
                {renderList()}
                <div>
                    {this.props.user.authenticated && this.renderButton()}
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => ({ category: state.category, user: state.user })

export default connect(mapStateToProps)(Categories)