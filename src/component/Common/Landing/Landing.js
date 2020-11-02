import React, { Component } from 'react';
import { Button, container,NavLink, NavItem} from 'reactstrap';
import './Css/Header.css';
import Navbar from '../Nav/Navbar';
import Footer from '../Foot/Footer';
import './Css/Home.css';
import Carousels1 from '../Carousel/Carousels1';
import Carousels2 from '../Carousel/Carousels2';
import Carousels3 from '../Carousel/Carousels3';

class Landing extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
      
  render() {
    return (
        <div>
          <Navbar/>
          <div>
                <div id="contentbody">
                    <div id="content-bodyy" className="card">                                           
                    <br/><br/><br/><br/><br/><br/><br/><br/>
                    <div class="home">                        
                        <div class="home_container">
                            <div class="container">                             
                            </div>
                        </div>
                    </div>
                    <div ><br/><br/><br/><br/></div>
                    <div >
                        <div>
                            <div>
                                <div class="col">
                                    {/* <div class="search_box_container d-flex flex-row align-items-center justify-content-start" style={{marginLeft :"1.5vh"}}> */}
                                        <div class="search_form_container" >
                                            <form id="accomadtn" className = "form-container"  > 
                                                <div class="d-flex flex-lg-row flex-column align-items-center justify-content-start" style={{marginLeft :"20vh"}}>
                                                    <ul class="search_form_list d-flex flex-row align-items-center justify-content-start flex-wrap">
                                                    <NavItem>
                                            
                                            <NavLink target="_blank"><h4 style={{marginTop :"2vh", fontSize:"20px",fontFamily: "Times New Roman" , fontWeight:"900", color:"#FFFFFF"}}>Circuit Bunglow</h4></NavLink>
                                            
                                            </NavItem>   
                                            
                                            <NavItem>
                                            
                                            <NavLink href="https://www.ceb.lk" target="_blank" ><h4 style={{marginTop :"2vh",fontSize:"20px", fontFamily: "Times New Roman", fontWeight:"900", fontSize:"18px",color:"#FFFFFF"}}>CEB</h4></NavLink>
                                        
                                        </NavItem>
                                        <NavItem>
                                       
                                            <NavLink href="http://www.piv.online" target="_blank"><h4 style={{marginTop :"2vh",fontSize:"20px", fontFamily: "Times New Roman", fontWeight:"900", color:"#FFFFFF"}}>PIV Online</h4></NavLink>
                                        
                                        </NavItem>
                                        <NavItem>
                                        
                                            <NavLink href="http://www.cmds.ceb" target="_blank"><h4 style={{marginTop :"2vh", fontSize:"20px",fontFamily: "Times New Roman", fontWeight:"900",  color:"#FFFFFF"}}>CMDS</h4></NavLink>
                                        
                                        </NavItem>
                                    

                                                    </ul>
                                                    
                                                    
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                {/* </div> */}
                            </div>
                        </div>
                    </div>
                    </div>
                
                    <div class="intro">
                        <div class="container">
                            <div class="row">
                                
                            </div>
                            <br/><br/><br/><br/>
                            <div class="row intro_row" style={{marginLeft:"-26vh"}}>
                                <div class="col-sm-4">
                                    <div > < Carousels1/></div>
                                </div>
                                <div class="col-sm-4">
                                    <div > < Carousels2/></div>
                                </div>
                                <div class="col-md-3">
                                    <div > < Carousels3/></div>
                                </div>
                               
                            </div>
                        </div>
                    </div>

                   
                    <br/><br/><br/><br/>    
                     </div> 
                     
                    </div>
                    
                <Footer/>
                
        </div>    
    );
  }
}

export default Landing;
