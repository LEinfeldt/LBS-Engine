'use strict';

const React = require('react');
const Ons = require('react-onsenui');

//custom imports
const map = require('./map.js');

/**
 * Component for displaying the picture view. On top a picture is displayed and below a map.
 * The map is generated in the same way, it is defined in the config file.
 */
class PictureView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            imgUrl: this.props.imgUrl
        }
        this.handlePictureChange = this.handlePictureChange.bind(this);
    }

    //handle a possible change of the picture
    handlePictureChange(value) {
        this.setState({imgUrl: value});
    }

    render() {
        return (
            <div className="center" style={{height: '100%'}}>
                <Ons.Row style={{width: '100%', height: '50%'}}>
                    <img src="../res/icon/android/icon-96-xhdpi.png"/>
                </Ons.Row>
                <Ons.Row style={{width: '100%', height: '50%'}}>
                    <map.Map />
                </Ons.Row>
            </div>
        )
    }
}

module.exports = {
    PictureView: PictureView
}