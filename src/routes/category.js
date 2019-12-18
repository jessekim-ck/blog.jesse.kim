// import React from "react"
// import Accordion from 'react-bootstrap/Accordion'
// import Card from 'react-bootstrap/Card'
// import {getCategoryDetail, getCategoryList} from "../apis/apis";
// import styles from "../app.module.css"
// import CustomLink from "../components/CustomLink";
// import {Helmet} from "react-helmet"


// const PostItem = props => {

//     const children_post_items = () => props.children_post_list.map(
//         post => (
//             <CustomLink to={`/post/${post.id}`} key={post.id}>
//                 <Card.Body className={styles.categoryListChildPost}>
//                     {post.title}
//                 </Card.Body>
//             </CustomLink>
//         )
//     )

//     return children_post_items()
// }


// class CategoryItem extends React.Component {

//     state = {
//         children_category_list: [],
//         children_post_list: [],
//     }

//     update_category_list = async category_id => {
//         const state = await getCategoryDetail(category_id)
//         this.setState({...state})
//     }

//     async componentDidMount() {
//         await this.update_category_list(this.props.category.id)
//     }

//     children_category_items = () => this.state.children_category_list.map(
//         category => <CategoryItem category={{...category}} key={category.id}/>
//     )

//     render() {
//         return (
//             <Accordion className={styles.categoryList}>
//                 <Accordion.Toggle
//                     className={styles.categoryListHeader}
//                     eventKey={this.props.category.id}
//                     as={Card.Header}>
//                     <div className={styles.categoryListTitle}>
//                         {this.props.category.title}
//                     </div>
//                     <div className={styles.categoryListDescription}>
//                         {this.props.category.description} | {this.props.category.num_total_posts} posts
//                     </div>
//                 </Accordion.Toggle>
//                 <Accordion.Collapse eventKey={this.props.category.id}>
//                     <div className={styles.categoryListChild}>
//                         <div>
//                             {this.children_category_items()}
//                         </div>
//                         <div>
//                             <PostItem children_post_list={this.state.children_post_list}/>
//                         </div>
//                     </div>
//                 </Accordion.Collapse>
//             </Accordion>
//         )
//     }
// }


// class Category extends React.Component {

//     state = {
//         children_category_list: [],
//         children_post_list: [],
//     }

//     async componentDidMount() {
//         const state = await getCategoryList()
//         this.setState({...state})
//     }

//     parent_category_items = () => this.state.children_category_list.map(
//         category => <CategoryItem category={{...category}} key={category.id} />
//     )

//     render() {
//         return (
//             <div>
//                 <Helmet>
//                     <title>Jessekim's Blog: Category</title>
//                     <meta name="description" content="제씨킴의 데이터사이언스 프로그래밍 일상 블로그 카테고리"/>
//                     <link rel="canonical" href="https://blog.jesse.kim/category"/>
//                 </Helmet>
//                 <div className={styles.categoryListCategory}>Category</div>
//                 {this.parent_category_items()}
//                 <PostItem children_post_list={this.state.children_post_list}/>
//             </div>
//         )
//     }
// }

// export default Category
