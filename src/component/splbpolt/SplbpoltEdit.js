import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form,Input, Label } from 'reactstrap';
import Swal from 'sweetalert2';
import '../../css/Path.css';
import { Helmet } from 'react-helmet';
const TITLE = 'Edit Transport Labour Rates';

class SplbpoltEdit extends Component {
    emptySplbpolt={
        id:{
        deptId:sessionStorage.getItem('costCenterNo')
        ,
        matCd:'',
        labourCode:''
        },
        activityCode:'',
        applicationType:'',
        labourHours:'',
        unitPrice:''

    }
  
    constructor(props) {
        super(props);
       
        this.state = {
          
            splbpolt: this.emptySplbpolt,
          
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async componentDidMount() {

      console.log("kk"+this.props)
    
        const abc = await(await fetch(`/splbpolt/findByIdDeptIdAndIdMatCdAndIdLabourCode?deptId=${this.props.match.params.deptId}&matCd=${this.props.match.params.matCd}&labourCode=${this.props.match.params.labourCode}`)).json();
        this.setState({splbpolt: abc});
        console.log("gfgffg"+this.props)
    };
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let splbpolt = {...this.state.splbpolt};
        splbpolt[name] = value;
        splbpolt.id[name]=value;
        this.setState({splbpolt});

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
        if(message.value){
        const {splbpolt} = this.state;
        // spdppolm.updUser=localStorage.getItem('userName')

        await fetch('/splbpolt/upd', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        //   body: JSON.stringify(spdppolmuser),
          body: JSON.stringify(splbpolt ),
          
        });
        Swal.fire(
          'Saved!',
          'Contractor has been saved.',
          'success'
        )
     
        this.props.history.push('/splbpolt');
        console.log(splbpolt.id);
      }
    }

      render() {
        const {splbpolt} = this.state;
        return <div>
               <Helmet>
          <title>{ TITLE }</title>
        </Helmet>  

        <div className="padding">
        <a className="path" href="/home">  Home  </a> |
        <a className="path" href="/home">  Master  </a> |
        <a className="path" href="/splbpolt">   Labour </a> |
        <a className="path" href="/splbpolt">   Transport Labour Rates </a> |
        <a className="path2" href="/splbpoltedit">   Edit New Transport Labour Rate</a> 
        </div>
        <br/>

<div className="container" align="center">    
      
       <h2>Edit  Transport Labour Rate</h2>
     
       <Form onSubmit={this.handleSubmit}>
       <div class="form-group row">
       <div class="col-sm-1"></div>

         <div class="col-sm-2">
           <Label for="name">DeptId</Label>
           </div>
           <div class="col-sm-3">
           <Input type="text"  name="deptId" id="deptId" 
                  onChange={this.handleChange} autoComplete="deptId" value={splbpolt.id.deptId || ''} readOnly  />
                  </div>
                  <div class="col-sm-2">                                  
           <Label for="name">MatCd</Label>
           </div>
           <div class="col-sm-3">
           <Input type="text"  name="matCd" id="matCd" 
                  onChange={this.handleChange} autoComplete="matCd" value={splbpolt.id.matCd || ''} readOnly  />
                  </div>
                  <div class="col-sm-1"></div>

         </div>
         <div class="form-group row">
       <div class="col-sm-1"></div>

         <div class="col-sm-2">
           <Label for="name">Labour Code</Label>
           </div>
           <div class="col-sm-3">
           <Input type="text"  name="labourCode" id="labourCode" 
                  onChange={this.handleChange} autoComplete="labourCode" value={splbpolt.id.labourCode || ''} readOnly  />
                  </div>
                  </div>
                  <div class="form-group row">
       <div class="col-sm-1"></div>

         <div class="col-sm-2">
           <Label for="name">Labour Hours</Label>
           </div>
           <div class="col-sm-3">
           <Input type="text"  name="labourHours" id="labourHours" 
                  onChange={this.handleChange} autoComplete="labourHours" value={splbpolt.labourHours || ''} readOnly  />
                  </div>
                  <div class="col-sm-2">                                  
           <Label for="name">Unit Price</Label>
           </div>
           <div class="col-sm-3">
           <Input type="text"  name="unitPrice" id="unitPrice" 
                  onChange={this.handleChange} autoComplete="unitPrice" value={splbpolt.unitPrice|| ''} readOnly  />
                  </div>
                  <div class="col-sm-1"></div>

         </div>
         <div class="form-group row" >
         <div className="col-sm-1"></div>

       <div class="col-sm-2">
           <Label for="name">Activity Code</Label>
           </div>
           <div class="col-sm-3">
           {/* <Input type="text" name="personalCorporate" id="personalCorporate" 
                  onChange={this.handleChange} autoComplete="personalCorporate"/> */}
                   <Input type="select" value={splbpolt.labourCode} name="activityCode" id="activityCode"  onChange={this.handleChange}>
                   {/* <option value="AC1">AC!</option> */}
                          <option  value="AC1">AC1</option>
                          <option value="AC2">AC2</option>
                          <option value="AC3">AC3</option>
                          <option value="AC4">AC4</option>
                          <option value="AC5">AC5</option>
                          <option value="AC6">AC6</option>
                          <option value="AC7">AC7</option>

                        </Input>
                  </div>
                  <div class="col-sm-2">
           <Label for="name">Application Type</Label>
           </div>
           <div class="col-sm-3">
          
                   <Input type="select" value={splbpolt.applicationType} name="applicationType" id="applicationType" onChange={this.handleChange}>
                          <option  value="TC">TC</option>
                          <option value="NC">NC</option>
                          <option value="CR">CR</option>

                        </Input>
                  </div>
                  <div className="col-sm-1"></div>
                  
         </div>
         <br></br>
         <div class="form-group row">
         <div class="col-sm-4"></div>
         <div class="col-sm-2">
           <Button color="primary" type="submit">Save</Button>{' '}
           </div>
           <div class="col-sm-2">
           <Button color="secondary" tag={Link} to="/splbpolt">Cancel</Button>
           </div>
           </div>


       </Form>
       
       </div>
       
        </div>
      }
}
export default SplbpoltEdit;