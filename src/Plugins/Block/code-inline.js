import React from 'react';
import { PluginComponent } from '../plugins';
import { BsCode } from 'react-icons/bs';

export default class BlockCodeInline extends PluginComponent {
    static pluginName = 'block-code-inline';
    static align = 'left';

    render() {
        return (
            <span
                className='button button-type-code-inline'
                title='Inline Code'
                onClick={() => this.props.editor.insertMarkdown('inlinecode')}>
                <BsCode />
            </span>
        );
    }
}
