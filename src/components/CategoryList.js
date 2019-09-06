import React from 'react'
import styles from '../app.module.css'
import CustomLink from "./CustomLink";


const CategoryItem = props => {

    return (
        <div className={styles.categoryListContainer}>
            <CustomLink to={`/category/${props.categoryDetail.id}`}>
                <div className={styles.categoryListTitle}
                     // onClick={() => props.updateCategoryList(props.categoryDetail.id)}
                >
                    {props.categoryDetail.title}
                </div>
            </CustomLink>
            <div className={styles.categoryListDescription}>
                {props.categoryDetail.description}
            </div>
        </div>
    )
}

const CategoryList = props => {
    const categoryItems = props.categoryList.map(
        categoryItem => <CategoryItem
            key={categoryItem.id}
            categoryDetail={{...categoryItem}}
            // updateCategoryList={props.updateCategoryList}
        />
    )
    return (
        <div>
            <div>
                {categoryItems}
            </div>
        </div>
    )
}

export default CategoryList