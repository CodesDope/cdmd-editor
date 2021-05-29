import React from 'react';
import { PluginComponent } from './plugins';
import { BsFillImageFill } from 'react-icons/bs';

export default class Image extends PluginComponent {
    static pluginName = 'image';
    static align = 'left';

    render() {
        return (
            <span
                className='button button-type-image'
                title='Image'
                onClick={() => this.props.editor.insertMarkdown('image')}>
                <BsFillImageFill />
            </span>
        );
    }
}
