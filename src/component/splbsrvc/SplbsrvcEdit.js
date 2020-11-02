import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form,Input, Label } from 'reactstrap';
import Swal from 'sweetalert2';
import '../../css/Path.css';
import { Helmet } from 'react-helmet';
const TITLE = 'Edit Wire Labour Rates';

class SplbsrvcEdit extends Component {
    emptySplbsrvc={
        id:{
        deptId:sessionStorage.getItem('costCenterNo')
        ,
        labourCode:''
        },
        activityCode:'',
        applicationType:'',
        labourHours:'',
        unitPrice:'',
        spanType:'',
        phase:''

      
    }
  
    constructor(props) {
        super(props);
       
        this.state = {
          
            splbsrvc: this.emptySplbsrvc,
          
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async componentDidMount() {

      console.log("kk"+this.props)
    
        const abc = await(await fetch(`/splbsrvc/findByIdDeptIdAndIdLabourCode?deptId=${this.props.match.params.deptId}&labourCode=${this.props.match.params.labourCode}`)).json();
        this.setState({splbsrvc: abc});
        console.log("gfgffg"+this.props)
    };
    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let splbsrvc = {...this.state.splbsrvc};
        splbsrvc[name] = value;
        splbsrvc.id[name]=value;
        this.setState({splbsrvc});

      }
      async handleSubmit(event) {
        event.preventDefault();
        const message= await Swal.fire({
          title: 'Are you sure?',
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, save it!'
        })
        if(message.value){
        const {splbsrvc} = this.state;
        // spdppolm.updUser=localStorage.getItem('userName')

        await fetch('/splbsrvc/upd', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        //   body: JSON.stringify(spdppolmuser),
          body: JSON.stringify(splbsrvc ),
          
        });
        Swal.fire(
          'Saved!',
          'Contractor has been saved.',
          'success'
        )
     
        this.props.history.push('/splbsrvc');
        console.log(splbsrvc.id);
      }
    }

       render() {
        const {splbsrvc} = this.state;
        return <div>
   <Helmet>
          <title>{ TITLE }</title>
        </Helmet>  
        <div className="padding">
        <a className="path" href="/home">  Home  </a> |
        <a className="path" href="/home">  Master  </a> |
        <a className="path" href="/splbsrvc">   Labour </a> |
        <a className="path" href="/splbsrvc">   Wire Labour Rates </a> |
        <a className="path2" href="/splbsrvc">  Update Wire Labour Rates </a> 
        </div>
         
<div className="container" align="center">       

       <h2>Edit Wire Labour Rates</h2>
       <br/>
       <Form onSubmit={this.handleSubmit}>
       <div class="form-group row">
       <div class="col-sm-1"></div>

         <div class="col-sm-2">
           <Label for="name">DeptId</Label>
           </div>
           <div class="col-sm-3">
           <Input type="text"  name="deptId" id="deptId" 
                  onChange={this.handleChange} autoComplete="deptId" value={splbsrvc.id.deptId || ''} readOnly  />
                  </div>
                  <div class="col-sm-2">
           <Label for="name">Labour Code</Label>
           </div>
           <div class="col-sm-3">
           <Input type="text"  name="labourCode" id="labourCode" 
                   autoComplete="labourCode" value={splbsrvc.id.labourCode || ''} readOnly  />
                  </div>
                  <div class="col-sm-1"></div>

         </div>
         
                  <div class="form-group row">
       <div class="col-sm-1"></div>

         <div class="col-sm-2">
           <Label for="name">Labour Hours</Label>
           </div>
           <div class="col-sm-3">
           <Input type="text"  name="labourHours" id="labourHours" 
                  onChange={this.handleChange} autoComplete="labourHours" value={splbsrvc.labourHours || ''} readOnly  />
                  </div>
                  <div class="col-sm-2">                                  
           <Label for="name">Unit Price</Label>
           </div>
           <div class="col-sm-3">
           <Input type="text"  name="unitPrice" id="unitPrice" 
                  onChange={this.handleChange} autoComplete="unitPrice" value={splbsrvc.unitPrice|| ''} readOnly  />
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
                   <Input type="select" value={splbsrvc.labourCode} name="activityCode" id="activityCode"  onChange={this.handleChange}>
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
          
                   <Input type="select" value={splbsrvc.applicationType} name="applicationType" id="applicationType" onChange={this.handleChange}>
                          <option  value="TC">TC</option>
                          <option value="NC">NC</option>
                          <option value="CR">CR</option>

                        </Input>
                  </div>
                  <div className="col-sm-1"></div>
                  
         </div>
         <div class="form-group row">
         <div className="col-sm-1"></div>

         <div class="col-sm-2">
           <Label for="name">Span Type</Label>
           </div>
           <div class="col-sm-3">
           <Input type="select" value={splbsrvc.spanType} name="spanType" id="spanType" onChange={this.handleChange}>
                          <option  value="OTHER">OTHER</option>
                          <option value="LAST">LAST</option>

                        </Input>
                  </div>
                  <div class="col-sm-2">
           <Label for="name">Phase</Label>
           </div>
           <div class="col-sm-3">
           <Input type="text"  name="phase" id="phase" value={splbsrvc.phase}
                  onChange={this.handleChange}    />
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
           <Button color="secondary" tag={Link} to="/splbsrvc">Cancel</Button>
           </div>
           </div>


       </Form>
       
       </div>
       
        </div>
      }
}
export default SplbsrvcEdit;