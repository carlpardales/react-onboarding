import React, { Component, Fragment } from 'react';
import { Pagination, Table } from 'semantic-ui-react';
import { ConfirmDeleteModal } from '../dialogs/ConfirmDeleteModal';
import { CreateCustomerModal } from '../forms/CreateCustomerModal';
import { PageSizeSelect } from '../selects/PageSizeSelect';

export class CustomerTable extends Component {

    render() {
        const customers = this.props.customers;
        return (
            <Fragment>
                <Table sortable celled fixed striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell
                                sorted={this.getSortingDirection('id')}
                                onClick={() => this.props.handleSort('id')}
                            >
                                Customer Id
                        </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={this.getSortingDirection('name')}
                                onClick={() => this.props.handleSort('name')}
                            >
                                Name
                        </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={this.getSortingDirection('address')}
                                onClick={() => this.props.handleSort('address')}
                            >
                                Address
                        </Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {customers.map(customer =>
                            <Table.Row key={customer.id}>
                                <Table.Cell>{customer.id}</Table.Cell>
                                <Table.Cell>{customer.name}</Table.Cell>
                                <Table.Cell>{customer.address}</Table.Cell>
                                <Table.Cell>
                                    <CreateCustomerModal
                                        name='Customer' isNew={false}
                                        customer={customer}
                                        updateCustomerIntoState={this.props.updateState} />
                                </Table.Cell>
                                <Table.Cell>
                                    <ConfirmDeleteModal handleDelete={() => this.handleDelete(customer.id)} />
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
        fetch(`customer/${id}`, {
            method: 'delete'
        }).then(response => {
            this.props.deleteCustomerFromState(id);
        })
            .catch(error => console.log(error));
    }
}