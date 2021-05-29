import React from 'react';
import { PluginComponent } from '../plugins';
import { BsTypeItalic } from 'react-icons/bs';

export default class Italic extends PluginComponent {
    static pluginName = 'italic';
    static align = 'left';

    constructor(props) {
        super(props);

        this.handleKeyboard = {
            key: 'i',
            keyCode: 73,
            aliasCommand: true,
            withKey: ['ctrlKey'],
            callback: () => this.props.editor.insertMarkdown('italic')
        };
    }

    componentDidMount() {
        this.props.editor.onKeyboard(this.handleKeyboard);
    }

    componentWillUnmount() {
        this.props.editor.offKeyboard(this.handleKeyboard);
    }

    render() {
        return (
            <span
                className='button button-type-italic'
                title='Italic'
                onClick={() => this.props.editor.insertMarkdown('italic')}>
                <BsTypeItalic />
            </span>
        );
    }
}
