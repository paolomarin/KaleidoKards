import React, { Component } from 'react';
import YouTube from 'react-youtube';
import './IntroVideo.scss';

class IntroVideo extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const opts = {
            // height: '390',
            // width: '640',
            playerVars: { // https://developers.google.com/youtube/player_parameters
                autoplay: 1
            }
        };

        if (this.props.visible) {
            return (
                <div className="overlay" onClick={this.overlayClick.bind(this)}>
                    <div className="video-container">
                        <YouTube
                            videoId="-3zsfeqO8no"
                            opts={opts}
                            onEnd={this._onEnd.bind(this)}
                        />
                    </div>
                </div>
            );
        }
        return null;
    }

    _onEnd(event) {
        this.props.setVisibility(false);
        this.props.afterVideo();
    }

    overlayClick() {
        this.props.setVisibility(false);
        this.props.afterVideo();
    }
}

export default IntroVideo;
