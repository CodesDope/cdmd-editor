import React from 'react';
import { PluginComponent } from '../plugins';
import { CgSmile } from 'react-icons/cg';
import Dropdown from '../../Components/Dropdown';
import EmojiList from './emoji-list';

export default class Emoji extends PluginComponent {
    static pluginName = 'emoji';
    static align = 'left';

    constructor(props) {
        super(props);

        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);

        this.state = {
            show: false
        };
    }

    show() {
        this.setState({
            show: true
        });
    }

    hide() {
        this.setState({
            show: false
        });
    }

    render() {
        return (
            <span
                className='cdmd-button-toolbar cdmd-button-toolbar-dropdown button-type-emoji'
                onMouseEnter={this.show}
                onMouseLeave={this.hide}>
                <CgSmile />
                <Dropdown show={this.state.show} onClose={this.hide}>
                    <EmojiList onSelect={emoji => this.props.editor.insertMarkdown('emoji', { unicode: emoji })} />
                </Dropdown>
            </span>
        );
    }
}
