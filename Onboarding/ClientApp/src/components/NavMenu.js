import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';
import './NavMenu.css';

export class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.state = {
            activeItem: '',
            collapsed: true
        };
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render() {
        const activeItem = this.state.activeItem;

        return (
            <Menu inverted>
                <Menu.Item header
                    name='home'
                    href='/'
                    active={activeItem === 'customers'}
                    onClick={this.handleItemClick}>
                    React
                </Menu.Item>
                <Menu.Item
                    name='customers'
                    href='/'
                    active={activeItem === 'customers'}
                    onClick={this.handleItemClick}
                >
                    Customers
                </Menu.Item>
                <Menu.Item
                    name='products'
                    href='/products'
                    active={activeItem === 'products'}
                    onClick={this.handleItemClick}
                >
                    Products
                </Menu.Item>
                <Menu.Item
                    name='stores'
                    href='/stores'
                    active={activeItem === 'stores'}
                    onClick={this.handleItemClick}
                >
                    Stores
                </Menu.Item>
                <Menu.Item
                    name='sales'
                    href='/fetchsales'
                    active={activeItem === 'sales'}
                    onClick={this.handleItemClick}
                >
                    Sales
                </Menu.Item>
            </Menu>
        );
    }
}
