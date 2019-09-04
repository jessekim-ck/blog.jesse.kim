import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import { connect } from 'react-redux'
import { getCurrentUser } from "./apis/apis"
import { login } from "./redux/actions"
import styles from './app.module.css'

import Index from './routes/index'
import Login from './routes/login'
import Signup from './routes/signup'
import WritePost from './routes/write_post'
import PostDetail from './routes/post_detail'
import EditPost from './routes/edit_post'
import Categories from './routes/categories'
import Posts from './routes/posts'


class App extends React.Component {

  async componentDidMount() {
      const token = localStorage.getItem('token')
      if (token) {
          const currentUser = await getCurrentUser()
          this.props.dispatch(login(currentUser))
      }
  }

  render() {

      // EditPost path should be above the PostDetail path!
      return (
          <Router>
              <div>
                  <div>
                      <Nav />
                  </div>
                  <div className={styles.appContainer}>
                      <Switch>
                          <Route exact path="/" component={Index} />
                          <Route path="/login" component={Login} />
                          <Route path="/signup" component={Signup} />
                          <Route path="/write_post" component={WritePost} />
                          <Route path="/post/:id/edit" component={EditPost} />
                          <Route path="/post/:id" component={PostDetail} />
                          <Route path="/category/:id/post" component={Posts} />
                          <Route path="/category/:id/write_post" component={WritePost} />
                          <Route path="/category/:id" component={Categories} />
                          <Route path="/category" component={Categories} />
                      </Switch>
                  </div>
              </div>
        </Router>
    )
  }
}

export default connect()(App)

