import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Container,  Table, ButtonGroup, Card, CardBody } from 'reactstrap';
import Swal from 'sweetalert2';
import '../../css/Path.css';
import { Helmet } from 'react-helmet'
const TITLE = 'Application Details'

class ApplicationResult extends Component {

    initialApplication = {
        id: {
            applicationId: '',
            deptId: ''
        },
        addDate: '',
        addTime: '',
        addUser: '',
        allocatedBy: '',
        allocatedDate: '',
        allocatedTime: '',
        allocatedTo: '',
        applicationNo: '',
        applicationSubType: '',
        applicationType: '',
        confirmedBy: '',
        confirmedDate: '',
        confirmedTime: '',
        contactAddress: '',
        contactEmail: '',
        contactIdNo: '',
        contactMobile: '',
        contactName: '',
        contactTelephone: '',
        description: '',
        disconnectedWithin: '',
        duration: '',
        durationInDays: '',
        durationType: '',
        finalizedWithin: '',
        fromDate: '',
        idNo: '',
        isLoanApp: '',
        isPiv1Needed: '',
        isVisitngNeeded: '',
        linkedWith: '',
        preparedBy: '',
        samurdhiMember: '',
        status: '',
        submitDate: '',
        toDate: '',
        updDate: '',
        updTime: '',
        updUser: '',
    }



    constructor(props) {
        super(props);
        this.state = {
            isLoading:true,
            application: this.initialApplication,
            //noData:true
        };
        this.handleEdit = this.handleEdit.bind(this);
        this.handleIdNo =this.handleIdNo.bind(this);


    }

    async componentDidMount() {
        
        const decodedApplicationId = decodeURIComponent(this.props.match.params.applicationId);
        const application = await (await fetch(`/application/findByIdApplicationId?applicationId=${decodedApplicationId}`)).json();
        this.setState({ application: application,isLoading:false},() => this.handleIdNo());
        

    }

    handleIdNo(){
        sessionStorage.setItem('idNo',this.state.application.idNo)
    }

    handleEdit() {

        const decodedApplicationId = decodeURIComponent(this.props.match.params.applicationId);
        if (this.state.application.status !== 'E') {
            this.props.history.push("/application/edit/" + this.props.match.params.applicationId);
        }
        else {
            Swal.fire({
                type: 'warning',
                text: `you are not permited to update ${decodedApplicationId}`,
                position: 'top',
                buttonsStyling: false,
                customClass: {
                    confirmButton: 'btn btn-primary btn-sm'
                },
                heightAuto: false,
                width: 400,
            })
            this.props.history.push("/application/result/" +  this.props.match.params.applicationId);

        }
    }

    render() {

        const { application,isLoading } = this.state;
        console.log(application)

        if (isLoading) {
            return <p>Loading...</p>;
        }

        return (
            <div>
                                           <br/>
                 <div className="padd-left">
        <a className="path" href="/home">  Home  </a> |
        <a className="path" href="/home"> Application  </a> |
        <a className="path" href="/application/search">Search Application</a>|
        <a className="path2" href="/application/result">Application Details</a>|
        </div>
        <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
                <Container>
                    <Button style={{ float: "right" }} color="primary" tag={Link} to="/application/search">Back</Button>
                </Container>
                <br></br>
                <br></br>

                <Container style={{ display: "flex", justifyContent: "center" }}>
                    <br></br>
                    <br></br>
                    <br></br>


                    <Card style={{ width: '50rem' }}>
                        <CardBody>
                            <h2 style={{ textAlign: "center" }}>Application Detail</h2>

                            <br></br>

                            <Table>
                                <tbody>
                                    <tr>
                                        <th scope="row">Temp Id</th>
                                        <td>{application.id.applicationId}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Cost Center</th>
                                        <td>{application.id.deptId}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Estimate No</th>
                                        <td>{application.applicationNo}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row"></th>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </Table>


                            <ButtonGroup style={{ float: "right" }}>
                                <Button color="success" tag={Link} to={"/application/view/" +   this.props.match.params.applicationId}>View</Button>
                                <Button color="primary" onClick={this.handleEdit}  >Edit</Button>
                            </ButtonGroup>
                        </CardBody>
                    </Card>

                </Container>
            </div>
        )
    }
}
export default ApplicationResult;

