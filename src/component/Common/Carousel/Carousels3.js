import React, { Component } from 'react';
import '../../../App.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './Css/Carousels.css';
class Carousels3 extends Component {
    render() {
        return (
           
                <div class="col-md-3">
            <div className="carousel">
             
            <Carousel 
                showArrows={false} 
                autoPlay={true} 
                infiniteLoop={true} 
                showStatus={false} 
                stopOnHover={false} 
                showThumbs={false}
                width='100%'               
                >

                <div className="item" >
                    <img src={require('../../../assets/images/e.jpg')} />
                </div>
                <div className="item">
                    <img src={require('../../../assets/images/index1.jpg')} />
                </div>
                <div className="item">
                    <img src={require('../../../assets/images/3.jpg')} />
                </div>
                
            </Carousel>

           
            
            </div>
            </div>
            
        );
    }
}

export default Carousels3; 