import React from 'react';
import { Route, Switch } from "react-router-dom";

import Index from "./routes";
import Login from "./routes/login";
import Signup from "./routes/signup";
import WritePost from "./routes/write_post";
import EditPost from "./routes/edit_post";
import PostDetail from "./routes/post_detail";
import Category from "./routes/category"
import PageNotFound from './components/PageNotFound'

export default (
    <Switch>
        <Route exact path="/" component={Index} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/post/write" component={WritePost} />
        <Route path="/post/:id/edit" component={EditPost} />
        <Route path="/post/:id" component={PostDetail} />
        <Route path="/category" component={Category} />
        <Route component={PageNotFound} />
    </Switch>
);
