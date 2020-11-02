import React, { Component } from 'react'
import './css/Spes.css'
//import HomeNavbar from '../Common/Nav/HomeNavbar';
import Footer from '../Common/Foot/Footer';
class EnhancedTable extends Component {
  render() {
    return (
      <div>
        
          <br/><br/><br/><br/><br/><br/>  
        <div className="container" align="center" style={{position:"relative"}}>
          <h1>Edit User Profile</h1>
          <div className="form-group row">
            <label className="col-form-label">User Id</label>
            </div>
            <div className=" row intro_row">
            <div className="col-md-11">
              <input  class="form-control mr-sm-2" type="text" placeholder="Search" />
              </div>
              <div className="col-md-1" >
              <button class="btn btn-outline-info" onClick={this.handleSearch}>Search</button>
              
             </div>
          
            </div>
                          
            <div className="form-group row">
                    <label className="col-form-label">Job Title</label>    
                        <input type="text"  name="jobTitle" className="form-control"></input>                          
            </div> 
            <div className="form-group row">
                    <label className="col-form-label">User Level</label>    
                        <select  name="userLevel" className="form-control">
                            <option>Select User Level</option>
                            <option value="DEO">DEO</option>
                            <option value="ES">ES</option>
                            <option value="EE">EE</option>
                            <option value="CE">CE</option>
                            <option value="DGM">DGM</option>
                            <option value="AGM">AGM</option>
                            <option value="TECH">TECH</option>
                            <option value="HELP DESK">HELP DESK</option>
                            <option value="ADMIN">ADMIN</option>
                            <option value="ACCNT">ACCNT</option>
                        </select>            
            </div> 
            
            <div className="row intro_row">
                <div className="col-sm-6">
                    <button type="button" class="btn btn-primary btn-block" onClick={this.handleSubmit}>Edit</button>{'  '}
                </div>
                <div className="col-sm-6">
                    <button type="button" class="btn btn-primary btn-block" >Cancel</button>
                </div>  
            </div>          
        </div>
       
       
      </div>
    )
  }
}

export default EnhancedTable;
