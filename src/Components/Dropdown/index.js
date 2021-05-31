import React from 'react';
import './index.css';

class DropList extends React.Component {
    constructor(props) {
        super(props);
        this.dropdownRef = React.createRef();
        this.handleClose = this.handleClose.bind(this);
    }

    componentDidUpdate() {
        this.getClassForPosition();
    }

    getClassForPosition() {
        const node = this.dropdownRef.current;
        const domRect = node.getBoundingClientRect();
        const windowWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

        if (windowWidth - (domRect.left + domRect.width) < 0) {
            node.classList.add('cdmd-drop-wrap-right');
            node.classList.remove('cdmd-drop-wrap-left');
            node.classList.remove('cdmd-drop-wrap-center');
        } else if (domRect.left < domRect.width / 2) {
            node.classList.add('cdmd-drop-wrap-left');
            node.classList.remove('cdmd-drop-wrap-right');
            node.classList.remove('cdmd-drop-wrap-center');
        } else {
            node.classList.add('cdmd-drop-wrap-center');
            node.classList.remove('cdmd-drop-wrap-right');
            node.classList.remove('cdmd-drop-wrap-left');
        }
    }

    handleClose(e) {
        e.stopPropagation();
        const { onClose } = this.props;
        if (typeof onClose === 'function') {
            onClose();
        }
    }
    render() {
        return (
            <div
                ref={this.dropdownRef}
                className={`cdmd-drop-wrap cdmd-drop-wrap-${this.props.show ? 'show' : 'hidden'}`}
                style={{ maxHeight: this.props.dropdownMaxHeight || 200, width: this.props.dropdownWidth || 205 }}
                onClick={this.handleClose}>
                {this.props.children}
            </div>
        );
    }
}
export default DropList;
