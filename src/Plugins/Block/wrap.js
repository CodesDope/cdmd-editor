import React from 'react';
import { PluginComponent } from '../plugins';
import { BsHr } from 'react-icons/bs';

export default class BlockWrap extends PluginComponent {
    static pluginName = 'block-wrap';
    static align = 'left';

    render() {
        return (
            <span className='button button-type-hr' title='Line' onClick={() => this.props.editor.insertMarkdown('hr')}>
                <BsHr />
            </span>
        );
    }
}
