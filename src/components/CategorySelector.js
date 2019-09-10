import React from 'react'
import {getCategoryDetail, getCategoryList} from "../apis/apis";
import styles from '../app.module.css'


const CategoryOption = props => {
    const categories = props.category_list.map(
        category => (<option value={category.id} key={category.id}>{`${category.title}/`}</option>)
    )

    return (
        <select
            className={styles.categorySelector}
            value={props.category_id || ""}
            onChange={event => props.handleSelectCategory(event.target.value)}>
            <option value="default" key="default">(SELECT CATEGORY)</option>
            {categories}
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
            const temp_child_list = await getCategoryDetail(category.id)
            const child_list = await temp_child_list.children_category_list
            if (child_list.length === 0) {
                // Do nothing
            } else {
                await list.push(
                    <CategoryOption
                        category_list={child_list}
                        handleSelectCategory={this.props.handleSelectCategory}
                        renderObjectList={this.renderObjectList} />
                )
            }

            while (true) {
                // Peer List
                if (category.parent_category_id) {
                    // When Parent (They are more than secondary)
                    const temp_peer_list = await getCategoryDetail(category.parent_category_id)
                    const peer_list = await temp_peer_list.children_category_list
                    await list.push(
                        <CategoryOption
                            category_id={category.id}
                            category_list={peer_list}
                            handleSelectCategory={this.props.handleSelectCategory}
                            renderObjectList={this.renderObjectList} />
                    )
                } else {
                    // When No Parent (They are Primary Categories)
                    const parent_list = await getCategoryList()
                    await list.push(
                        <CategoryOption
                            category_id={category.id}
                            category_list={parent_list}
                            handleSelectCategory={this.props.handleSelectCategory}
                            renderObjectList={this.renderObjectList} />
                    )
                    break
                }
                category = category.parent
            }
        } else {
            // Primary Category List
            const parent_list = await getCategoryList()
            await list.push(
                <CategoryOption
                    category_list={parent_list}
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