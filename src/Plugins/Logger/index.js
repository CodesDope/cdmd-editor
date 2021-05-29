import * as React from 'react';
import { PluginComponent } from '../../Plugins/plugins';
import { IoArrowUndo, IoArrowRedo } from 'react-icons/io5';
import LoggerPlugin from './logger';

const LOGGER_INTERVAL = 600;

export default class Logger extends PluginComponent {
    static pluginName = 'logger';

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleRedo = this.handleRedo.bind(this);
        this.handleUndo = this.handleUndo.bind(this);
        this.handleKeyboards = [
            { key: 'y', keyCode: 89, withKey: ['ctrlKey'], callback: this.handleRedo },
            { key: 'z', keyCode: 90, withKey: ['metaKey', 'shiftKey'], callback: this.handleRedo },
            { key: 'z', keyCode: 90, aliasCommand: true, withKey: ['ctrlKey'], callback: this.handleUndo }
        ];

        this.logger = new LoggerPlugin();
    }

    handleUndo() {
        const last = this.logger.undo(this.props.editor.getMdValue());
        if (typeof last !== 'undefined') {
            this.pause();
            this.lastPop = last;
            this.props.editor.changeText(last);
            this.forceUpdate();
        }
    }

    handleRedo() {
        const last = this.logger.redo();
        if (typeof last !== 'undefined') {
            this.lastPop = last;
            this.props.editor.changeText(last);
            this.forceUpdate();
        }
    }

    handleChange(value, e, isChange) {
        if (this.logger.getLast() === value || (this.lastPop !== null && this.lastPop === value)) {
            return;
        }
        this.logger.cleanRedo();
        if (isChange) {
            this.logger.push(value);
            this.lastPop = null;
            this.forceUpdate();
            return;
        }
        if (this.timerId) {
            window.clearTimeout(this.timerId);
            this.timerId = 0;
        }
        this.timerId = window.setTimeout(() => {
            if (this.logger.getLast() !== value) {
                this.logger.push(value);
                this.lastPop = null;
                this.forceUpdate();
            }
            window.clearTimeout(this.timerId);
            this.timerId = 0;
        }, LOGGER_INTERVAL);
    }

    componentDidMount() {
        this.props.editor.on('change', this.handleChange);
        this.handleKeyboards.forEach(it => this.props.editor.onKeyboard(it));
        this.logger.initValue = this.props.editor.getMdValue();
        this.forceUpdate();
    }

    componentWillUnmount() {
        this.props.editor.off('change', this.handleChange);
        this.handleKeyboards.forEach(it => this.props.editor.offKeyboard(it));
    }

    pause() {
        if (this.timerId) {
            clearInterval(this.timerId);
            this.timerId = undefined;
        }
    }

    render() {
        const hasUndo = this.logger.getUndoCount() > 1 || this.logger.initValue !== this.props.editor.getMdValue();
        const hasRedo = this.logger.getRedoCount() > 0;
        return (
            <React.Fragment>
                <span
                    className={`cdmd-button-toolbar button-type-undo ${hasUndo ? '' : 'disabled'}`}
                    title='Undo'
                    onClick={this.handleUndo}>
                    <IoArrowUndo />
                </span>
                <span
                    className={`cdmd-button-toolbar button-type-redo ${hasRedo ? '' : 'disabled'}`}
                    title='Redo'
                    onClick={this.handleRedo}>
                    <IoArrowRedo />
                </span>
            </React.Fragment>
        );
    }
}
