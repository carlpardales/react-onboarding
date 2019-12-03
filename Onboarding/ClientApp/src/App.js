import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { FetchCustomer } from './components/FetchCustomer';
import { FetchProduct } from './components/FetchProduct';
import { FetchStore } from './components/FetchStore';
import { FetchSale } from './components/FetchSale';

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={FetchCustomer} />
                <Route path='/products' component={FetchProduct} />
                <Route path='/stores' component={FetchStore} />
                <Route path='/fetchsales' component={FetchSale} />
            </Layout>
        );
    }
}
