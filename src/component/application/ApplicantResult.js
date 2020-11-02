import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label, Table, ButtonGroup } from 'reactstrap';
import '../../css/Path.css';
import { Helmet } from 'react-helmet'
const TITLE = 'Applicant Details'
class ApplicantResult extends Component {

//   emptyApplicant = {
//     personalCorporate:'',
//     idType:'',
//     idNo: '',
//     fullName: '',
//     firstName:'',
//     lastName:'',
//     streetAddress:'',
//     suburb:'',
//     city:'',
//     postalCode:'',
//     telephoneNo:'',
//     mobileNo:'',
//     email:'',
//     preferredLanguage:'',
//     cebEmployee:''
//   };
  

  constructor(props) {
    super(props);
    this.state = {
      applicant:{},
      //noData:true
    };
    
    
  }

  async componentDidMount() {
    
    this.setState({noData:true});
      // const person = await (await fetch(`/applicant/findByIdNo?idNo=${this.props.match.params.idNo}`)).json();
      // this.setState({applicant: person, noData:false});
    
    fetch(`/applicant/findByIdNo?idNo=${this.props.match.params.idNo}`)
      .then(response=>response.json())
      .then(data => this.setState({applicant:data}));
      //.then(data => this.setState({applicant:data, noData:false}));
  }

  render(){
    
      const {applicant}=this.state;
      // if(noData){
      //   return (
      //   <div>
      //     <AppNavbar/>
      //     <Container >
      //       <div className="float-right">
      //           <ButtonGroup>
      //             <Button color="primary" tag={Link} to="/applicant/search">Back</Button>
      //             <Button color="success" tag={Link} to="/applicant/add">Add Applicant</Button>
      //           </ButtonGroup>
      //       </div>
      //       <br></br>
      //       <br></br>
      //       <br></br>
            
      //       <div className="d-flex justify-content-center">
      //         <div className="card text-center text-danger border-danger" style={{width:'50rem'}}>
      //           <div className="card-body ">
      //             Applicant doesn't exist
      //           </div>
      //         </div>
      //       </div>
      //     </Container>
      //   </div>
      //   );
      // }
      return(
        <div>
            <div className="padd-left">
        <a className="path" href="/home">  Home  </a> |
        <a className="path" href="/home"> Applicant  </a> |
        <a className="path2" href="/applicant/search"> View Applicant</a>
    
        </div>
        <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
            <Container >
                <div className="float-right">
                  {/* <ButtonGroup> */}
                    <Button color="primary" tag={Link} to="/applicant/search">Back</Button>
                    {/* <Button color="success" tag={Link} to="/applicant/add">Add Applicant</Button> */}
                  {/* </ButtonGroup> */}
                </div>
                <br></br>
                <br></br>
                <br></br>
                {/* <h3>Applicant Detail</h3>
                <Table className="mt-4">
                <thead>
                <tr>
                    <th width="20%">Id No</th>
                    <th width="20%">Full Name</th>
                    <th width="20%">First Name</th>
                    <th>Last Name</th>
                    <th width="10%">Actions</th>
                </tr>
                </thead>
                <tbody>
                    <td>{this.state.applicant.idNo}</td>
                    <td>{this.state.applicant.fullName}</td>
                    <td>{this.state.applicant.firstName}</td>
                    <td>{this.state.applicant.lastName}</td>
                    <td>
                    <ButtonGroup>
                      <Button size="sm" color="success" tag={Link} to={"/applicant/view/" + this.state.applicant.idNo}>View</Button>
                      <Button size="sm" color="primary" tag={Link} to={"/applicant/edit/" + this.state.applicant.idNo}>Edit</Button>
                    </ButtonGroup>
                    </td>
                </tbody>
                </Table> */}
                <div className="d-flex justify-content-center">
                  <div className="card " style={{width:'50rem'}}>
                  {/* <div class="card-header">
                    Featured
                  </div> */}
                  <div className="card-body">
                    <h2 className="card-title text-center">Applicant Detail</h2>

                    <hr></hr>
                    <table className="table table-borderless">
                      <tbody>
                        <tr>
                          <th scope="row">Id No</th>
                          <td>{applicant.idNo}</td>
                        </tr>
                        <tr>
                          <th scope="row">Id Type</th>
                          <td>{applicant.idType}</td>
                        </tr>
                        <tr>
                          <th scope="row">Full Name</th>
                          <td>{applicant.fullName}</td>
                        </tr>
                        <tr>
                          <th scope="row">First Name</th>
                          <td>{applicant.firstName}</td>
                        </tr>
                        <tr>
                          <th scope="row">Last Name</th>
                          <td>{applicant.lastName}</td>
                        </tr>
                        <tr>
                          <th scope="row">Mobile No</th>
                          <td>{applicant.mobileNo}</td>
                        </tr>
                        </tbody>
                      </table>
                  <div className= "float-right">
      
                    <ButtonGroup>
                      <Button color="success" tag={Link} to={"/applicant/view/" + applicant.idNo}>View</Button>
                      <Button color="primary" tag={Link} to={"/applicant/edit/" + applicant.idNo}>Edit</Button>
                    </ButtonGroup>
                  </div>
    

                </div>
                {/* <div class="card-footer text-muted">
                  2 days ago
                  </div> */}
                </div>
            </div>
            </Container>
          </div>
      )
  }
}
export default ApplicantResult;

