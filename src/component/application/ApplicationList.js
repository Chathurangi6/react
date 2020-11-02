import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../../css/Path.css';
import { Helmet } from 'react-helmet'
const TITLE = 'Application List'
class ApplicationList extends Component {

  constructor(props) {
    super(props);
    this.state = {applications: [], isLoading: true};
    this.handleApplicationEdit=this.handleApplicationEdit.bind(this);
    this.warning=this.warning.bind(this);
  }

  async componentDidMount() {

   
    const applicationresponse = await fetch('/application/all')
    const applications = await applicationresponse.json()
    console.log(applications);
    this.setState({applications:applications,isLoading: false});

   
  }

  async handleApplicationEdit(status,deptId,applicationId){
    const EncodedApplicationId = encodeURIComponent(applicationId);
    if(status !== 'E'){
      this.props.history.push(`/application/edit/${deptId}/${EncodedApplicationId}`);
    }else{
        console.log("hhhhh")
    }

  }

  warning(){
    Swal.fire({
      type: 'warning',
      text: `you are not permited to update`,
      position: 'top',
      heightAuto: false,
      width: 400,
  })
  this.props.history.push('/application/list');
  }


  

  render() {
    const {applications, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const applicationList = applications.map(application => {
      const EncodedApplicationId = encodeURIComponent(application.id.applicationId);
      if(application.status !== 'E'){
        return <tr key={application.id.applicationId}>
        <td style={{whiteSpace: 'nowrap'}}>{application.id.applicationId}</td>
        <td style={{whiteSpace: 'nowrap'}}>{application.id.deptId}</td>
        <td style={{whiteSpace: 'nowrap'}}>{application.applicationNo}</td>
        
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/application/edit/" + application.id.deptId + "/" +  EncodedApplicationId } >Edit</Button>
          </ButtonGroup>
        </td>
      </tr>
      }else{
        return <tr key={application.id.applicationId}>
        <td style={{whiteSpace: 'nowrap'}}>{application.id.applicationId}</td>
        <td style={{whiteSpace: 'nowrap'}}>{application.id.deptId}</td>
        <td style={{whiteSpace: 'nowrap'}}>{application.applicationNo}</td>
        
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" onClick={this.warning} >Edit</Button>
          </ButtonGroup>
        </td>
      </tr>
      }
      
    });

    return (
      <div>
        <Container fluid>
 <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
        <div className="padding">
        <a className="path" href="/home">  Home  </a> |
        <a className="path" href="/application/search"> Search Application </a>|
        <a className="path2" href="/application/list"> Application List </a>
        </div>
          <div className="float-right">
          <Button size="sm" color="primary" tag={Link} to={"/" } >Home</Button>
          </div>
          <h3>Application List</h3>
          <Table className="mt-4">
            <thead>
            <tr>
            <th width="20%">Temp ID</th>
            <th width="20%">Cost Center No</th>
            <th width="20%">Estimate No</th>
            <th width="10%">Actions</th>
            </tr>
            </thead>
            <tbody>
            {applicationList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default ApplicationList;