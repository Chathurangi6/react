import React from "react";
import '../Landing/Css/Header.css';
import { Row, Container } from "reactstrap";

function Footer() {
  return (
    <div className="FooterClr" style={{position:'fixed',
    bottom: 0,
    height:'4%',
    width: '100%',}}> 
      <footer>
        <Container>
          <Row>
            <nav className="footer-nav">
            </nav>
            <div style={{marginLeft: '475px',color:'#f0f1f5',height:"20px" ,fontSize:"12.5px" }} >
             <div  style={{marginTop:"0.3vh",marginLeft: '-16vh'}}>                    
              © Ceylon Electricity Board 2019.12.18_V1.0. All rights reserved.{" "}
              <i className=" fa fa-lightbulb-o fa-spin" />          
            </div>
            </div>
          </Row>
        </Container>
      </footer>
    </div>
     
  );
}

export default Footer;