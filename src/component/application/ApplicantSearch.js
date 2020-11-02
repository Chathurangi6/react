import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import {validateId} from './ApplicantValidate';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet'
import '../../css/Path.css';
const TITLE = 'Search Applicant'

class ApplicantSearch extends Component {

  constructor(props) {
    super(props);
    this.state = {
      idNo: '',
      buttonDisabled:true,
      searched:false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    //this.handleValidation = this.handleValidation.bind(this);
    this.validateIdNo=this.validateIdNo.bind(this);
   
  }
  

  validateIdNo(e){
    if(!validateId(e)){
      e.target.setCustomValidity('Please lengthen the id no to 9 numbers with x/v or to 12 numbers');
     
    }else{
      e.target.setCustomValidity('');
      return e;
    }
  }

  handleChange(event){
    if(this.state.searched){
      this.setState({buttonDisabled:true});
    }
    const id = event.target.id;
    // console.log(id);
    let e;
    switch(id){
      case 'idNo':
        e=this.validateIdNo(event);
        break;
      default:
        break;
    }

    if(e!=null){
      this.setState({idNo: e.target.value})
      
      return true;
    }else{
      return false;
    }
    
  }

  // handleChange(event) {
  //   this.setState({idNo:event.target.value});
  // }

//   async handleSubmit(event){
//     event.preventDefault();
//     //this.setState({buttonDisabled:true});
//     const person = await (await fetch(`/applicant/existsByIdNo?idNo=${this.state.idNo}`)).json();
//     if(!person){
//       //alert("contractor exist");
//       Swal.fire(
//         'Error!',
//         "applicant doesn't exist",
//         'error'
//       )
//       this.setState({buttonDisabled:false});
//       this.setState({searched:true});
      
//     }else{
//     this.props.history.push("/applicant/result/" + this.state.idNo);
//     }
//  }

async handleSubmit(event){
  event.preventDefault();
  //this.setState({buttonDisabled:true});
  const person = await (await fetch(`/applicant/existsByIdNo?idNo=${this.state.idNo}`)).json();
  if(!person){
    
    const message= await Swal.fire({
      title: 'Warning',
      text: "Applicant doesn't exist",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#5cb85c',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Add Applicant',
      cancelButtonText: 'OK',
      reverseButtons: true
    })
    if (message.value) {
      this.props.history.push("/applicant/add/" + this.state.idNo);
    }
    this.setState({buttonDisabled:false});
    this.setState({searched:true});
   
  }else{
    this.props.history.push("/applicant/view/" + this.state.idNo);
    //  this.props.history.push("/applicant/result/" + this.state.idNo);
  }
}

  

  render() {
      return <div>
        <div className="padding">
        <a className="path" href="/home">  Home  </a> |
        <a className="path" href="/home"> Applicant  </a> |
        <a className="path2" href="/applicant/search">   Search Applicant</a>
        </div>
        <br/>
          <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
      <Container>
        {/* <div className="row float-right">
          <Button color="success" tag={Link} to={"/applicant/add/" + this.state.idNo} disabled={this.state.buttonDisabled}>Add Applicant</Button>
          {/* <Button color="success" onClick={this.addApplicant} disabled={this.state.buttonDisabled}>Add Applicant</Button> */}

        {/* </div> */} 
          
        <h2>Search Applicant</h2>
        <br></br>
        <Form onSubmit={this.handleSubmit}>
        <div className="form-group row">
          <label for="idNo" className="col-sm-1 col-form-label">ID No</label>
          <div className="col-sm-4">
            <Input type="text" name="idNo" id="idNo" 
                   onChange={this.handleChange} required/>
          </div>
          <div className="col-sm-2">
            <Button type="submit" color="primary" >Search</Button>
          </div>
          <div className="col-sm-4">
          <Button color="success" tag={Link} to={"/applicant/add/" + this.state.idNo} disabled={this.state.buttonDisabled}>Add Applicant</Button>
          </div>
        </div>
        </Form>
        
      </Container>
    </div>
  }
}

export default ApplicantSearch;