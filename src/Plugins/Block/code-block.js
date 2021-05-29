import React from 'react';
import { PluginComponent } from '../plugins';
import { CgCodeSlash } from 'react-icons/cg';

export default class BlockCode extends PluginComponent {
    static pluginName = 'block-code-block';
    static align = 'left';

    render() {
        return (
            <span
                className='cdmd-button-toolbar button-type-code'
                title='Code'
                onClick={() => this.props.editor.insertMarkdown('code')}>
                <CgCodeSlash />
            </span>
        );
    }
}
