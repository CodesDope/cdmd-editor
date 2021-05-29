import React from 'react';

export class PluginComponent extends React.Component {
    static pluginName = 'bold';
    static align = 'left';
    static config = {};

    constructor(props) {
        super(props);
    }
}
