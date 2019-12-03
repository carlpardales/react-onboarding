import React, { Component } from 'react';
import { Button, Form, Icon } from 'semantic-ui-react';

export class CreateProductForm extends Component {
    static displayName = CreateProductForm.name;

    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            name: '',
            price: ''
        }
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                    <input name='id' type='hidden' onChange={this.handleChange} value={this.state.id} />
                </Form.Field>
                <Form.Field>
                    <label htmlFor='name'>NAME</label>
                    <input name='name' onChange={this.handleChange} value={this.state.name} />
                </Form.Field>
                <Form.Field>
                    <label htmlFor='price'>PRICE</label>
                    <input name='price' type='number' onChange={this.handleChange} value={this.state.price} />
                </Form.Field>
                <Button color='black' onClick={this.props.toggle}>cancel</Button>
                <Button disabled={!this.state.name} color='green' type='submit'>
                    <Icon name='checkmark' />{this.getButtonLabel()}
                </Button>
            </Form>
        );
    }

    componentDidMount() {
        if (this.props.product) {
            const { id, name, price } = this.props.product
            this.setState({ id, name, price })

        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const data = JSON.stringify({
            id: this.state.id,
            name: this.state.name,
            price: Number(this.state.price)
        });

        this.isNew() ? this.submitNew(data) : this.submitEdit(data);
    }

    isNew = () => {
        const isNew = this.props.isNew;

        return (isNew) ? true : false;
    }

    submitNew = (data) => {
        fetch('product', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        })
            .then(response => response.json())
            .then(product => {
                this.props.addProductToState(product);
                this.props.toggle();
            });
    }

    submitEdit = (data) => {
        fetch('product', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data

        }).then((response) => response.json())
            .then(() => {
                this.props.updateProductIntoState(this.state.id);
                this.props.toggle();
            })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })

    }

    getButtonLabel = () => {
        return this.props.isNew ? 'create' : 'edit';
    }
}