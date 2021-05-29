import React from 'react';
import { PluginComponent } from '../plugins';
import { BsTypeStrikethrough } from 'react-icons/bs';

export default class Strikethrough extends PluginComponent {
    static pluginName = 'strikethrough';
    static align = 'left';

    constructor(props) {
        super(props);

        this.handleKeyboard = {
            key: 'd',
            keyCode: 68,
            aliasCommand: true,
            withKey: ['ctrlKey'],
            callback: () => this.props.editor.insertMarkdown('strikethrough')
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
                className='cdmd-button-toolbar button-type-strikethrough'
                title='Strikethrough'
                onClick={() => this.props.editor.insertMarkdown('strikethrough')}>
                <BsTypeStrikethrough />
            </span>
        );
    }
}
