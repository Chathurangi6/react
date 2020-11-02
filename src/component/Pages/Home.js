import React, { Component } from 'react';
import {Link} from "react-router-dom";
import '../Common/Landing/Css/Header.css';
//import HomeNavbar from '../Common/Nav/HomeNavbar';
import '../Common/Landing/Css/Home.css';
import { Helmet } from 'react-helmet';
import Estimatedashboard from'../Dash/Estimatedashboard '; 
const TITLE = 'HOME'
class Home extends Component {
    constructor(props){
        super(props);
        this.state = {

        };
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    async componentDidMount(){

    }

    async handleSubmit(e){
      e.preventDefault();
      fetch("/gldeptin/" + sessionStorage.getItem('costCenterNo')).then((response) => {
        if (response.ok) {
            console.log('ok')
          return response.json();
        } else {
          throw new Error('Something went wrong');
        }
      })
      .then((data) => {
        console.log('setstate')
         this.setState({ GldeptinView: data})
         this.props.history.push('/gldeptin/view');
      })
      .catch((error) => {
        console.log('errorerror')
        console.log(error)
        this.props.history.push('/gldeptin/add');
      });
    }
      
 render() 
 {
    return (
        <div>
          {/* <HomeNavbar/> */}
          <Helmet>
          <title>{ TITLE }</title>
        </Helmet>

 
               
          <div >
          <div class="container">
          < Estimatedashboard/>
          <div class="row">
        
            {/* <div class="col-12 col-sm-2">
               <form>
                <button class="btn btn-primary btn-lg"><Link to="/groups" style={{color:"#FFFFFF"}}>User Detail</Link></button>
               </form>
            </div>
            <div class="col-12 col-sm-2">
              <form>
                <button class="btn btn-primary btn-lg" ><Link to="/warehouseFullList" style={{color:"#FFFFFF"}}>WareHouse</Link></button>
               </form>
            </div>
            <div class="col-12 col-sm-2">
              <form>
                <button class="btn btn-primary btn-lg" ><Link to="/authorizedAppType" style={{color:"#FFFFFF"}}>Au.AppType</Link></button>
               </form>
            </div>
            <div class="col-12 col-sm-2">
              <form>
                <button class="btn btn-primary btn-lg" onClick={this.handleSubmit}>Gldeptin</button>
               </form>
            </div>
            <div class="col-12 col-sm-2">
              <form>
                <button class="btn btn-primary btn-lg" ><Link to="/applicant/" style={{color:"#FFFFFF"}}>Applicant</Link></button>
               </form>
            </div>
            <div class="col-12 col-sm-2">
              <form>
                <button class="btn btn-primary btn-lg" ><Link to="/spestedys" style={{color:"#FFFFFF"}}>Spestedy2</Link></button>
               </form>
            </div>
            
          </div>
        </div>
                                
                               
                            </div>
                     
          </div>
          <div style={{marginTop:"5vh"}}>
               
          <div >
          <div class="container">
          <div class="row">
            <div class="col-12 col-sm-2">
               <form>
                <button class="btn btn-primary btn-lg"><Link to="/spestedyf" style={{color:"#FFFFFF"}}>SpestedyF</Link></button>
               </form>
            </div>
            <div class="col-12 col-sm-2">
              <form>
                <button class="btn btn-primary btn-lg" ><Link to="/spestedya" style={{color:"#FFFFFF"}}>SpestedyA</Link></button>
               </form>
            </div>
            <div class="col-12 col-sm-2">
              <form>
                <button class="btn btn-primary btn-lg" ><Link to="/tariffCategory" style={{color:"#FFFFFF"}}>TariffCa.</Link></button>
               </form>
            </div>
            <div class="col-12 col-sm-2">
              <form>
                <button class="btn btn-primary btn-lg" ><Link to="/spdppolm" style={{color:"#FFFFFF"}} >Spdppolm</Link></button>
               </form>
            </div>
            <div class="col-12 col-sm-2">
              <form>
                <button class="btn btn-primary btn-lg" ><Link to="/spestmtm" style={{color:"#FFFFFF"}}>Spestmtm</Link></button>
               </form>
            </div>
            <div class="col-12 col-sm-2">
              <form>
                <button class="btn btn-primary btn-lg" ><Link to="/splbpole" style={{color:"#FFFFFF"}}>splbpole</Link></button>
               </form>
            </div>
            
          </div>
        </div>
                                
                               
                            </div>
                     
          </div>
          <div style={{marginTop:"5vh"}}>
               
          <div >
          <div class="container">
          <div class="row">
            <div class="col-12 col-sm-2">
               <form>
                <button class="btn btn-primary btn-lg"><Link to="/splbpolt" style={{color:"#FFFFFF"}}>splbpolt</Link></button>
               </form>
            </div>
            <div class="col-12 col-sm-2">
              <form>
                <button class="btn btn-primary btn-lg" ><Link to="/splbsrvc" style={{color:"#FFFFFF"}}>splbsrvc</Link></button>
               </form>
            </div>
            <div class="col-12 col-sm-2">
              <form>
                <button class="btn btn-primary btn-lg" ><Link to="/splbstay" style={{color:"#FFFFFF"}}>splbstay</Link></button>
               </form>
            </div>
            <div class="col-12 col-sm-2">
              <form>
                <button class="btn btn-primary btn-lg" ><Link to="/splbstrt" style={{color:"#FFFFFF"}} >splbstrt</Link></button>
               </form>
            </div>
            <div class="col-12 col-sm-2">
              <form>
                <button class="btn btn-primary btn-lg" ><Link to="/sppolemt" style={{color:"#FFFFFF"}}>Sppolemt</Link></button>
               </form>
            </div>
            <div class="col-12 col-sm-2">
              <form>
                <button class="btn btn-primary btn-lg" ><Link to="/spstaymt" style={{color:"#FFFFFF"}}>spstaymt</Link></button>
               </form>
            </div>
            
          </div>
        </div>
                                
                               
                            </div>
                     
          </div>
          <div style={{marginTop:"5vh"}}>
               
          <div >
          <div class="container">
          <div class="row">
            <div class="col-12 col-sm-2">
               <form>
                <button class="btn btn-primary btn-lg"><Link to="/spstrutm" style={{color:"#FFFFFF"}}>spstrutm</Link></button>
               </form>
            </div>
            <div class="col-12 col-sm-2">
              <form>
                <button class="btn btn-primary btn-lg" ><Link to="/spsvcwrm" style={{color:"#FFFFFF"}}>spsvcwrm</Link></button>
               </form>
            </div>
            <div class="col-12 col-sm-2">
              <form>
                <button class="btn btn-primary btn-lg" ><Link to="/billing" style={{color:"#FFFFFF"}}>BillingCode</Link></button>
               </form>
            </div>
            <div class="col-12 col-sm-2">
              <form>
                <button class="btn btn-primary btn-lg" ><Link to="/sauserm" style={{color:"#FFFFFF"}} >UserProfile</Link></button>
               </form>
            </div>
            <div class="col-12 col-sm-2">
              <form>
                <button class="btn btn-primary btn-lg" ><Link to="/application/add" style={{color:"#FFFFFF"}}>AddApplica.</Link></button>
               </form>
            </div>
            <div class="col-12 col-sm-2">
              <form>
                <button class="btn btn-primary btn-lg" ><Link to="/spestedy" style={{color:"#FFFFFF"}}>Spestedy</Link></button>
               </form>
            </div> */}
            
          </div>
        </div>
                                
                               
                     
                     
          </div>        
        
                
        </div>    
    );
  }
 }

export default Home;
