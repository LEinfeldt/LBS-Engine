'use strict';

const React = require('react');

/**
 * Simple Component to embed a full screen html.
 * Uses the props.site as a src for the iframe
 */
class EmbededComponent extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{height: '100%', width: '100%'}}>
                <iframe style={{height: '100%', width: '100%'}} src={this.props.site}></iframe>
            </div>
        )
    }
}

module.exports = {
    EmbededComponent: EmbededComponent
}