import React from 'react';
import { PluginComponent } from '../plugins';
import { BsListUl } from 'react-icons/bs';

export default class UnorderedList extends PluginComponent {
    static pluginName = 'list-unordered';
    static align = 'left';

    constructor(props) {
        super(props);

        this.handleKeyboard = {
            key: '8',
            keyCode: 56,
            aliasCommand: true,
            withKey: ['ctrlKey', 'shiftKey'],
            callback: () => this.props.editor.insertMarkdown('unordered')
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
                className='button button-type-list-ordered'
                title='Ordered List'
                onClick={() => this.props.editor.insertMarkdown('unordered')}>
                <BsListUl />
            </span>
        );
    }
}
