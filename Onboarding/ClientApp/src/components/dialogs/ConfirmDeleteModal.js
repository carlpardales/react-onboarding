import React, { Component } from 'react'
import { Button, Confirm, Icon } from 'semantic-ui-react'

export class ConfirmDeleteModal extends Component {
    state = { open: false }

    render() {
        return (
            <div>
                <Button onClick={this.show} color='red' icon labelPosition='left'>
                    <Icon name='trash' />
                    DELETE
        </Button>
                <Confirm
                    open={this.state.open}
                    header='Delete'
                    cancelButton='cancel'
                    confirmButton='delete'
                    onCancel={this.handleCancel}
                    onConfirm={this.handleConfirm}
                />
            </div>
        );
    }

    show = () => this.setState({ open: true })

    handleCancel = () => this.setState({ open: false })

    handleConfirm = () => {
        this.setState({ open: false });
        this.props.handleDelete();
    }
}