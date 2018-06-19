import React, { Component } from 'react';
import './popup.scss';
import './../styles/text.scss';
import './../styles/colors.scss';
import PropTypes from 'prop-types';



class Popup extends Component {
    render() {
        if(!this.props.show) {
            return null;
        }

        const backgroundStyle = {
            position:'fixed',
            top: '0',
            bottom: '0',
            left: '0',
            right: '0',
            backgroundColor: 'rgba(255,255,255,0.3)',
            padding:50
        };

        const popupStyle = {
            backgroundColor: '#202CE0',
            borderRadius: '12px',
            width:'2220px',
            height: '1270px',
            margin: '800px auto',
            padding: '30px',
            color: 'white'

        };

        const closebtnStyle = {
            outline: 'none',
            backgroundColor: 'transparent',
            color: 'white',
            border: 'none',
            fontSize: '130px'
        };

        return(
            <div className="background" style={backgroundStyle} onClick={this.props.onClose}>
                <div className="popup" style={popupStyle}>
                {this.props.children}

                <div className="close">
                    <button className="closeBtn" style={closebtnStyle} onClick={this.props.onClose}>
                        x
                    </button>
                </div>
                </div>
            </div>

            
        )

    }

}

Popup.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool,
    children: PropTypes.node
};

export default Popup; 