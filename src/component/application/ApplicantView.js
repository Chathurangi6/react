import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import '../../css/Path.css';
import { Helmet } from 'react-helmet'
const TITLE = 'View Applicant'

class ApplicantView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      applicant: {}
    };
    this.handleChange = this.handleChange.bind(this);
    
  }

  async componentDidMount() {
    
      const person = await (await fetch(`/applicant/findByIdNo?idNo=${this.props.match.params.idNo}`)).json();
      this.setState({applicant: person});
    
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let applicant = {...this.state.applicant};
    applicant[name] = value;
    this.setState({applicant});
    
  }

  render() {
    const {applicant} =this.state;
return <div>
        <div className="padding">
        <a className="path" href="/home">  Home  </a> |
        <a className="path" href="/applicant/search"> search Applicant </a>|
        <a className="path2" href="/applicant/view">  Applicant Details </a>
        </div>
      <Container>
      <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
        <div class="float-right">
          <Button color="primary" tag={Link} to={"/applicant/edit/" + this.state.applicant.idNo} style={{marginRight:'20px'}}>Edit Applicant</Button>
          <Button color="success" tag={Link} to={"/application/add/" + this.state.applicant.idNo}>Add Application</Button>
        </div>
        <h2>Applicant Detail</h2>
        
        <br></br>
        <Form >
        
        <div className="form-group row">
          <label for="deptId" className="col-sm-2 col-form-label">Cost Center No</label>
          <div className="col-sm-4">
            <Input type="text" name="deptId" id="deptId" value={applicant.deptId}
                   onChange={this.handleChange} autoComplete="deptId" readOnly/>
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
            <Input type="text" name="idNo" id="idNo" value={applicant.idNo} 
                   onChange={this.handleChange} autoComplete="idNo" readOnly required/>
          </div>
        </div>
        <div className="form-group row">
          <label for="fullName" className="col-sm-2 col-form-label">Full Name</label>
          <div className="col-sm-4">
            <Input type="text" name="fullName" id="fullName" value={applicant.fullName}
                   onChange={this.handleChange} autoComplete="fullName" readOnly/>
          </div>
        </div>
        <div className="form-group row">
          <label for="firstName" className="col-sm-2 col-form-label">First Name</label>
          <div className="col-sm-4">
            <Input type="text" name="firstName" id="firstName" value={applicant.firstName}
                   onChange={this.handleChange} autoComplete="firstName" readOnly/>
          </div>
          <label for="lastName" className="col-sm-2 col-form-label">Last Name</label>
          <div className="col-sm-4">
            <Input type="text" name="lastName" id="lastName" value={applicant.lastName}
                     onChange={this.handleChange} autoComplete="lastName" readOnly/>
          </div>
        </div>
        <div className="form-group row">
          <label for="streetAddress" className="col-sm-2 col-form-label">Street Address</label>
          <div className="col-sm-4">
            <Input type="text" name="streetAddress" id="streetAddress" value={applicant.streetAddress}
                   onChange={this.handleChange} autoComplete="streetAddress" readOnly/>
          </div>
          <label for="suburb" className="col-sm-2 col-form-label">Suburb</label>
          <div className="col-sm-4">
            <Input type="text" name="suburb" id="suburb" value={applicant.suburb}
                     onChange={this.handleChange} autoComplete="suburb" readOnly/>
          </div>
        </div>
        <div className="form-group row">
          <label for="city" className="col-sm-2 col-form-label">City</label>
          <div className="col-sm-4">
          <Input type="text" name="city" id="city" value={applicant.city}
                 onChange={this.handleChange} autoComplete="city" readOnly/>
          </div>
        </div>
        <div className="form-group row">
          <label for="postalCode" className="col-sm-2 col-form-label">Postal Code </label>
          <div className="col-sm-4">
          <Input type="text" pattern="[0-9]{10}" name="postalCode" id="postalCode" value={applicant.postalCode}
                 onChange={this.handleChange} autoComplete="postalCode" readOnly/>
          </div>
        </div>
        <div className="form-group row">
          <label for="telephoneNo" className="col-sm-2 col-form-label">Telephone No</label>
          <div className="col-sm-4">
            <Input type="text" name="telephoneNo" id="telephoneNo" value={applicant.telephoneNo}
                   onChange={this.handleChange} autoComplete="telephoneNo" readOnly/>
          </div>
          <label for="mobileNo" className="col-sm-2 col-form-label">Mobile No </label>
          <div className="col-sm-4">
            <Input type="text" name="mobileNo" id="mobileNo" value={applicant.mobileNo}
                   onChange={this.handleChange} autoComplete="mobileNo" readOnly/>
          </div>
        </div>    
        <div className="form-group row">
          <label for="email" className="col-sm-2 col-form-label">Email</label>
          <div className="col-sm-4">
          <Input type="text" name="email" id="email" value={applicant.email}
                 onChange={this.handleChange} autoComplete="email" readOnly/>
          </div>
          <label for="preferredLanguage" className="col-sm-2 col-form-label">Preferred Language</label>
          <div className="col-sm-4 col-form-label">
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="preferredLanguage" id="Sinhala" value="Sinhala"
                    checked={this.state.applicant.preferredLanguage==="Sinhala"} onChange={this.handleChange} />
              <label className="form-check-label" for="Sinhala">Sinhala</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="preferredLanguage" id="English" value="English"
                    checked={this.state.applicant.preferredLanguage==="English"} onChange={this.handleChange} disabled/>
              <label className="form-check-label" for="English">English</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="preferredLanguage" id="Tamil" value="Tamil"
                    checked={this.state.applicant.preferredLanguage==="Tamil"} onChange={this.handleChange} disabled/>
              <label className="form-check-label" for="Tamil">Tamil</label>
            </div>
          </div>
        </div>
        <div className="form-group row">
          <label for="cebEmployee" className="col-sm-2 col-form-label">CEB Employee</label>
          <div className="col-sm-4 col-form-label">
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="cebEmployee" id="yes" value="Y"
                    checked={this.state.applicant.cebEmployee==="Y"} onChange={this.handleChange} disabled/>
              <label className="form-check-label" for="yes">Yes</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="cebEmployee" id="no" value="N"
                     checked={this.state.applicant.cebEmployee==="N"} onChange={this.handleChange} disabled/>
              <label className="form-check-label" for="no">No</label>
            </div>
          </div>
        </div>
        
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(ApplicantView);