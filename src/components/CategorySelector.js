import React from 'react'
import {getCategoryDetail, getCategoryList} from "../apis/apis";
import styles from '../app.module.css'


const CategoryOption = props => {

    const categories = props.category_list.map(
        category => (<option value={category.id} key={category.id}>{`${category.title}/`}</option>)
    )

    const get_text_width = (text, font) => {
        const element = document.createElement('canvas');
        const context = element.getContext('2d');
        context.font = "14px arial"
        const width = context.measureText(text).width + 10;
        return width
    }

    return (
        <select
            className={styles.categorySelectorSelect}
            style={{ width: `${get_text_width(props.category_title || 'Select Category')}px` }}
            value={props.category_id || ""}
            onChange={event => props.handleSelectCategory(event.target.value)}>
            <option value="default" key="default">Select Category</option>
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

    async componentDidUpdate(prevProps) {
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
                list.push(
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
                    list.push(
                        <CategoryOption
                            category_id={category.id}
                            category_title={category.title}
                            category_list={peer_list}
                            handleSelectCategory={this.props.handleSelectCategory}
                            renderObjectList={this.renderObjectList} />
                    )
                } else {
                    // When No Parent (They are Primary Categories)
                    const parent_list = await getCategoryList()
                    list.push(
                        <CategoryOption
                            category_id={category.id}
                            category_title={category.title}
                            category_list={parent_list.children_category_list}
                            handleSelectCategory={this.props.handleSelectCategory}
                            renderObjectList={this.renderObjectList} />
                    )
                    break;
                }
                category = category.parent
            }
        } else {
            // Primary Category List
            const parent_list = await getCategoryList()
            list.push(
                <CategoryOption
                    category_list={parent_list.children_category_list}
                    handleSelectCategory={this.props.handleSelectCategory}
                    renderObjectList={this.renderObjectList} />
            )
        }

        this.setState({list: list.reverse()})
    }

    render() {
        return (
            <div className={styles.categorySelector}>
                {this.state.list}
            </div>
        )
    }
}

export default CategorySelector
