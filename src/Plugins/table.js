import React from 'react';
import { PluginComponent } from './plugins';
import { BsGrid3X2 } from 'react-icons/bs';

export default class Table extends PluginComponent {
    static pluginName = 'table';
    static align = 'left';

    render() {
        return (
            <span
                className='cdmd-button-toolbar button-type-table'
                title='Table'
                onClick={() => this.props.editor.insertMarkdown('table')}>
                <BsGrid3X2 />
            </span>
        );
    }
}
