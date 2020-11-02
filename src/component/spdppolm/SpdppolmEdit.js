import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form,Input, Label } from 'reactstrap';
import Swal from 'sweetalert2';
import '../../css/Path.css';
import { Helmet } from 'react-helmet';
const TITLE = 'Edit Pole';

class SpdppolmAdd extends Component {
    emptySpdppolm={
        id:{
        deptId:'',
        matCd:''
        },
        
        isActive:'',
        updUser:''
    }
  
    constructor(props) {
        super(props);
       
        this.state = {
          
          spdppolm: this.emptySpdppolm,
          
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async componentDidMount() {

      console.log("kk"+this.props)
    
        const abc = await(await fetch(`/spdppolm/findByIdDeptIdAndIdMatCd?deptId=${this.props.match.params.deptId}&matCd=${this.props.match.params.matCd}`)).json();
        this.setState({spdppolm: abc});
        console.log("gfgffg"+this.props)
    };
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let spdppolm = {...this.state.spdppolm};
        spdppolm[name] = value;
        spdppolm.id[name]=value;
        this.setState({spdppolm});

      }
      async handleSubmit(event) {
        event.preventDefault();
        const message= await Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, save it!'
        })
        if(message){
        const {spdppolm} = this.state;
        spdppolm.updUser=localStorage.getItem('userName')

        await fetch('/spdppolm/upd', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        //   body: JSON.stringify(spdppolmuser),
          body: JSON.stringify(spdppolm ),
          
        });
        Swal.fire(
          'Saved!',
          'Contractor has been saved.',
          'success'
        )
     
        this.props.history.push('/spdppolm');
        console.log(spdppolm.id);
      }
    }

      render() {
        const {spdppolm} = this.state;
        return <div>
            <Helmet>
          <title>{ TITLE }</title>
        </Helmet>                

        <div className="padding">
        <a className="path" href="/home">  Home  </a> |
        <a className="path" href="/home">  Master  </a> |
        <a className="path" href="/home">   Material  </a> |
        <a className="path" href="/Spdppolm">  Pole  </a> |
        <a className="path2" href="/Spdppolm">   Edit Pole  </a> 
        </div>


  
<div className="container" align="center">       
       <h2>Edit Pole</h2>
       <br/>
       <Form onSubmit={this.handleSubmit}>
       <div class="form-group row">
       <div class="col-sm-2"></div>

         <div class="col-sm-2">
           <Label for="name">DeptId</Label>
           </div>
           <div class="col-sm-4">
           <Input type="text"  name="deptId" id="deptId" 
                  onChange={this.handleChange} autoComplete="deptId" value={spdppolm.id.deptId || ''} readOnly  />
                  </div>
         </div>
         <div class="form-group row">
         <div class="col-sm-2"></div>

         <div class="col-sm-2">                                  
           <Label for="name">MatCd</Label>
           </div>
           <div class="col-sm-4">
           <Input type="text"  name="matCd" id="matCd" 
                  onChange={this.handleChange} autoComplete="matCd" value={spdppolm.id.matCd || ''} readOnly  />
                  </div>
         </div>
         
         <div class="form-group row">
         <div class="col-sm-2"></div>

         <div class="col-sm-2">
           <Label for="name">IsActive</Label>
           </div>

           <div class="col-sm-4">
           <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="isActive" id="isActive"  value="YES"
                  onChange={this.handleChange} checked={this.state.spdppolm.isActive==="YES"} required />
                 <label className="form-check-label" for="yes">YES</label>
                  </div>
                  <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="isActive"  checked={this.state.spdppolm.isActive==="NO"} id="isActive" value="NO"
                 onChange={this.handleChange}  />
                 <label className="form-check-label" for="no">NO</label>
                  </div>
                  </div>
         </div>
         <br></br>
         <div class="form-group row">
         <div class="col-sm-4"></div>
         <div class="col-sm-2">
           <Button color="primary" type="submit">Save</Button>{' '}
           </div>
           <div class="col-sm-2">
           <Button color="secondary" tag={Link} to="/spdppolm">Cancel</Button>
           </div>
           </div>


       </Form>
       
       </div>
       
        </div>
      }
}
export default SpdppolmAdd;