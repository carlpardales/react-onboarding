import React, { Component, Fragment } from 'react';

export class AppFooter extends Component {
    render() {
        return (
            <Fragment>
                <hr className="featurette-divider" />
                <footer style={{ padding: "0 50px" }} className="navbar fixed-bottom">
                    <p>© 2019 Carlito Pardales</p>
                </footer>
            </Fragment>
        );
    }
}