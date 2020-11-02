import React, { Component } from 'react'
import Swal from 'sweetalert2'
import '../../css/Path.css';
import { Helmet } from 'react-helmet'
const TITLE = ' Add App Types'

class AddAuthorizedAppType extends Component {
    constructor(props){
        super(props);
        this.state={
            applicationType:"" 
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.cancel=this.cancel.bind(this);
    }

    handleChange(e){
        this.setState({[e.target.name]:e.target.value})
    }

    async handleSubmit(e){
        e.preventDefault();
        const {deptId}=this.props.match.params
        const item={
            id:{
                deptId:deptId,
                applicationType:this.state.applicationType
            }
        }
        const isPresent=await (await fetch(`/authorizedType/existsById?deptId=${this.props.match.params.deptId}&applicationType=${item.id.applicationType}`)).json();
        
        if(isPresent){
            Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Data exist!',
              })
        }
        else{
            await fetch('/authorizedType/add', {
                method:'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(item)
            }).then(response=>{
                if(response.status === 200) {
                Swal.fire({    
                    type: 'success',
                    title: 'Sucessfully saved',
                    showConfirmButton: false,
                    timer: 1500
                  })
                }},error=>{
                    if(error.response.status===500)
                    alert("Try Again!")
                }
            )  
        }    
    }
    cancel(){
        this.setState({
            applicationType:"" 
        })
    }
  render() {
    const {applicationType} = this.state;
    const {deptId}=this.props.match.params
    return (
        <div>
          <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
      <div className="padding">
        <a className="path" href="/home">  Home  </a> |
        <a className="path" href="/home">  Admin  </a> |
        <a className="path" href="/authorizedAppType"> Authorized App Type Details </a> |
        <a className="path2" href="/authorizedAppType/add"> Add Authorized App Type </a> 
        <h1 align="center">Add Authorized App Type</h1>
        </div>
        <div className="container" align="center" style={{position:"relative"}}>
          
          <div className="form-group row">
                <label className="col-form-label">Department:</label>                                              
                    <input type="text"  name="deptId" className="form-control" value={deptId} onChange={this.handleChange} disabled/>                                            
            </div>
            
            <div className="form-group row">
                    <label className="col-form-label">Application Type:</label>
                        
                        <select value={applicationType} name="applicationType" className="form-control" onChange={this.handleChange} required>
                            <option>Select Job Type</option>
                            <option value="NC">New Connection</option>
                            <option value="TC">Temporary Connection</option>
                            <option value="CR">Cost Recovery</option>
                            <option value="MT">Maintenance</option>
                            <option value="BD">Breakdown</option>
                            <option value="SA">Sys. Augmentation</option>
                            <option value="AM">AMU Jobs</option>
                            <option value="RE">RE Jobs</option>
                            <option value="ABC">ABC Jobs</option>
                            <option value="EM">EMU Jobs</option>
                        </select>
                        
            </div> 
            <div className="row intro_row">
                <div className="col-sm-6">
                    <button type="button" class="btn btn-primary btn-block" onClick={this.handleSubmit}>Add</button>{'  '}
                </div>
                <div className="col-sm-6">
                    <button type="button" class="btn btn-primary btn-block" onClick={this.cancel}>Cancel</button>
                </div>  
            </div>
                  
        </div>
        </div>
    )
  }
}
export default AddAuthorizedAppType;