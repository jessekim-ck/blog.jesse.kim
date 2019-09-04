import React from 'react'
import {getCategoryList} from "../apis/apis";
import styles from '../app.module.css'


const CategoryOption = props => {
    const options = props.categoryOptionList.map(
        category => (<option value={category.id} key={category.id}>{`${category.title}/`}</option>)
    )

    return (
        <select
            className={styles.categorySelector}
            value={props.category_id || ""}
            onChange={event => props.handleSelectCategory(event.target.value)}>
            <option value="default" key="default">(SELECT CATEGORY)</option>
            {options}
        </select>
    )
}


class CategorySelector extends React.Component {

    state = {
        list: [],
    }

    async componentDidMount() {
        await this.renderObjectList()
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.category.id !== this.props.category.id) {
            await this.renderObjectList()
        }
    }

    renderObjectList = async () => {
        let list = []
        let category = await this.props.category

        if (category.id) {

            // Child List
            const childList = await getCategoryList(category.id)
            if (childList.length === 0) {

            } else {
                await list.push(
                    <CategoryOption
                        categoryOptionList={childList}
                        handleSelectCategory={this.props.handleSelectCategory}
                        renderObjectList={this.renderObjectList} />
                )
            }

            while (true) {
                // Peer List
                if (category.parent_category_id) {
                    // When Parent (They are more than secondary)
                    const peerList = await getCategoryList(category.parent_category_id)
                    await list.push(
                        <CategoryOption
                            category_id={category.id}
                            categoryOptionList={peerList}
                            handleSelectCategory={this.props.handleSelectCategory}
                            renderObjectList={this.renderObjectList} />
                    )
                } else {
                    // When No Parent (They are Primary Categories)
                    const parentList = await getCategoryList()
                    await list.push(
                        <CategoryOption
                            category_id={category.id}
                            categoryOptionList={parentList}
                            handleSelectCategory={this.props.handleSelectCategory}
                            renderObjectList={this.renderObjectList} />
                    )
                    break
                }
                category = category.parent
            }
        } else {

            // Primary Category List
            const parentList = await getCategoryList()
            await list.push(
                <CategoryOption
                    categoryOptionList={parentList}
                    handleSelectCategory={this.props.handleSelectCategory}
                    renderObjectList={this.renderObjectList} />
            )
        }

        this.setState({list: list.reverse()})
    }

    render() {
        return (
            <div className={styles.categorySelectorContainer}>
                {this.state.list}
            </div>
        )
    }
}

export default CategorySelector