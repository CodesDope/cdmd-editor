import React from 'react';
import { PluginComponent } from '../plugins';
import { BsCodeSlash } from 'react-icons/bs';

export default class BlockCode extends PluginComponent {
    static pluginName = 'block-code-block';
    static align = 'left';

    render() {
        return (
            <span
                className='button button-type-code'
                title='Code'
                onClick={() => this.props.editor.insertMarkdown('code')}>
                <BsCodeSlash />
            </span>
        );
    }
}
