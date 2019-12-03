import React, { Component } from 'react';
import { Button, Icon, Modal } from 'semantic-ui-react';
import { CreateSaleForm } from './CreateSaleForm'

export class CreateSaleModal extends Component {
    static displayName = CreateSaleModal.name;

    constructor(props) {
        super(props);

        this.state = {
            modal: false
        };
    }

    render() {
        const isNew = this.props.isNew;
        let title = 'Edit';
        let button = '';

        //Set Add or edit button
        if (isNew) {
            title = 'Create';
            button = <Button primary onClick={this.toggle}>New {this.props.name}</Button>;
        } else {
            button = <Button color='yellow' icon labelPosition='left' onClick={this.toggle}>
                <Icon name='edit' />EDIT</Button>;
        }

        return (
            <Modal open={this.state.modal} size='mini' dimmer='blurring' trigger={button}>
                <Modal.Header>{title} {this.props.name}</Modal.Header>
                <Modal.Content>
                    <CreateSaleForm
                        isNew={this.props.isNew}
                        updateSaleIntoState={this.props.updateSaleIntoState}
                        toggle={this.toggle}
                        sale={this.props.sale} />
                </Modal.Content>
            </Modal>
        );
    }

    toggle = () => {
        this.setState(previous => ({
            modal: !previous.modal
        }));
    }
}