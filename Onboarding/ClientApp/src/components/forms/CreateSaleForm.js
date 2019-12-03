import React, { Component } from 'react';
import { Button, Dropdown, Form, Icon, Select } from 'semantic-ui-react';
import * as moment from 'moment';


export class CreateSaleForm extends Component {
    static displayName = CreateSaleForm.name;

    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            customerId: null,
            productId: null,
            storeId: null,
            dateSold: new Date(),
            customerList: [],
            productList: [],
            storeList: []
        }

        this.refreshLists();
    }

    refreshLists = () => {
        this.getCustomerList();
        this.getProductList();
        this.getStoreList();
    }

    getCustomerList = () => {
        fetch('Sales/GetCustomerList')
            .then(response => response.json())
            .then(data => {
                this.setState({ customerList: data });
            });
    }

    getProductList = () => {
        fetch('Sales/GetProductList')
            .then(response => response.json())
            .then(data => {
                this.setState({ productList: data });
            });
    }

    getStoreList = () => {
        fetch('Sales/GetStoreList')
            .then(response => response.json())
            .then(data => {
                this.setState({ storeList: data });
            });
    }

    render() {
        const customers = this.state.customerList;
        const products = this.state.productList;
        const stores = this.state.storeList;
        const enabled =
            this.state.customerId &&
            this.state.productId &&
            this.state.storeId &&
            this.state.dateSold;
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                    <input name='id' type='hidden' onChange={this.handleChange} value={this.state.id} />
                </Form.Field>
                <Form.Field>
                    <label htmlFor='dateSold'>Date sold</label>
                    <input name='dateSold' type='date' onChange={this.handleChange} value={moment(this.state.dateSold).format(moment.HTML5_FMT.DATE)} />
                </Form.Field>
                <Form.Field>
                    <label htmlFor='customerId'>Customer</label>
                    <Select name="customerId"
                        placeholder='Select customer'
                        selection
                        value={this.state.customerId}
                        options={customers.map(customer => ({
                            key: customer.id,
                            value: customer.id,
                            text: customer.name
                        }))}
                        onChange={this.handleChange} />
                </Form.Field>
                <Form.Field>
                    <label htmlFor='productId'>Product</label>
                    <Dropdown name="productId"
                        placeholder='Select product'
                        selection
                        value={this.state.productId}
                        options={products.map(product => ({
                            key: product.id,
                            value: product.id,
                            text: product.name
                        }))}
                        onChange={this.handleChange} />
                </Form.Field>
                <Form.Field>
                    <label htmlFor='storeId'>Store</label>
                    <Dropdown name="storeId"
                        placeholder='Select store'
                        selection
                        value={this.state.storeId}
                        options={stores.map(store => ({
                            key: store.id,
                            value: store.id,
                            text: store.name
                        }))}
                        onChange={this.handleChange} />
                </Form.Field>
                <Button color='black' onClick={this.props.toggle}>cancel</Button>
                <Button disabled={!enabled} color='green' type='submit'>
                    <Icon name='checkmark' />{this.getButtonLabel()}
                </Button>
            </Form>
        );
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const data = JSON.stringify({
            id: this.state.id,
            customerId: this.state.customerId,
            productId: this.state.productId,
            storeId: this.state.storeId,
            dateSold: this.state.dateSold
        });

        this.isNew() ? this.submitNew(data) : this.submitEdit(data);
    }

    isNew = () => {
        const isNew = this.props.isNew;

        return (isNew) ? true : false;
    }

    submitNew = (data) => {
        fetch('sales', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        })
            .then(response => response.json())
            .then(sale => {
                this.props.updateSaleIntoState();
                this.props.toggle();
            });
    }

    submitEdit = (data) => {
        fetch('sales', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        }).then((response) => response.json())
            .then(() => {
                this.props.updateSaleIntoState(this.state.id);
                this.props.toggle();
            })
    }

    handleChange = (event, data) => {
        if (event.target.name) {
            this.setState({
                [event.target.name]: event.target.value
            });
        }
        else { // get value from Select component
            this.setState({
                [data.name]: data.value
            });
        }

    }

    getButtonLabel = () => {
        return this.props.isNew ? 'create' : 'edit';
    }

    componentDidMount() {
        if (this.props.sale) {
            const { id, customerId, productId, storeId, dateSold } = this.props.sale;
            this.setState({ id, customerId, productId, storeId, dateSold });
        }
    }
}