import React from 'react';
import { PluginComponent } from '../plugins';
import { CgCode } from 'react-icons/cg';

export default class BlockCodeInline extends PluginComponent {
    static pluginName = 'block-code-inline';
    static align = 'left';

    render() {
        return (
            <span
                className='cdmd-button-toolbar button-type-code-inline'
                title='Inline Code'
                onClick={() => this.props.editor.insertMarkdown('inlinecode')}>
                <CgCode />
            </span>
        );
    }
}
