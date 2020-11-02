import React, { Component } from 'react'


import Swal from 'sweetalert2'
class UserProfileEdit extends Component {
  // emptyList={
  //       userId:"",
  //       userLevel:"",
  //       jobTitle:""
  // }
    constructor(){
        super();
        this.state={userId:"",
        userLevel:"",
        jobTitle:""};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleUpperCase=this.handleUpperCase.bind(this);
        this.handleSearch=this.handleSearch.bind(this);
    }
    
    handleChange(e){
      this.setState({[e.target.name]:e.target.value})
    }
    async handleSubmit(event) {
        event.preventDefault();
        const item ={
          userId:this.state.userId,
          jobTitle:this.state.jobTitle,
          userLevel:this.state.userLevel
        }
      await fetch(`/sauserm/upd/${this.state.userId}`, {
        method:'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      }).then(response=>{
        if(response.status === 200) {
        Swal.fire({    
            type: 'success',
            title: 'Sucessfully updated',
            showConfirmButton: false,
            timer: 1500
          })
          
        }},error=>{
            if(error.response.status===500)
            alert("Try Again!")
        }
    )  
      
    }
    handleUpperCase(event) {
      event.target.value = event.target.value.toUpperCase();
    }
    async handleSearch(event){
      event.preventDefault();
      console.log(this.state.userId)
      await fetch(`/sauserm/getJobTitle?userId=${this.state.userId}`)
       .then(response =>  response.text())
        .then(data => this.setState({jobTitle: data},()=>console.log(this.state.jobTitle)))
      if(!this.state.jobTitle){
        Swal.fire({
      title: 'Warning',
      text: "Job Title doesn't exist",
      type: 'warning',
      confirmButtonColor: '#5CB85C',
      cancelButtonColor: '#3085D6',
      confirmButtonText: 'OK',
      reverseButtons: true
    })
      }
      
    }
  render() {
    return (
      <div>
      
          <br/><br/><br/><br/><br/><br/>
          
        <div className="container" align="center" style={{position:"relative"}}>
          <h1>Edit User Profile</h1>
          <form onSubmit={this.handleSubmit}>
          <div className="form-group row">
            <label className="col-form-label">User Id</label>
            </div>
            <div className=" row intro_row">
            <div className="col-md-11">
              <input name="userId" onInput={this.handleUpperCase} value={this.state.userId} onChange={this.handleChange} class="form-control mr-sm-2" type="text"/>
              </div>
              <div className="col-md-1" >
              <button class="btn btn-outline-info" onClick={this.handleSearch}>Search</button>
              
             </div>
          
            </div>
                          
            <div className="form-group row">
                    <label className="col-form-label">Job Title</label>    
                        <input type="text" value={this.state.jobTitle} name="jobTitle" className="form-control" onChange={this.handleChange} required></input>                          
            </div> 
            <div className="form-group row">
                    <label className="col-form-label">User Level</label>    
                        <select value={this.state.userLevel} name="userLevel" className="form-control" onChange={this.handleChange} required>
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
                    <button type="button" class="btn btn-primary btn-block" type="submit">Edit</button>{'  '}
                </div>
                <div className="col-sm-6">
                    <button type="button" class="btn btn-primary btn-block" >Cancel</button>
                </div>  
            </div> 
            </form>          
        </div>
  
      </div>
    )
  }
}
export default UserProfileEdit;
