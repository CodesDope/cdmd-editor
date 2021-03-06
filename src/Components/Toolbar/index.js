import React from 'react';
import './index.css';

const Toolbar = props => {
    return (
        <div className={`cdmd-navbar ${props.toolbarClassName}`} style={props.style}>
            <div className='cdmd-tool-bar left'>
                <div className='button-wrap'>{props.left}</div>
            </div>
            <div className='cdmd-tool-bar right'>
                <div className='button-wrap'>{props.right}</div>
            </div>
        </div>
    );
};

export default Toolbar;
