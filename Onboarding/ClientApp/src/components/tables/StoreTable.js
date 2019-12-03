import React, { Component, Fragment } from 'react';
import { Pagination, Table } from 'semantic-ui-react';
import { ConfirmDeleteModal } from '../dialogs/ConfirmDeleteModal';
import { CreateStoreModal } from '../forms/CreateStoreModal';
import { PageSizeSelect } from '../selects/PageSizeSelect';

export class StoreTable extends Component {

    render() {
        const stores = this.props.stores;
        return (
            <Fragment>
                <Table sortable celled fixed striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell
                                sorted={this.getSortingDirection('id')}
                                onClick={() => this.props.handleSort('id')}
                            >
                                Store Id
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
                        {stores.map(store =>
                            <Table.Row key={store.id}>
                                <Table.Cell>{store.id}</Table.Cell>
                                <Table.Cell>{store.name}</Table.Cell>
                                <Table.Cell>{store.address}</Table.Cell>
                                <Table.Cell>
                                    <CreateStoreModal
                                        name='Store' isNew={false}
                                        store={store}
                                        updateStoreIntoState={this.props.updateState} />
                                </Table.Cell>
                                <Table.Cell>
                                    <ConfirmDeleteModal handleDelete={() => this.handleDelete(store.id)} />
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
        fetch(`store/${id}`, {
            method: 'delete'
        }).then(response => {
            this.props.deleteStoreFromState(id);
        })
            .catch(error => console.log(error));
    }
}