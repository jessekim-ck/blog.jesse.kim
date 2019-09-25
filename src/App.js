import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Helmet} from "react-helmet";
import Nav from "./components/Nav";
import { connect } from 'react-redux'
import {getCurrentUser, refreshToken} from "./apis/apis"
import { login } from "./redux/actions"
import styles from './app.module.css'
import favicon from './assets/favicon.ico'

import Index from './routes/index'
import Login from './routes/login'
import Signup from './routes/signup'
import WritePost from './routes/write_post'
import PostDetail from './routes/post_detail'
import EditPost from './routes/edit_post'
import Categories from './routes/categories'


class App extends React.Component {

  async componentDidMount() {
      const token = await localStorage.getItem('token')
      if (!token || token === 'undefined') {
          await localStorage.removeItem('token')
      } else {
          await refreshToken()
          const currentUser = await getCurrentUser()
          await this.props.dispatch(login(currentUser))
      }
  }

  render() {
      return (
          <Router>
              <div className="application">
                  <Helmet>
                      <meta charset="utf-8"/>
                      <title>Jessekim's Blog</title>
                      <link rel="shortcut icon" href={favicon} />
                  </Helmet>
              </div>
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

