import React from 'react';
import {Helmet} from "react-helmet";
import Nav from "./components/Nav";
import { connect } from 'react-redux'
import {getCurrentUser, refreshToken} from "./apis/apis"
import { login } from "./redux/actions"
import styles from './app.module.css'
import favicon from './assets/favicon.ico'
import { BrowserRouter as Router } from "react-router-dom";

import Route from './router'

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
          <div>
              <div className="application">
                  <Helmet>
                      <meta charSet="utf-8"/>
                      <title>Jessekim's Blog</title>
                      <meta name="description" content="제씨킴의 데이터사이언스 프로그래밍 일상 블로그"/>
                      <link rel="shortcut icon" href={favicon}/>
                  </Helmet>
              </div>

              <div>
                  <Router>
                      <div>
                          <Nav/>
                      </div>
                      <div className={styles.appContainer}>
                          {Route}
                      </div>
                  </Router>
              </div>
          </div>
    )
  }
}

export default connect()(App)

