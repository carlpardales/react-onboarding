import _ from 'lodash';
import React, { Component } from 'react';
import { Loader } from 'semantic-ui-react';
import { CreateSaleModal } from './forms/CreateSaleModal';
import { SaleTable } from './tables/SaleTable';

export class FetchSale extends Component {
    static displayName = FetchSale.name;

    constructor(props) {
        super(props);
        this.state = {
            sales: [],
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
            : this.renderSaleTable();

        return (
            <div>
                <CreateSaleModal name='Sale' isNew={true} updateSaleIntoState={this.updateState} />
                {contents}
            </div>
        );
    }

    renderSaleTable() {
        return (
            <SaleTable
                sales={ this.paginateSales()}
                updateState={this.updateState}
                deleteSaleFromState={this.deleteSaleFromState}
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

    paginateSales = () => {
        const { sales, page, limit } = this.state;
        const begin = (page - 1) * limit;
        const end = page * limit;

        return sales.slice(begin, end);
    }

    updateState = (id) => {
        this.populateSaleData();
    }

    deleteSaleFromState = (id) => {
        this.setState({
            sales: this.state.sales.filter(sale => {
                return (sale.id !== id);
            })
        });
    }

    handlePageChange = (event, data) => {
        const { activePage } = data;
        if (activePage !== this.state.page) {
            this.loadSaleData({ page: activePage });
        }
    }

    handleSort = (clickedColumn) => {
        const { sort, order } = this.state;

        let newOrder = order === 'ascending' ? 'descending' : 'ascending';
        if (sort !== clickedColumn) {
            newOrder = 'ascending';
        }

        this.loadSaleData({ sort: clickedColumn, order: newOrder });
    }

    handleLimitChange = (event, data) => {
        if (data.value !== this.state.limit) {
            this.loadSaleData({ limit: data.value, page: 1 });
        }
    }

    componentDidMount() {
        this.populateSaleData();
    }

    populateSaleData() {
        fetch('sales')
            .then(response =>  response.json())
            .then(data => this.loadSaleData({ sales: data, totalCount: data.length }))
            .catch(error => console.log(error));
    }

    loadSaleData = (params) => {
        let newState = Object.assign(
            {},
            this.state,
            params,
            { loading: false });

        newState.sales = this.sortData(newState.sales, newState.sort, newState.order);
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