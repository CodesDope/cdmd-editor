import { emoji } from 'node-emoji';
import React from 'react';
import { emojis } from '../../Share/emoji';
import './emoji-list.css';

export default class EmojiList extends React.Component {
    handleClick(emoji) {
        const { onSelect } = this.props;
        if (typeof onSelect === 'function') {
            onSelect(emoji);
        }
    }

    getEmojis() {
        return (
            <div>
                {Object.keys(emojis).map((emoji_category, index) => {
                    return (
                        <div key={index} className='cdmd-emoji-wrapper'>
                            <div className='cdmd-emoji-cat-container'>
                                {emojis[emoji_category].map((emoji, index) => {
                                    return (
                                        <span
                                            className='cdmd-emoji-span'
                                            key={index}
                                            onClick={this.handleClick.bind(this, emoji)}>
                                            {emoji}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }

    render() {
        return <div>{this.getEmojis()}</div>;
    }
}
