import React from 'react';
import { PluginComponent } from './plugins';
import { IoLinkSharp } from 'react-icons/io5';

export default class Link extends PluginComponent {
    static pluginName = 'link';
    static align = 'left';

    constructor(props) {
        super(props);

        this.handleKeyboard = {
            key: 'k',
            keyCode: 75,
            aliasCommand: true,
            withKey: ['ctrlKey'],
            callback: () => this.props.editor.insertMarkdown('link')
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
                className='cdmd-button-toolbar button-type-link'
                title='Link'
                onClick={() => this.props.editor.insertMarkdown('link')}>
                <IoLinkSharp />
            </span>
        );
    }
}
