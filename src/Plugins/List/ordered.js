import React from 'react';
import { PluginComponent } from '../plugins';
import { GoListOrdered } from 'react-icons/go';

export default class OrderedList extends PluginComponent {
    static pluginName = 'list-ordered';
    static align = 'left';

    constructor(props) {
        super(props);

        this.handleKeyboard = {
            key: '7',
            keyCode: 55,
            aliasCommand: true,
            withKey: ['ctrlKey', 'shiftKey'],
            callback: () => this.props.editor.insertMarkdown('order')
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
                className='cdmd-button-toolbar button-type-list-ordered'
                title='Ordered List'
                onClick={() => this.props.editor.insertMarkdown('order')}>
                <GoListOrdered />
            </span>
        );
    }
}
