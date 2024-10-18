import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SignUp from './components/Auth/SignUp';
import Login from './components/Auth/Login';
import BlogList from './components/Blog/BlogList';
import BlogForm from './components/Blog/BlogForm';
import BlogDetails from './components/Blog/BlogDetails';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/signup" component={SignUp} />
                <Route path="/login" component={Login} />
                <Route path="/blogs" component={BlogList} />
                <Route path="/blogs/new" component={BlogForm} />
                <Route path="/blogs/:id" component={BlogDetails} />
            </Switch>
        </Router>
    );
}

export default App;
