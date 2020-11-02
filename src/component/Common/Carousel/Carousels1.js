import React, { Component } from 'react';
import '../../../App.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './Css/Carousels.css';
class Carousels1 extends Component {
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
                    <img src={require('../../../assets/images/j.jpg')} />
                </div>
                <div className="item">
                    <img src={require('../../../assets/images/l.jpg')} />
                </div>
                <div className="item">
                    <img src={require('../../../assets/images/i.jpg')} />
                </div>
                
            </Carousel>

           
            
            </div>
            </div>
            
        );
    }
}

export default Carousels1; 