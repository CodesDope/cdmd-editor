import React from 'react';
import { PluginComponent } from '../../Plugins/plugins';
import { BsTypeH2 } from 'react-icons/bs';

export default class H2 extends PluginComponent {
    static pluginName = 'h2';
    static align = 'left';

    render() {
        return (
            <span className='button button-type-h2' title='H2' onClick={() => this.props.editor.insertMarkdown('h2')}>
                <BsTypeH2 />
            </span>
        );
    }
}
