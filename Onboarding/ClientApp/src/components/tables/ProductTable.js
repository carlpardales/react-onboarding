import React, { Component, Fragment } from 'react';
import { Pagination, Table } from 'semantic-ui-react';
import { ConfirmDeleteModal } from '../dialogs/ConfirmDeleteModal';
import { CreateProductModal } from '../forms/CreateProductModal';
import { PageSizeSelect } from '../selects/PageSizeSelect';

export class ProductTable extends Component {

    render() {
        const products = this.props.products;
        return (
            <Fragment>
                <Table sortable celled fixed striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell
                                sorted={this.getSortingDirection('id')}
                                onClick={() => this.props.handleSort('id')}
                            >
                                Product Id
                        </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={this.getSortingDirection('name')}
                                onClick={() => this.props.handleSort('name')}
                            >
                                Name
                        </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={this.getSortingDirection('price')}
                                onClick={() => this.props.handleSort('price')}
                            >
                                Price
                        </Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {products.map(product =>
                            <Table.Row key={product.id}>
                                <Table.Cell>{product.id}</Table.Cell>
                                <Table.Cell>{product.name}</Table.Cell>
                                <Table.Cell>
                                    {new Intl.NumberFormat('en-NZ', {
                                        style: 'currency',
                                        currency: 'NZD',
                                    }).format(product.price)}</Table.Cell>
                                <Table.Cell>
                                    <CreateProductModal
                                        name='Product' isNew={false}
                                        product={product}
                                        updateProductIntoState={this.props.updateState} />
                                </Table.Cell>
                                <Table.Cell>
                                    <ConfirmDeleteModal handleDelete={() => this.handleDelete(product.id)} />
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
        fetch(`product/${id}`, {
            method: 'delete'
        }).then(data => {
            this.props.deleteProductFromState(id);
        })
            .catch(err => console.log(err));
    }
}