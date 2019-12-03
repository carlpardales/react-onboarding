import React, { Component, Fragment } from 'react';
import { Pagination, Table } from 'semantic-ui-react';
import { ConfirmDeleteModal } from '../dialogs/ConfirmDeleteModal';
import { CreateSaleModal } from '../forms/CreateSaleModal';
import { PageSizeSelect } from '../selects/PageSizeSelect';

export class SaleTable extends Component {

    render() {
        const sales = this.props.sales;
        return (
            <Fragment>
                <Table sortable celled fixed striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell
                                sorted={this.getSortingDirection('id')}
                                onClick={() => this.props.handleSort('id')}
                            >
                                Sale Id
                        </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={this.getSortingDirection('customer.name')}
                                onClick={() => this.props.handleSort('customer.name')}
                            >
                                Customer
                        </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={this.getSortingDirection('product.name')}
                                onClick={() => this.props.handleSort('product.name')}
                            >
                                Product
                        </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={this.getSortingDirection('store.name')}
                                onClick={() => this.props.handleSort('store.name')}
                            >
                                Store
                        </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={this.getSortingDirection('dateSold')}
                                onClick={() => this.props.handleSort('dateSold')}
                            >
                                Date Sold
                        </Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {sales.map(sale =>
                            <Table.Row key={sale.id}>
                                <Table.Cell>{sale.id}</Table.Cell>
                                <Table.Cell>{sale.customer.name}</Table.Cell>
                                <Table.Cell>{sale.product.name}</Table.Cell>
                                <Table.Cell>{sale.store.name}</Table.Cell>
                                <Table.Cell>
                                    {new Intl.DateTimeFormat('en-NZ', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: '2-digit'
                                    }).format(new Date(sale.dateSold))}
                                </Table.Cell>
                                <Table.Cell>
                                    <CreateSaleModal
                                        name='Sale' isNew={false}
                                        sale={sale}
                                        updateSaleIntoState={this.props.updateState} />
                                </Table.Cell>
                                <Table.Cell>
                                    <ConfirmDeleteModal handleDelete={() => this.handleDelete(sale.id)} />
                                </Table.Cell>
                            </Table.Row>
                        )}
                    </Table.Body>
                </Table>
                <PageSizeSelect
                    limit={this.props.limit}
                    handleLimitChange={this.props.handleLimitChange}
                />
                <Pagination
                    totalPages={this.props.totalPages}
                    activePage={this.props.currentPage}
                    onPageChange={this.props.handlePageChange}
                />
            </Fragment>
        );
    }

    getSortingDirection = (columnName) => {
        return this.props.column === columnName ? this.props.direction : null;
    }

    handleDelete = (id) => {
        fetch(`sales/${id}`, {
            method: 'delete'
        }).then(response => {
            this.props.deleteSaleFromState(id);
        })
            .catch(error => console.log(error));
    }
}