import React, { Fragment } from 'react';
import { Dropdown } from 'semantic-ui-react';

const limitOptions = [
    { key: '0', value: '2', text: '2' },
    { key: '1', value: '4', text: '4' },
    { key: '2', value: '5', text: '5' },
    { key: '3', value: '10', text: '10' },
];

export const PageSizeSelect = props => (
    <Fragment>
        Records per page:{' '}
        <Dropdown
            inline
            options={limitOptions}
            defaultValue={props.limit}
            onChange={props.handleLimitChange}
        />
    </Fragment>
);
