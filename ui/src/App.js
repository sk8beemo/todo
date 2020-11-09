import React from "react";
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';

import Layout from "./hoc/Layout/Layout";
import Auth from "./components/Auth/Auth";
import './App.css';
import {connect} from "react-redux";
import {autoLogin} from "./store/actions/auth";
import TodoList from "./components/TodoList/TodoList";

class App extends React.Component {

    componentDidMount() {
        this.props.autoLogin()
    }

    render() {
        let routes = (
            <Switch>
                <Route path={'/auth'} component={Auth} />
                <Redirect to="/auth" />
            </Switch>
        )
        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path={'/'} exact component={TodoList} />
                    <Redirect to="/" />
                </Switch>
            )
        }

        return (
            <Layout>
                {routes}
            </Layout>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.auth.accessToken
    }
}
function mapDispatchToProps(dispatch) {
    return {
        autoLogin: () => dispatch(autoLogin())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
