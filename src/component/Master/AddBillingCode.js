import React, { Component } from 'react'
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet'
const TITLE = 'Add Billing Code'
class AddBillingCode extends Component {
    constructor(){
        super();
        this.state={
            deptId:"",
            deptCode:"",
            item:[],isLoading:true
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleSearch=this.handleSearch.bind(this);
    }
    async handleSearch(event){
      event.preventDefault();
      await fetch(`/gldeptin/findData/${this.state.deptId}`)
      .then(response => {
        if(response.status===404){
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'Data is not found!'
          })
        }
        if(response.status===200){
         return response.json().then(data=>this.setState({item: data,isLoading:false}))
         
        }
      })

    }


    handleChange(e){
      this.setState({[e.target.name]:e.target.value})
    }
    async handleSubmit(event) {
      event.preventDefault();
    await fetch(`/gldeptin/setDeptCode?deptCode=${this.state.deptCode}&deptId=${this.state.deptId}`, {
      method:'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response=>{
      if(response.status === 200) {
      Swal.fire({    
          type: 'success',
          title: 'Sucessfully updated',
          showConfirmButton: false,
          timer: 1500
        })
        this.setState({item:"",deptId:"",deptCode:""})
        
      }},error=>{
          if(error.response.status===500)
          alert("Try Again!")
      }
  )  
 
  }
  render() {
    const {item,isLoading}=this.state;
    return (
      <div>
  <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
      <div className="padding">
        <a className="path" href="/home">  Home  </a> |
        <a className="path" href="/home">  Admin  </a> |
        <a className="path2" href="/cscBank"> Add Billing Code </a> 
<br/><br/>
        </div>
 
       
        <div className="container" align="center" style={{position:"relative"}}>
          <h3>Add Billing Code</h3>
          <br/>
          <div className="card">
            <div className="card-body">
            <div className="form-group row">
            <label className="col-form-label">Department Id</label>
            </div>
            <div className=" row intro_row">
            <div className="col-md-11">
              <input name="deptId" value={this.state.deptId} onChange={this.handleChange} class="form-control mr-sm-2" type="text"/>
              </div>
              <div className="col-md-1" >
              <button class="btn btn-outline-info" onClick={this.handleSearch}>Search</button>  
             </div>
            </div>
            </div>
          </div>
          <div className="row">
          <div className="col-sm-5">
          <div className="form-group row">
                    <label className="col-form-label">Department Name</label>    
                        <input type="text" value={item.deptFullName||""} name="deptFullName" className="form-control" onChange={this.handleChange} disabled></input>                        
            </div> 
            <div className="form-group row">
                    <label className="col-form-label">Department Province</label>    
                        <input type="text" value={item.deptProvince||""} name="deptProvince" className="form-control" onChange={this.handleChange} disabled></input>   {' '}                       
            </div> 
            </div>   
            <div className="col-sm-2">
              </div>        
            <div className="col-sm-5">
            <div className="form-group row">
                    <label className="col-form-label">Department Region</label>    
                        <input type="text" value={item.deptRegion||""} name="deptRegion" className="form-control" onChange={this.handleChange} disabled></input>                          
            </div> 
            <div className="form-group row">
                    <label className="col-form-label">Department Area</label>    
                        <input type="text" value={item.deptArea||""} name="deptArea" className="form-control" onChange={this.handleChange} disabled></input>                          
            </div>
            </div>
            </div>
            <div className="form-group row">
                    <label className="col-form-label">Department Code</label>    
                        <input type="text" value={this.state.deptCode} name="deptCode" className="form-control" onChange={this.handleChange}></input>                          
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
        <br/><br/><br/>
        
       
      </div>
      
    )}
  }

export default AddBillingCode;