import React from 'react'
import styles from '../app.module.css'
import CustomLink from "./CustomLink";


const CategoryItem = props => {

    return (
        <div className={styles.categoryListContainer}>
            <CustomLink to={`/category/${props.category.id}`}>
                <div className={styles.categoryListTitle} >
                    {props.category.title}
                </div>
            </CustomLink>
            <div className={styles.categoryListDescription}>
                {props.category.description}
            </div>
        </div>
    )
}

const CategoryList = props => {
    const category_list = props.children_category_list.map(
        category => <CategoryItem
            key={category.id}
            category={{...category}} />
    )
    return (
        <div>
            <div>
                {category_list}
            </div>
        </div>
    )
}

export default CategoryList