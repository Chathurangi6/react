import React, { Component } from 'react';
import '../Landing/Css/Header.css';
import '../Landing/Css/Home.css';
import {BrowserRouter , Link} from "react-router-dom";
import { NavLink, NavItem, DropdownItem,Dropdown, DropdownToggle, DropdownMenu} from 'reactstrap';
import imglogo from '../../../assets/logo1.png';

class Navbar extends Component {
    render() {
        return (
       <div>
           <header class="header" >
                    <div class="container">
                        <div class="row">
                            <div class="col">
                                <div class="header_content d-flex flex-row align-items-center justify-content-start">
                                    <Link to="/" className="nav-link">
                                        <div class="logo ">
                                            {/* <a href="#"> */}
                                                <img className="imglogo" src={imglogo} alt="" />
                                            {/* </a> */}
                                        </div>
                                    </Link>

                                    <nav className="main_nav">
                                       
                                         <ul class="d-flex flex-row  justify-content-start ">
                                            
                                             <NavItem>
                                            
                                             <NavLink href="/" > <div className="fontSW">Home </div></NavLink>
                                        
                                         </NavItem>
                                           
                                      

                                             <Dropdown nav >
                                            <DropdownToggle nav caret>
                                            <div className="fontSW">
                                                Standard Rates   
                                                </div>
                                                 
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem href="/StandardRates">
                                                Download Standard Estimate Rates
                                               
                                                </DropdownItem>
                                            </DropdownMenu>
                                            </Dropdown>


                                             <Dropdown nav >
                                            <DropdownToggle nav caret>
                                            <div className="fontSW">
                                            Relevent Circulars 
                                                </div>
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem href="/Circular">
                                                    Download Relevent Circulars 
                                                   
                                                    </DropdownItem>
                                            </DropdownMenu>
                                            </Dropdown>
                                             

                                             <Dropdown nav >
                                            <DropdownToggle nav caret>
                                            <div className="fontSW">
                                                Help
                                                </div>
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem href="/UserManual">User Manual</DropdownItem>
                                                <DropdownItem href="/#">Another Action</DropdownItem>
                                            </DropdownMenu>
                                            </Dropdown>
                                          

                                             <NavItem>
                                            
                                                 <NavLink href="https://www.ceb.lk" target="_blank" >
                                                 <div className="fontSW">
                                                     About Us
                                                     </div>
                                                     </NavLink>
                                           
                                             </NavItem>

                                           
                                         </ul>
                                        
                                     </nav>
                                    <div >
                                        
                                    <div style={{marginTop: '-4vh',marginLeft:'55vh'}}>
                                    <button class="btn btn-outline-light book_button" color="link"><Link to="/login">Login</Link></button>
                                    </div>
                                    </div>
                                    <div class="hamburger ml-auto"><i class="fa fa-bars" aria-hidden="true"></i></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
       </div>
        )
    }
}

export default Navbar
