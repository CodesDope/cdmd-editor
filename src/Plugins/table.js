import React from 'react';
import { PluginComponent } from './plugins';
import { BsTable } from 'react-icons/bs';

export default class Table extends PluginComponent {
    static pluginName = 'table';
    static align = 'left';

    render() {
        return (
            <span
                className='button button-type-table'
                title='Table'
                onClick={() => this.props.editor.insertMarkdown('table')}>
                <BsTable />
            </span>
        );
    }
}
