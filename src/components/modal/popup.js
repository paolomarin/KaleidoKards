import React, { Component } from 'react';
import './popup.scss';
import './../styles/text.scss';
import './../styles/colors.scss';
import Star from './../card/star.png';
import Diamond from './../card/diamond.png';
import PropTypes from 'prop-types';



class Popup extends Component {

    renderCard() {

        const circle = {
            backgroundColor: 'white',
            width: '60px',
            height: '60px',
            borderRadius: '50%'
            }
        
        const triangle = {
            color: 'transparent',
            width: '0',
            height: '0',
            borderRight: '40px solid transparent',
            borderLeft: '40px solid transparent',
            borderBottom: '80px solid white'
        }
    
        const square = {
            backgroundColor: 'white',
            width: '60px',
            height: '60px'
        }
    
        const star =
        {
            backgroundImage: `url(${Star})`,
            width: '80px',
            height: '80px'
            
        }
    
        const diamond = {
            backgroundImage: `url(${Diamond})`,
            width: '80px',
            height: '80px'
        }
    
            const color= ["#202CE0", "#51C2FA", "#F99243", "#EE34A8", "#00CD79"];
            const shapes = [circle, triangle, star, square, diamond];
    
            const styles = {
            width: '150px',
            height: '200px',
            borderRadius: '12px',
            backgroundColor: color[Math.floor(Math.random() * color.length)]
            };
        
            return (
                    <div className="card" style={styles}>
                        <div style= {shapes[Math.floor(Math.random() * shapes.length)]}></div>
                    </div>
            );
        }
        
    


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
            color: 'white',
            fontSize: '80px'

        };

        const closebtnStyle = {
            outline: 'none',
            backgroundColor: 'transparent',
            color: 'white',
            border: 'none',
            fontSize: '130px',
        };

        return(
            <div className="background" style={backgroundStyle} onClick={this.props.onClose}>
                <div className="popup" style={popupStyle}>
                <div className="close">
                    <button className="closeBtn" style={closebtnStyle} onClick={this.props.onClose}>
                        x
                    </button>
                </div>
                {this.props.children}
                {this.renderCard()}

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