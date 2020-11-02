import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import {validateNumber} from './ApplicantValidate';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet'
import '../../css/Path.css';
const TITLE = 'Edit Applicant'
class ApplicantEdit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      applicant: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toInputUppercase = this.toInputUppercase.bind(this);
    //this.validateNumber=this.validateNumber.bind(this);
    //this.handleValidation = this.handleValidation.bind(this);
  }

  async componentDidMount() {
    
      const person = await (await fetch(`/applicant/findByIdNo?idNo=${this.props.match.params.idNo}`)).json();
      this.setState({applicant: person});
    
  }

  // handleChange(event) {
  //   const target = event.target;
  //   const value = target.value;
  //   const name = target.name;
  //   let applicant = {...this.state.applicant};
  //   applicant[name] = value;
  //   this.setState({applicant});
    
  // }

  toInputUppercase(e) {
    e.target.value = ("" + e.target.value).toUpperCase();
  };

  handleChange(event){

    const id = event.target.id;
    //console.log(id);
    let e;
    switch(id){
      case 'postalCode':
        e=validateNumber(event);
        break;
      case 'telephoneNo':
      case 'mobileNo':{
        e=validateNumber(event);
        if(e.target.value.substring(0,1)!=0){
          e.target.value=0+e.target.value;
        }
      }
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
      let applicant = {...this.state.applicant};
      applicant[name] = value;
      this.setState({applicant});
     // return true;
     }//else{
    //   return false;
    // }
  }

  // validateNumber(e){
  //   const re = /^[0-9\b]+$/;
  //   if (e.target.value === '' || re.test(e.target.value) ) {
  //      this.setState({value: e.target.value})
  //      const target = e.target;
  //    const value = target.value;
  //    const name = target.name;
  //    let applicant = {...this.state.applicant};
  //    applicant[name] = value;
  //    this.setState({applicant});
  //   }
  //  }

  async handleSubmit(event) {
    event.preventDefault();

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

    const {applicant} = this.state;

    await fetch('/applicant/upd', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(applicant),
    });
    Swal.fire(
      'Saved!',
      'Applicant has been saved.',
      'success'
    )
  
    this.props.history.push("/applicant/view/" + this.state.applicant.idNo);
    }
  }

  render() {
    const {applicant} =this.state;
 return <div>
<div className="padding">
        <a className="path" href="/home">  Home  </a> |
        <a className="path" href="/applicant/search"> Search Applicant  </a> |
        <a className="path2" href="/"> Edit Applicant</a>
        </div>
      <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
      <Container>
        <h2>Edit Applicant</h2>
        
        <br></br>
        <Form onSubmit={this.handleSubmit}>
        
        <div className="form-group row">
          <label for="deptId" className="col-sm-2 col-form-label">Cost Center No</label>
          <div className="col-sm-4">
            <Input type="text" name="deptId" id="deptId" value={applicant.deptId}
                   onChange={this.handleChange} autoComplete="deptId" disabled/>
          </div>
          <label for="personalCorporate" className="col-sm-2 col-form-label">Personal/Corporate</label>
          <div className="col-sm-4">
            <select className="form-control" name="personalCorporate" id="personalCorporate" value={applicant.personalCorporate}
                     onChange={this.handleChange} >
              <option value="Personal">Personal</option>
              <option value="Corperate">Corperate</option>
            </select>
          </div>
        </div>
        {console.log(this.state.applicant.personalCorporate)}
        <div className="form-group row">
          <label for="idType" className="col-sm-2 col-form-label" >ID Type</label>
          <div className="col-sm-4 col-form-label">
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="idType" id="nic" value="NIC"
                    checked={this.state.applicant.idType==="NIC"} onChange={this.handleChange} disabled/>
              <label className="form-check-label" for="nic">NIC</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="idType" id="passport" value="PASSPORT"
                    checked={this.state.applicant.idType==="PASSPORT"} onChange={this.handleChange} disabled/>
              <label className="form-check-label" for="passport">PASSPORT</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="idType" id="busRegNo" value="BUS REG NO" 
                    checked={this.state.applicant.idType==="BUS REG NO"} onChange={this.handleChange} disabled/>
              <label className="form-check-label" for="busRegNo">BUS REG NO</label>
            </div>
          </div>
          <label for="idNo" className="col-sm-2 col-form-label">ID No</label>
          <div className="col-sm-4">
            <Input type="text" readOnly name="idNo" id="idNo" value={applicant.idNo} 
                   onChange={this.handleChange} autoComplete="idNo" required/>
          </div>
        </div>
        <div className="form-group row">
          <label for="fullName" className="col-sm-2 col-form-label">Full Name</label>
          <div className="col-sm-4">
            <Input type="text" name="fullName" id="fullName" value={applicant.fullName} onInput={this.toInputUppercase}
                   onChange={this.handleChange} autoComplete="fullName"/>
          </div>
        </div>
        <div className="form-group row">
          <label for="firstName" className="col-sm-2 col-form-label">First Name</label>
          <div className="col-sm-4">
            <Input type="text" name="firstName" id="firstName" value={applicant.firstName}  onInput={this.toInputUppercase} 
                   maxLength="15" onChange={this.handleChange} autoComplete="firstName" required/>
          </div>
          <label for="lastName" className="col-sm-2 col-form-label">Last Name</label>
          <div className="col-sm-4">
            <Input type="text" name="lastName" id="lastName" value={applicant.lastName} onInput={this.toInputUppercase}
                   maxLength="16" onChange={this.handleChange} autoComplete="lastName" required/>
          </div>
        </div>
        <div className="form-group row">
          <label for="streetAddress" className="col-sm-2 col-form-label">Street Address</label>
          <div className="col-sm-4">
            <Input type="text" name="streetAddress" id="streetAddress" value={applicant.streetAddress} onInput={this.toInputUppercase}
                  maxLength="30" onChange={this.handleChange} autoComplete="streetAddress" required/>
          </div>
          <label for="suburb" className="col-sm-2 col-form-label">Suburb</label>
          <div className="col-sm-4">
            <Input type="text" name="suburb" id="suburb" value={applicant.suburb} onInput={this.toInputUppercase}
                    maxLength="25" onChange={this.handleChange} autoComplete="suburb" required/>
          </div>
        </div>
        <div className="form-group row">
          <label for="city" className="col-sm-2 col-form-label">City</label>
          <div className="col-sm-4">
          <Input type="text" name="city" id="city" value={applicant.city} onInput={this.toInputUppercase}
                 maxLength="20" onChange={this.handleChange} autoComplete="city" required/>
          </div>
        </div>
        <div className="form-group row">
          <label for="postalCode" className="col-sm-2 col-form-label">Postal Code </label>
          <div className="col-sm-4">
          <Input type="text" name="postalCode" id="postalCode" value={applicant.postalCode} minLength="5" maxLength="5"
                  onChange={this.handleChange} autoComplete="postalCode"/>
          </div>
        </div>
        <div className="form-group row">
          <label for="telephoneNo" className="col-sm-2 col-form-label">Telephone No</label>
          <div className="col-sm-4">
            <Input type="text" name="telephoneNo" id="telephoneNo" placeholder="0#########" value={applicant.telephoneNo} minLength="10" maxLength="10"
                   onChange={this.handleChange} autoComplete="telephoneNo"/>
          </div>
          <label for="mobileNo" className="col-sm-2 col-form-label">Mobile No </label>
          <div className="col-sm-4">
            <Input type="text" name="mobileNo" id="mobileNo" placeholder="0#########" value={applicant.mobileNo} minLength="10" maxLength="10"
                   onChange={this.handleChange} autoComplete="mobileNo" required/>
          </div>
        </div>    
        <div className="form-group row">
          <label for="email" className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-4">
          <Input type="email" name="email" id="email" value={applicant.email}
                 onChange={this.handleChange} autoComplete="email" />
          </div>
          <label for="preferredLanguage" className="col-sm-2 col-form-label">Preferred Language</label>
          <div className="col-sm-4 col-form-label">
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="preferredLanguage" id="Sinhala" value="Sinhala"
                    checked={this.state.applicant.preferredLanguage==="Sinhala"} onChange={this.handleChange} required />
              <label className="form-check-label" for="Sinhala">Sinhala</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="preferredLanguage" id="English" value="English"
                    checked={this.state.applicant.preferredLanguage==="English"} onChange={this.handleChange} />
              <label className="form-check-label" for="English">English</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="preferredLanguage" id="Tamil" value="Tamil"
                    checked={this.state.applicant.preferredLanguage==="Tamil"} onChange={this.handleChange} />
              <label className="form-check-label" for="Tamil">Tamil</label>
            </div>
          </div>
        </div>
        <div className="form-group row">
          <label for="cebEmployee" className="col-sm-2 col-form-label">CEB Employee</label>
          <div className="col-sm-4 col-form-label">
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="cebEmployee" id="yes" value="Y"
                    checked={this.state.applicant.cebEmployee==="Y"} onChange={this.handleChange} required/>
              <label className="form-check-label" for="yes">Yes</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="cebEmployee" id="no" value="N"
                     checked={this.state.applicant.cebEmployee==="N"} onChange={this.handleChange} />
              <label className="form-check-label" for="no">No</label>
            </div>
          </div>
        </div>
        <FormGroup>
          <Button color="primary" type="submit">Save</Button>{' '}
          <Button color="secondary" tag={Link} to={"/applicant/view/" + this.state.applicant.idNo}>Cancel</Button>
        </FormGroup>
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(ApplicantEdit);