import _ from 'lodash';
import React, { Component } from 'react';
import { Loader } from 'semantic-ui-react';
import { CreateStoreModal } from './forms/CreateStoreModal';
import { StoreTable } from './tables/StoreTable';

export class FetchStore extends Component {
    static displayName = FetchStore.name;

    constructor(props) {
        super(props);
        this.state = {
            stores: [],
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
            : this.renderStoreTable();

        return (
            <div>
                <CreateStoreModal name='Store' isNew={true} addStoreToState={this.addStoreToState} />
                {contents}
            </div>
        );
    }

    renderStoreTable() {
        return (
            <StoreTable
                stores={this.paginateStores()}
                updateState={this.updateState}
                deleteStoreFromState={this.deleteStoreFromState}
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

    paginateStores = () => {
        const { stores, page, limit } = this.state;
        const begin = (page - 1) * limit;
        const end = page * limit;

        return stores.slice(begin, end);
    }

    updateState = (id) => {
        this.populateStoreData();
    }

    deleteStoreFromState = (id) => {
        this.setState({
            stores: this.state.stores.filter(store => {
                return (store.id !== id);
            })
        });
    }

    handlePageChange = (event, data) => {
        const { activePage } = data;
        if (activePage !== this.state.page) {
            this.loadStoreData({ page: activePage });
        }
    }

    handleSort = (clickedColumn) => {
        const { sort, order } = this.state;

        let newOrder = order === 'ascending' ? 'descending' : 'ascending';
        if (sort !== clickedColumn) {
            newOrder = 'ascending';
        }

        this.loadStoreData({ sort: clickedColumn, order: newOrder });
    }

    handleLimitChange = (event, data) => {
        if (data.value !== this.state.limit) {
            this.loadStoreData({ limit: data.value, page: 1 });
        }
    }

    addStoreToState = (store) => {
        const { stores } = this.state;

        this.loadStoreData({ stores: [...stores, store] });
    }

    componentDidMount() {
        this.populateStoreData();
    }

    populateStoreData() {
        fetch('store')
            .then(response => response.json())
            .then(data => this.loadStoreData({ stores: data, totalCount: data.length }))
            .catch(error => console.log(error));
    }

    loadStoreData = (params) => {
        let newState = Object.assign(
            {},
            this.state,
            params,
            { loading: false });

        newState.stores = this.sortData(newState.stores, newState.sort, newState.order);
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