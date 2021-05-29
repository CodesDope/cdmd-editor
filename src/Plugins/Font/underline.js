import React from 'react';
import { PluginComponent } from '../plugins';
import { BsTypeUnderline } from 'react-icons/bs';

export default class Underline extends PluginComponent {
    static pluginName = 'underline';
    static align = 'left';

    constructor(props) {
        super(props);

        this.handleKeyboard = {
            key: 'u',
            keyCode: 85,
            aliasCommand: true,
            withKey: ['ctrlKey'],
            callback: () => this.props.editor.insertMarkdown('underline')
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
                className='cdmd-button-toolbar button-type-underline'
                title='Underline'
                onClick={() => this.props.editor.insertMarkdown('underline')}>
                <BsTypeUnderline />
            </span>
        );
    }
}
