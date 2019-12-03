import _ from 'lodash';
import React, { Component } from 'react';
import { Loader } from 'semantic-ui-react';
import { CreateProductModal } from './forms/CreateProductModal';
import { ProductTable } from './tables/ProductTable';

export class FetchProduct extends Component {
    static displayName = FetchProduct.name;

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            totaCount: 0,
            sort: 'id',
            order: null,
            page: 1,
            limit: 2,
            loading: true
        };
    }

    render() {
        let contents = this.state.loading
            ? <Loader active inline='centered' content='Loading' />
            : this.renderProductTable();

        return (
            <div>
                <CreateProductModal name='Product' isNew={true} addProductToState={this.addProductToState} />
                {contents}
            </div>
        );
    }

    renderProductTable() {
        return (
            <ProductTable
                products={this.paginateProducts()}
                updateState={this.updateState}
                deleteProductFromState={this.deleteProductFromState}
                column={this.state.sort}
                totalCount={this.state.totalCount}
                totalPages={Math.ceil(this.state.totalCount / this.state.limit)}
                currentPage={this.state.page}
                handlePageChange={this.handlePageChange}
                direction={this.state.order}
                handleSort={this.handleSort}
                limit={this.state.limit.toString()}
                handleLimitChange={this.handleLimitChange} />
        );
    }

    paginateProducts = () => {
        const { products, page, limit } = this.state;
        const begin = (page - 1) * limit;
        const end = page * limit;

        return products.slice(begin, end);
    }

        updateState = (id) => {
        this.populateProductData();
    }

    deleteProductFromState = (id) => {
        this.setState({
            products: this.state.products.filter(product => {
                return (product.id !== id);
            })
        });
    }

    handlePageChange = (event, data) => {
        const { activePage } = data;
        if (activePage !== this.state.page) {
            this.loadProductData({ page: activePage });
        }
    }

    handleSort = (clickedColumn) => {
        const { sort, order } = this.state;

        let newOrder = order === 'ascending' ? 'descending' : 'ascending';
        if (sort !== clickedColumn) {
            newOrder = 'ascending';
        }

        this.loadProductData({ sort: clickedColumn, order: newOrder });
    }

    handleLimitChange = (event, data) => {
        if (data.value !== this.state.limit) {
            this.loadProductData({ limit: data.value, page: 1 });
        }
    }

    addProductToState = (product) => {
        const { products } = this.state;

        this.loadProductData({ products: [...products, product] });
    }

    componentDidMount() {
        this.populateProductData();
    }

    populateProductData() {
        fetch('product')
            .then(response => response.json())
            .then(data => this.loadProductData({ products: data, totalCount: data.length }))
            .catch(error => console.log(error));
    }

    loadProductData = (params) => {
        let newState = Object.assign(
            {},
            this.state,
            params,
            { loading: false });

        newState.products = this.sortData(newState.products, newState.sort, newState.order);
        this.setState(newState);
    }

    sortData = (data, sort, order) => {
        let sortedData = _.sortBy(data, [sort]);

        if (order === 'descending') {
            sortedData = sortedData.reverse();
        }

        return sortedData;
    }
}