import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import {validateDecimal} from './ContractorValidate';
import Swal from 'sweetalert2';
import '../../css/Path.css';
import { Helmet } from 'react-helmet';
const TITLE = 'Add Contractor';

class ContractorAdd extends Component {

  emptyContractor = {
    id:{
      contractorId:'',
      deptId:sessionStorage.getItem('costCenterNo'),
    },
    bondAmount:'',
    bondNo:'',
    code:'',
    contractorAddress: '',
    contractorName: '',
    endDate:'',
    jobInHand:'',
    nbt:'',
    performanceAmount:'',
    spAddSpan:'',
    startDate:'',
    status:'1',
    tenderAmount:'',
    totalAmount:'',
    tpAddSpan:'',
    vat:''
  };

  constructor(props) {
    super(props);
    this.state = {
      contractor: this.emptyContractor
    };
    this.handleChange = this.handleChange.bind(this);
    //this.handleValidation = this.handleValidation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toInputUppercase = this.toInputUppercase.bind(this);
    //this.getCurrentDate=this.getCurrentDate.bind(this);
    //this.validateNumber=this.validateNumber.bind(this);
    //this.validateId=this.validateId.bind(this);
    
  }

  

  toInputUppercase(e) {
    e.target.value = ("" + e.target.value).toUpperCase();
  };

 

  
  handleChange(event){

    const id = event.target.id;
    //console.log(id);
    let e;
    switch(id){
      case 'bondAmount':
      case 'performanceAmount':
      case 'spAddSpan':
      case 'tenderAmount':
      case 'tpAddSpan':
      case 'nbt':
      case 'vat':
        e=validateDecimal(event);
        break;
      
      default:
        e=event;
        break;
    }

    if(e!=null){
      this.setState({value: e.target.value})
      const target = e.target;
      const value = target.value;
      const name = target.name;
      let contractor = {...this.state.contractor};
      contractor[name] = value;
      contractor.id[name]=value;
      this.setState({contractor});
     
    }
  }

  // handleChange(event) {
  //   const target = event.target;
  //   const value = target.value;
  //   const name = target.name;
  //   let contractor = {...this.state.contractor};
  //   contractor[name] = value;
  //   contractor.id[name]=value;
  //   this.setState({contractor});
    
  // }

  

  async handleSubmit(event) {
   
    event.preventDefault();
    //this.getCurrentTime();
    //this.getCurrentDate();
    const message= await Swal.fire({
      title: 'Are you sure?',
      // text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, save it!'
    })
    if(message.value){
      const {contractor} = this.state;

      await fetch('/contractor/add', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
           'Content-Type': 'application/json'
        },
        body: JSON.stringify(contractor),
      });

      Swal.fire(
        'Saved!',
        'Contractor has been saved.',
        'success'
      )
      this.props.history.push({pathname:'/contractor/findByDeptId',state:{currentPage:this.props.location.state.page}});
    }
  }

 render() {
    return <div>
<Helmet>
          <title>{ TITLE }</title>
        </Helmet>
        <div className="padding">
        <a className="path" href="/home">  Home  </a> |
        <a className="path" href="/home">  Master  </a> |
        <a className="path" href="/contractor/findByDeptId">   Contractor</a> |
        <a className="path2" href="/contractor/add">   Add Contractor</a> 
        </div>
      <Container>
        <h2>Add Contractor</h2>
        
        <br></br>
        <Form onSubmit={this.handleSubmit}>
    
        <div className="form-group row">
          <label for="contractorName" className="col-sm-2 col-form-label">Contractor Name</label>
          <div className="col-sm-4">
            <Input type="text" name="contractorName" id="contractorName" onInput={this.toInputUppercase}
                   onChange={this.handleChange} autoComplete="contractorName" required/>
          </div>
          <label for="code" className="col-sm-2 col-form-label">Code</label>
          <div className="col-sm-4">
            <Input type="text" name="code" id="code" onInput={this.toInputUppercase}
                   onChange={this.handleChange} autoComplete="code" required/>
          </div>
        </div>

        <div className="form-group row">
          <label for="contractorAddress" className="col-sm-2 col-form-label">Address</label>
          <div className="col-sm-10">
            <Input type="text" name="contractorAddress" id="contractorAddress" onInput={this.toInputUppercase}
                   onChange={this.handleChange} autoComplete="contractorAddress" required/>
          </div>
        </div>
        <div className="form-group row">
          <label for="deptId" className="col-sm-2 col-form-label">Department ID</label>
          <div className="col-sm-4">
            <Input type="text" name="deptId" id="deptId" value={this.state.contractor.id.deptId}
                   onChange={this.handleChange} autoComplete="deptId" disabled/>
          </div>
        </div>
       
        <div className="form-group row">
          <label for="bondNo" className="col-sm-2 col-form-label">Bond Number</label>
          <div className="col-sm-4">
            <Input type="text" name="bondNo" id="bondNo" onInput={this.toInputUppercase}
                   onChange={this.handleChange} autoComplete="bondNo" required/>
          </div>
          <label for="bondAmount" className="col-sm-2 col-form-label">Bond Amount</label>
          <div className="col-sm-4">
            <Input type="text" name="bondAmount" id="bondAmount" value={this.state.contractor.bondAmount}
                   onChange={this.handleChange} autoComplete="bondAmount" required/>
          </div>
        </div>
       
        <div className="form-group row">
          <label for="tenderAmount" className="col-sm-2 col-form-label">Tender Amount</label>
          <div className="col-sm-4">
            <Input type="text" name="tenderAmount" id="tenderAmount" value={this.state.contractor.tenderAmount}
                   onChange={this.handleChange} autoComplete="tenderAmount" required/>
          </div>
        
        </div>
        <div className="form-group row">
          <label for="startDate" className="col-sm-2 col-form-label">Start Date</label>
          <div className="col-sm-4">
            <Input type="date" name="startDate" id="startDate" 
                   onChange={this.handleChange} autoComplete="startDate" required/>
          </div>
          <label for="endDate" className="col-sm-2 col-form-label">End Date</label>
          <div className="col-sm-4">
            <Input type="date" name="endDate" id="endDate" 
                   onChange={this.handleChange} autoComplete="endDate" required/>
          </div>
        </div>
        <div className="form-group row">
          <label for="performanceAmount" className="col-sm-2 col-form-label">Performance Amount</label>
          <div className="col-sm-4">
            <Input type="text" name="performanceAmount" id="performanceAmount" value={this.state.contractor.performanceAmount}
                   onChange={this.handleChange} autoComplete="performanceAmount" required/>
          </div>
        </div>
        <div className="form-group row">
          <label for="spAddSpan" className="col-sm-3 col-form-label">Single Phase Additional Span</label>
          <div className="col-sm-3">
            <Input type="text" name="spAddSpan" id="spAddSpan" value={this.state.contractor.spAddSpan}
                   onChange={this.handleChange} autoComplete="spAddSpan" required/>
          </div>
          <label for="tpAddSpan" className="col-sm-3 col-form-label">Three Phase Additional Span</label>
          <div className="col-sm-3">
            <Input type="text" name="tpAddSpan" id="tpAddSpan" value={this.state.contractor.tpAddSpan}
                   onChange={this.handleChange} autoComplete="tpAddSpan" required/>
          </div>
        </div>
        
        <div className="form-group row">
          <label for="vat" className="col-sm-2 col-form-label">VAT(%)</label>
          <div className="col-sm-4">
            <Input type="text" name="vat" id="vat" value={this.state.contractor.vat}
                   onChange={this.handleChange} autoComplete="vat" required/>
          </div>
          <label for="nbt" className="col-sm-2 col-form-label">NBT(%)</label>
          <div className="col-sm-4">
            <Input type="text" name="nbt" id="nbt" value={this.state.contractor.nbt}
                   onChange={this.handleChange} autoComplete="nbt" required/>
          </div>
        </div>
        
           
        <FormGroup>
          <Button color="primary" type="submit">Save</Button>{' '}
          <Button color="secondary" tag={Link} to="/contractor/findByDeptId">Cancel</Button>
        </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(ContractorAdd);