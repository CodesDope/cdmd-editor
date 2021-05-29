import React from 'react';
import './index.css';
import Toolbar from '../Components/Toolbar';
import getDecorated from '../Utils/decorate';
import { isKeyMatch } from '../Utils/tools';
import emitter from '../Share/emitter';

class Editor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: (this.props.value || this.props.defaultValue || '').replace(/↵/g, '\n'),
            plugins: this.getPlugins()
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);

        this.editorRef = React.createRef();
    }

    componentDidUpdate(prevProps) {
        if (typeof this.props.value !== 'undefined' && this.props.value !== this.state.text) {
            let value = this.props.value;
            if (typeof value !== 'string') {
                value = String(value).toString();
            }
            value = value.replace(/↵/g, '\n');
            if (this.state.text !== value) {
                this.setState({
                    text: value
                });
            }
        }
        if (prevProps.plugins !== this.props.plugins) {
            this.setState({
                plugins: this.getPlugins()
            });
        }
    }

    static plugins = [];
    static keyboardListeners = [];

    static use = (comp, config) => {
        for (let i = 0; i < Editor.plugins.length; i++) {
            if (Editor.plugins[i].comp === comp) {
                Editor.plugins.splice(i, 1, { comp, config });
                return;
            }
        }
        Editor.plugins.push({ comp, config });
    };

    static unuse(comp) {
        for (let i = 0; i < Editor.plugins.length; i++) {
            if (Editor.plugins[i].comp === comp) {
                Editor.plugins.splice(i, 1);
                return;
            }
        }
    }
    static unuseAll() {
        Editor.plugins = [];
    }

    onKeyboard(data) {
        if (Array.isArray(data)) {
            data.forEach(it => this.onKeyboard(it));
            return;
        }
        if (!Editor.keyboardListeners.includes(data)) {
            Editor.keyboardListeners.push(data);
        }
    }
    offKeyboard(data) {
        if (Array.isArray(data)) {
            data.forEach(it => this.offKeyboard(it));
            return;
        }
        const index = Editor.keyboardListeners.indexOf(data);
        if (index >= 0) {
            Editor.keyboardListeners.splice(index, 1);
        }
    }

    getPlugins() {
        let plugins = [];
        if (this.props.plugins) {
            // If plugins option is configured, use only specified plugins
            const addToPlugins = name => {
                for (const it of Editor.plugins) {
                    if (it.comp.pluginName === name) {
                        plugins.push(it);
                        return;
                    }
                }
            };
            for (const name of this.props.plugins) {
                addToPlugins(name);
            }
        } else {
            // Use all registered plugins
            plugins = [...Editor.plugins];
        }
        const result = {};
        plugins.forEach(it => {
            if (typeof result[it.comp.align] === 'undefined') {
                result[it.comp.align] = [];
            }
            result[it.comp.align].push(
                React.createElement(it.comp, {
                    editor: this,
                    editorConfig: this.config,
                    config: {
                        ...(it.comp.defaultConfig || {}),
                        ...(it.config || {})
                    },
                    key: it.comp.pluginName
                })
            );
        });
        return result;
    }

    getEditorSelection = () => {
        const start = this.editorRef.current.selectionStart;
        const end = this.editorRef.current.selectionEnd;
        const text = (this.editorRef.current.value || '').slice(start, end);

        return { start, end, text };
    };

    setSelection(to) {
        if (this.editorRef.current) {
            this.editorRef.current.setSelectionRange(to.start, to.end, 'forward');
            this.editorRef.current.focus();
        }
    }

    changeText(value = '', event, newSelection) {
        const text = value.replace(/↵/g, '\n');
        if (this.state.text === value) {
            return;
        }
        this.setState({ text });
        if (this.props.onChange) {
            this.props.onChange({ text });
        }
        emitter.emit(emitter.EVENT_CHANGE, value, event, typeof event === 'undefined');
        if (newSelection) {
            setTimeout(() => this.setSelection(newSelection));
        }
    }

    insertText = (value, replaceSelected = false, newSelection) => {
        const { text } = this.state;
        const selection = this.getEditorSelection();
        const beforeContent = text.slice(0, selection.start);
        const afterContent = text.slice(replaceSelected ? selection.end : selection.start, text.length);

        this.changeText(
            beforeContent + value + afterContent,
            undefined,
            newSelection
                ? {
                      start: newSelection.start + beforeContent.length,
                      end: newSelection.end + beforeContent.length
                  }
                : {
                      start: selection.start,
                      end: selection.start
                  }
        );
    };

    insertMarkdown = (type, option) => {
        let selection = this.getEditorSelection();
        let decorateOption = option ? { ...option } : {};

        const decorate = getDecorated(selection.text, type, decorateOption);
        this.insertText(decorate.text, true, decorate.selection);
    };

    handleChange(e) {
        e.persist();
        const value = e.target.value;
        this.changeText(value, e);
    }

    handleKeyDown(e) {
        for (const it of Editor.keyboardListeners) {
            if (isKeyMatch(e, it)) {
                e.preventDefault();
                it.callback(e);
                return;
            }
        }
        emitter.emit(emitter.EVENT_KEY_DOWN, e);
    }

    getMdValue() {
        return this.state.text;
    }

    getEventType(event) {
        switch (event) {
            case 'change':
                return emitter.EVENT_CHANGE;
            case 'fullscreen':
                return emitter.EVENT_FULL_SCREEN;
            case 'viewchange':
                return emitter.EVENT_VIEW_CHANGE;
            case 'keydown':
                return emitter.EVENT_KEY_DOWN;
            case 'blur':
                return emitter.EVENT_BLUR;
            case 'focus':
                return emitter.EVENT_FOCUS;
            case 'scroll':
                return emitter.EVENT_SCROLL;
        }
    }

    on(event, cb) {
        const eventType = this.getEventType(event);
        if (eventType) {
            emitter.on(eventType, cb);
        }
    }

    off(event, cb) {
        const eventType = this.getEventType(event);
        if (eventType) {
            emitter.off(eventType, cb);
        }
    }

    render() {
        const getPluginAt = at => this.state.plugins[at] || [];
        return (
            <div
                className={`cdmd-parent-container ${this.props.cdmdContainerClassName}`}
                onKeyDown={this.handleKeyDown}>
                <Toolbar
                    toolbarClassName={this.props.toolbarClassName}
                    left={getPluginAt('left')}
                    right={getPluginAt('right')}>
                    {this.state.plugins}
                </Toolbar>
                <textarea
                    id={this.props.textareaId || 'cdmd-editor-area'}
                    ref={this.editorRef}
                    name={this.props.name || 'cdmd-textarea'}
                    placeholder={this.props.placeholder}
                    readOnly={this.props.readOnly}
                    value={this.state.text}
                    className={`cdmd-textarea ${this.props.editorClassName}`}
                    wrap='hard'
                    onChange={this.handleChange}
                    rows={this.props.rows || 5}
                />
            </div>
        );
    }
}

export default Editor;
