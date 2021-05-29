import React from 'react';
import { PluginComponent } from '../plugins';
import { AiOutlineLine } from 'react-icons/ai';

export default class BlockWrap extends PluginComponent {
    static pluginName = 'block-wrap';
    static align = 'left';

    render() {
        return (
            <span
                className='cdmd-button-toolbar button-type-hr'
                title='Line'
                onClick={() => this.props.editor.insertMarkdown('hr')}>
                <AiOutlineLine />
            </span>
        );
    }
}
