import React from 'react';
import { PluginComponent } from '../plugins';
import { BsBlockquoteLeft } from 'react-icons/bs';

export default class BlockQuote extends PluginComponent {
    static pluginName = 'block-quote';
    static align = 'left';

    render() {
        return (
            <span
                className='button button-type-quote'
                title='Quote'
                onClick={() => this.props.editor.insertMarkdown('quote')}>
                <BsBlockquoteLeft />
            </span>
        );
    }
}
