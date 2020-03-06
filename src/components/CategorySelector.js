import React from 'react'
import {getCategoryDetail, getCategoryList} from "../apis/apis";
import styles from '../app.module.css'


const CategoryOption = props => {

    const categories = props.category_list.map(
        category => (<option value={category.id} key={category.id}>{`${category.title}/`}</option>)
    );

    const get_text_width = (text, font) => {
        const element = document.createElement('canvas');
        const context = element.getContext('2d');
        context.font = "14px arial";
        const width = context.measureText(text).width + 10;
        return width;
    }

    return (
        <select
            className={styles.categorySelectorSelect}
            style={{ width: `${get_text_width(props.category_title || 'Select Category')}px` }}
            value={props.category_id || ""}
            onChange={event => props.handleSelectCategory(event.target.value)}
        >
            <option value="default" key={0}>Select Category</option>
            {categories}
        </select>
    );
}


class CategorySelector extends React.Component {

    state = {
        list: [],
    }

    async componentDidMount() {
        this.renderObjectList();
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.category.id !== this.props.category.id) {
            this.renderObjectList();
        }
    }

    renderObjectList = async () => {
        let list = [];
        let category = this.props.category;
        let depth = 0;

        // When category is set
        if (category.id) {

            // Get child list
            const temp_child_list = await getCategoryDetail(category.id);
            const child_list = temp_child_list.children_category_list;
            if (!child_list.length) {
                // Do nothing
            } else {
                list.push(
                    <CategoryOption
                        key={depth}
                        category_list={child_list}
                        handleSelectCategory={this.props.handleSelectCategory}
                        renderObjectList={this.renderObjectList}
                    />
                );
                depth++;
            }

            while (category.parent) {
                // Get sibling list
                const temp_peer_list = await getCategoryDetail(category.parent_category_id);
                const peer_list = temp_peer_list.children_category_list;
                list.push(
                    <CategoryOption
                        key={depth}
                        category_id={category.id}
                        category_title={category.title}
                        category_list={peer_list}
                        handleSelectCategory={this.props.handleSelectCategory}
                        renderObjectList={this.renderObjectList}
                    />
                );
                // Go up
                category = category.parent;
                depth++;
            }
        } 

        // Get father list
        const parent_list = await getCategoryList();
        list.push(
            <CategoryOption
                key={depth}
                category_id={category.id}
                category_title={category.title}
                category_list={parent_list.children_category_list}
                handleSelectCategory={this.props.handleSelectCategory}
                renderObjectList={this.renderObjectList}
            />
        );

        this.setState({list: list.reverse()});
    }

    render() {
        return (
            <div className={styles.categorySelector}>
                {this.state.list}
            </div>
        );
    }
}

export default CategorySelector;
