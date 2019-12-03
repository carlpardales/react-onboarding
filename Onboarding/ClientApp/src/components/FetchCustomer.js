import _ from 'lodash';
import React, { Component } from 'react';
import { Loader } from 'semantic-ui-react';
import { CreateCustomerModal } from './forms/CreateCustomerModal';
import { CustomerTable } from './tables/CustomerTable';

export class FetchCustomer extends Component {
    static displayName = FetchCustomer.name;

    constructor(props) {
        super(props);
        this.state = {
            customers: [],
            totalCount: 0,
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
            : this.renderCustomerTable();

        return (
            <div>
                <CreateCustomerModal name='Customer' isNew={true} addCustomerToState={this.addCustomerToState} />
                {contents}
            </div>
        );
    }

    renderCustomerTable() {
        return (
            <CustomerTable
                customers={this.paginateCustomers()}
                updateState={this.updateState}
                deleteCustomerFromState={this.deleteCustomerFromState}
                totalCount={this.state.totalCount}
                totalPages={Math.ceil(this.state.totalCount / this.state.limit)}
                currentPage={this.state.page}
                handlePageChange={this.handlePageChange}
                column={this.state.sort}
                direction={this.state.order}
                handleSort={this.handleSort}
                limit={this.state.limit.toString()}
                handleLimitChange={this.handleLimitChange} />
        );
    }

    paginateCustomers = () => {
        const { customers, page, limit } = this.state;
        const begin = (page - 1) * limit;
        const end = page * limit;

        return customers.slice(begin, end);
    }

    updateState = (id) => {
        this.populateCustomerData();
    }

    deleteCustomerFromState = (id) => {
        this.setState({
            customers: this.state.customers.filter(customer => {
                return (customer.id !== id);
            })
        });
    }

    handlePageChange = (event, data) => {
        const { activePage } = data;
        if (activePage !== this.state.page) {
            this.loadCustomerData({ page: activePage });
        }
    }

    handleSort = (clickedColumn) => {
        const { sort, order } = this.state;

        let newOrder = order === 'ascending' ? 'descending' : 'ascending';
        if (sort !== clickedColumn) {
            newOrder = 'ascending';
        }

        this.loadCustomerData({ sort: clickedColumn, order: newOrder });
    }

    handleLimitChange = (event, data) => {
        if (data.value !== this.state.limit) {
            this.loadCustomerData({ limit: data.value, page: 1 });
        }
    }

    addCustomerToState = (customer) => {
        const { customers } = this.state;

        this.loadCustomerData({ customers: [...customers, customer] });
    }

    componentDidMount() {
        this.populateCustomerData();
    }

    populateCustomerData() {
        fetch('customer')
            .then(response => response.json())
            .then(data => this.loadCustomerData({ customers: data, totalCount: data.length }))
            .catch(error => console.log(error));
    }

    loadCustomerData = (params) => {
        let newState = Object.assign(
            {},
            this.state,
            params,
            { loading: false });

        newState.customers = this.sortData(newState.customers, newState.sort, newState.order);
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