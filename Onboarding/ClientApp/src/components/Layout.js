import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import { AppFooter } from './AppFooter';

export class Layout extends Component {
    static displayName = Layout.name;

    render() {
        return (
            <Container style={{ margin: 20 }}>
                <NavMenu />
                <Container>
                    {this.props.children}
                </Container>
                <AppFooter />
            </Container>
        );
    }
}
