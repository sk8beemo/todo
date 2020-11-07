import React from "react";
import {Route} from 'react-router-dom';

import Layout from "./hoc/Layout/Layout";
import Auth from "./components/Auth/Auth";
import './App.css';


function App() {
  return (
    <Layout>
      <Route path={'/'} component={Auth} exact />
    </Layout>
  );
}

export default App;
