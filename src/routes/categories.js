import React from 'react'
import CategoryList from '../components/CategoryList'
import {getCategoryDetail, getCategoryList} from "../apis/apis";
import PostList from "../components/PostList";
import styles from "../app.module.css";
import {connect} from "react-redux";
import {setCurrentCategory} from '../redux/actions'
import FloatButton from "../components/FloatButton";
import button_add from '../assets/button_add.png'
import button_directory from '../assets/button_directory.png'
import CustomLink from "../components/CustomLink";


class Categories extends React.Component {

    updateCategoryList = async category_id => {
        let state = {}
        if (category_id) {
            state = await getCategoryDetail(category_id)
        } else {
            state.children_category_list = await getCategoryList()
            state.children_post_list = []
            state.category = {
                id: null,
                title: null,
                parent_category_id: null,
            }
        }

        this.props.dispatch(setCurrentCategory({...state}))
    }

    async componentDidMount() {
        const category_id = this.props.match.params.id
        if (category_id) {
            await this.updateCategoryList(category_id)
        } else {
            await this.updateCategoryList()
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            await this.updateCategoryList(this.props.match.params.id)
        }
    }

    render() {
        return (
            <div>
                <div>
                    <div>
                        <CustomLink to={`/category${ this.props.currentCategory.category.parent_category_id ? '/' + this.props.currentCategory.category.parent_category_id : '' }`}>
                            <div className={styles.categoryListCategory} >
                                {this.props.currentCategory.category.title ? `< ${this.props.currentCategory.category.title}` : 'Category'}
                            </div>
                        </CustomLink>
                        <div>
                            <CategoryList children_category_list={this.props.currentCategory.children_category_list} />
                        </div>
                    </div>
                    <div style={{ marginTop: 48 }}>
                        {
                            this.props.currentCategory.children_category_list.length !== 0 &&
                                this.props.currentCategory.children_post_list.length !== 0 &&
                                    <div className={styles.categoryListCategory}>
                                        {'Posts'}
                                    </div>
                        }
                        <div>
                            <PostList post_list={this.props.currentCategory.children_post_list} />
                        </div>
                    </div>
                </div>
                <div>
                    {
                        this.props.user.authenticated &&
                            <div className={styles.floatButtonContainer}>
                                <CustomLink to={`/category/${this.props.currentCategory.category.id}/write_post`}>
                                    <FloatButton source={button_add}/>
                                </CustomLink>
                                <div>
                                    <FloatButton source={button_directory}/>
                                </div>
                            </div>
                    }
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => ({ user: state.user, currentCategory: state.currentCategory })

export default connect(mapStateToProps)(Categories)