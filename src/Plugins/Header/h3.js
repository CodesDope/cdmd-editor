import React from 'react';
import { PluginComponent } from '../../Plugins/plugins';
import { BsTypeH3 } from 'react-icons/bs';

export default class H3 extends PluginComponent {
    static pluginName = 'h3';
    static align = 'left';

    render() {
        return (
            <span className='button button-type-h3' title='H3' onClick={() => this.props.editor.insertMarkdown('h3')}>
                <BsTypeH3 />
            </span>
        );
    }
}
