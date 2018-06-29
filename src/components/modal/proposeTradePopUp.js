import React, { Component } from 'react';
import './proposeTradePopUp.scss';
import './../styles/text.scss';
import './../styles/colors.scss';
import PropTypes from 'prop-types';



class Popup extends Component {
    constructor() {
        super();
    }

    render() {
        if(!this.props.show) {
            return null;
        }

        const backgroundStyle = {
            position:'absolute',
            top: '952px',
            bottom: '0',
            left: '94px',
            right: '0',
            padding:50,
            backgroundColor: 'white',
            width: '22%',
            height: '1100px'
        };

        // const popupStyle = {
        //     backgroundColor: 'white',
        //     width:'1080px',
        //     height: '1138px',
        //     margin: '326px 0px',
        //     marginLeft: '148px',
        //     padding: '30px',
        //     fontSize: '80px'

        // };

        const closebtnStyle = {
            outline: 'none',
            backgroundColor: 'transparent',
            color: 'grey',
            border: 'none',
            fontSize: '100px',
        };

        return(
            <div className="propose-background" style={backgroundStyle} >
                <div className="close-propose">
                    <button className="closeBtn" style={closebtnStyle} onClick={this.props.onClose}>
                        x
                    </button>
                </div>
                <div className="trade-btn">
                    <button> 
                        Trade
                    </button> 

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