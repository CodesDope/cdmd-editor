import React from 'react';
import { PluginComponent } from '../plugins';
import { BsTypeBold } from 'react-icons/bs';

export default class Bold extends PluginComponent {
    static pluginName = 'bold';
    static align = 'left';

    constructor(props) {
        super(props);

        this.handleKeyboard = {
            key: 'b',
            keyCode: 66,
            aliasCommand: true,
            withKey: ['ctrlKey'],
            callback: () => this.props.editor.insertMarkdown('bold')
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
                className='cdmd-button-toolbar button-type-bold'
                title='Bold'
                onClick={() => this.props.editor.insertMarkdown('bold')}>
                <BsTypeBold />
            </span>
        );
    }
}
