import React, { Component } from 'react';
import { Button, Form, Icon } from 'semantic-ui-react';

export class CreateCustomerForm extends Component {
    static displayName = CreateCustomerForm.name;

    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            name: '',
            address: '',
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
                    <label htmlFor='address'>ADDRESS</label>
                    <input name="address" onChange={this.handleChange} value={this.state.address} />
                </Form.Field>
                <Button color='black' onClick={this.props.toggle}>cancel</Button>
                <Button disabled={!this.state.name} color='green' type='submit'>
                    <Icon name='checkmark' />{this.getButtonLabel()}
                </Button>
            </Form>
        );
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const data = JSON.stringify({
            id: this.state.id,
            name: this.state.name,
            address: this.state.address
        });

        this.isNew() ? this.submitNew(data) : this.submitEdit(data);
    }

    isNew = () => {
        const isNew = this.props.isNew;

        return (isNew) ? true : false;
    }

    submitNew = (data) => {
        fetch('customer', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        })
            .then(response => response.json())
            .then(customer => {
                this.props.updateCustomerIntoState(this.state.id);
                this.props.toggle();
            });
    }

    submitEdit = (data) => {
        fetch('customer', {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        }).then((response) => response.json())
            .then(() => {
                this.props.updateCustomerIntoState(this.state.id);
                this.props.toggle();
            })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    getButtonLabel = () => {
        return this.props.isNew ? 'create' : 'edit';
    }

    componentDidMount() {
        if (this.props.customer) {
            const { id, name, address } = this.props.customer;
            this.setState({ id, name, address });
        }
    }
}