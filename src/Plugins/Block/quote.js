import React from 'react';
import { PluginComponent } from '../plugins';
import { IoIosQuote } from 'react-icons/io';

export default class BlockQuote extends PluginComponent {
    static pluginName = 'block-quote';
    static align = 'left';

    render() {
        return (
            <span
                className='cdmd-button-toolbar button-type-quote'
                title='Quote'
                onClick={() => this.props.editor.insertMarkdown('quote')}>
                <IoIosQuote />
            </span>
        );
    }
}
