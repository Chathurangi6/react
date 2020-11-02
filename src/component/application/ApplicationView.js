import React from 'react';
import { withRouter,Link } from 'react-router-dom';
import { Button, Col, Row, Jumbotron, Container, Table, Card, CardBody } from 'reactstrap';
import './css/ApplicationView.css'
import * as FontAwesome from 'react-icons/lib/fa'
import { animateScroll as scroll } from 'react-scroll'
import '../../css/Path.css';
import Swal from 'sweetalert2';

import { Helmet } from 'react-helmet'
const TITLE = 'View Application'
class ApplicationAdd extends React.Component {

  months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  date = new Date().getFullYear() + '-' + this.months[new Date().getMonth()] + '-' + new Date().getDate();

  initialApplication = {
    id: {
      applicationId: '',
      deptId: sessionStorage.getItem('costCenterNo')
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

  initialWiringLandDetails = {
    id: {
      applicationId: '',
      deptId: ''
    },
    assessmentNo: '',
    connectionType: '',
    customerCategory: '',
    customerType: '',
    existingAccNo: '',
    isGovernmentPlace: '',
    metalCrusher: '',
    motorTotal: '',
    neighboursAccNo: '',
    noOfBulbs: '',
    noOfDmgMeters: '',
    noOfFans: '',
    noOfPlugs15a: '',
    noOfPlugs5a: '',
    occupyOwnerCertified: '',
    ownership: '',
    phase: '',
    sawMills: '',
    serviceCity: '',
    serviceDistrict: '',
    servicePostalCode: '',
    serviceStreetAddress: '',
    serviceSuburb: '',
    tariffCatCode: '',
    tariffCode: '',
    weldingPlant: '',
    zoneId: '',
  }

  initialApplicant = {
    idType: '',
    idNo: '',
    firstName: '',
    lastName: '',
    streetAddress: '',
    telephoneNo: '',
    suburb: '',
    mobileNo: '',
    city: '',
    email: '',
    postalCode: '',
    preferredLanguage: '',
    cebEmployee: '',
  }

  initialSpapplon = {

    id: {
      applicationNo: '',
      deptId: ''
    },
    addDate: '',
    addTime: '',
    addUser: '',
    approvalDs: '',
    approvalSbm: '',
    approvalSdo: '',
    installment: '',
    interestRate: '',
    isLoan4Share: '',
    loanAmount: '',
    loanReference: '',
    memberOfSamurdhi: '',
    noOfShares: '',
    samurdhiId: '',
    samurdhiSharePrice: '',
    totalInterest: '',
    wiringComponent: '',
    years: '',
    updDate: '',
    updTime: '',
    updUser: ''
  }



  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      currentStep: 1,
      isActive: [],
      isCompleted: [],
      application: this.initialApplication,
      updWiringLandDetails: this.initialWiringLandDetails,
      applicant: this.initialApplicant,
      updSpapplon: this.initialSpapplon,
      title: ["Personal Details", "Application Details", "Contact Personal Details", "Service Location Details", "Details of wiring", "Finish"],
      csc: {},
      tariffCategoryList: [],
      tariffList: [],
      returnOfAddApplication: this.initialApplication


    }
    this.handleEdit = this.handleEdit.bind(this);
        this.handleIdNo =this.handleIdNo.bind(this);
  }

  async componentDidMount() {

    console.log(this.props.match.params.applicationId)
    
    const decodedApplicationId = decodeURIComponent(this.props.match.params.applicationId);
    console.log(decodedApplicationId)
    const application = await (await fetch(`/application/findByIdApplicationId?applicationId=${decodedApplicationId}`)).json();
    this.setState({ application: application },() => this.handleIdNo());

    //  //const decodedApplicationId = decodeURIComponent(this.props.match.params.applicationId);
    //  const application = await (await fetch(`/application/findByIdApplicationId?applicationId=${decodedApplicationId}`)).json();
    //  this.setState({ application: application,isLoading:false},() => this.handleIdNo());


    const wiringLandDetail = await (await fetch(`/wiringLandDetail/findByIdApplicationId?applicationId=${decodedApplicationId}`)).json();
    this.setState({ updWiringLandDetails: wiringLandDetail });
    console.log(wiringLandDetail)


    const applicant = await (await fetch(`/applicant/findByIdNo?idNo=433454345v`)).json();
    this.setState({ applicant: applicant })
    console.log(applicant)

    await (await fetch(`/gldeptin/getCostCenterName?deptId=${sessionStorage.getItem('costCenterNo')}`)//edited
            .then(response => response.json())
            .then(data => this.setState({ csc: data }))
        )

    let isCompleted = this.state.isCompleted;
    for (let i = 0; i < 5; i++) {
      isCompleted[i] = 'completed'
    }


    let isActive = this.state.isActive;
    isActive = [];
    isActive[0] = 'active'//Active first circle in multisteps progress bar
    this.setState({ isActive, isLoading: false });
  }

  
  handleEdit() {

    //const decodedApplicationId = decodeURIComponent(this.props.match.params.applicationId);
    const decodedApplicationIdd = decodeURIComponent(this.props.match.params.applicationId);
    if (this.state.application.status !== 'E') {
        this.props.history.push("/application/edit/" + this.props.match.params.applicationId);
    }
    else {
        Swal.fire({
            type: 'warning',
            text: `you are not permited to update ${decodedApplicationIdd}`,
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

  _next = () => {
    let currentStep = this.state.currentStep
    if (currentStep === 5) {
    } else {
      currentStep = currentStep >= 5 ? 5 : currentStep + 1
      this.setState({ currentStep: currentStep }, () => this.setActive())
    }
    scroll.scrollToTop();

  }



  _prev = () => {
    let currentStep = this.state.currentStep
    currentStep = currentStep <= 1 ? 1 : currentStep - 1
    this.setState({currentStep: currentStep},() => this.setActive())
    scroll.scrollToTop();

  }

  setActive = () => {
    let currentStep = this.state.currentStep
    let isActive = this.state.isActive;
    isActive = [];
    isActive[currentStep - 1] = 'active'
    this.setState({ isActive });
  }

  goToStep(num) {

    let currentStep = this.state.currentStep;
    let isCompleted = this.state.isCompleted;
    if (num === 1) {
      currentStep = num;
      this.setState({ currentStep: currentStep }, () => this.setActive());

    } else if (isCompleted[num - 2] === 'completed') {
      currentStep = num;
      this.setState({ currentStep: currentStep }, () => this.setActive());
    }

  }


  previousButton() {

    let currentStep = this.state.currentStep;
    if (currentStep === 1) {
      return (
        <Button disabled style={{ paddingLeft: 50, paddingRight: 50, textAlign: "center" ,opacity:0.2 }} color="primary" onClick={this._prev}>
          <FontAwesome.FaAngleDoubleLeft />Previous
             </Button>
      );
    } else {
      return (
        <Button style={{ paddingLeft: 50, paddingRight: 50, textAlign: "center" }} color="primary" onClick={this._prev}>
          <FontAwesome.FaAngleDoubleLeft />Previous
                </Button>
      );
    }
  }

  nextButton() {
    let currentStep = this.state.currentStep;
    if (currentStep < 5) {
      return (
        <Button style={{ float: "right", paddingLeft: 60, paddingRight: 60, textAlign: "center" }} color="primary" onClick={() => this._next()}>
          Next<FontAwesome.FaAngleDoubleRight />
        </Button>
      );
    } else {
      return (
        <Button disabled style={{ float: "right", paddingLeft: 60, paddingRight: 60, textAlign: "center",opacity:0.2 }} color="primary" onClick={() => this._next()}>
          Next<FontAwesome.FaAngleDoubleRight />
        </Button>
      );
    }
  }

  handleIdNo(){
    sessionStorage.setItem('idNo',this.state.application.idNo)
}





  render() {

    const { application, updWiringLandDetails, applicant, title, currentStep, csc, isLoading } = this.state;


    if (isLoading) {
      return <p>Loading...</p>;
    }

    return (
  <React.Fragment>
                 <div className="padding">
        <a className="path" href="/home">  Home  </a> |
        <a className="path" href="/application/search"> Search Application </a>|
        <a className="path2" href="/application/view"> Application Details  </a>
        </div>
        <Helmet>
          <title>{ TITLE }</title>
        </Helmet>

        <Container>
                    <Button style={{ float: "right" }} color="primary" onClick={this.handleEdit}  >Edit Application</Button>
                   
        </Container>

        <Jumbotron className="jum_application" >

          <h5 style={{ textAlign: "center" }} >APPLICATION FORM CEYLON ELECTRICITY BOARD</h5>
          <br />
          <ul className="progressbar_ApplicationView">
            <li className={this.state.isCompleted[0] + ' ' + this.state.isActive[0]} onClick={() => this.goToStep(1)}>Personal Details</li>
            <li className={this.state.isCompleted[1] + ' ' + this.state.isActive[1]} onClick={() => this.goToStep(2)}>Application Details</li>
            <li className={this.state.isCompleted[2] + ' ' + this.state.isActive[2]} onClick={() => this.goToStep(3)}>Contact Personal Details</li>
            <li className={this.state.isCompleted[3] + ' ' + this.state.isActive[3]} onClick={() => this.goToStep(4)}>Service Location Details</li>
            <li className={this.state.isCompleted[4] + ' ' + this.state.isActive[4]} onClick={() => this.goToStep(5)}>Details of wiring</li>
          </ul>

          <Jumbotron className="jum_application_form" >
            <h6 style={{ textAlign: "center" }} >Step {this.state.currentStep} - {title[currentStep - 1]}</h6>

            <Step1
              currentStep={this.state.currentStep}
              idType={applicant.idType}
              idNo={applicant.idNo}
              firstName={applicant.firstName}
              lastName={applicant.lastName}
              streetAddress={applicant.streetAddress}
              telephoneNo={applicant.telephoneNo}
              suburb={applicant.suburb}
              mobileNo={applicant.mobileNo}
              city={applicant.city}
              email={applicant.email}
              postalCode={applicant.postalCode}
              preferredLanguage={applicant.preferredLanguage}
              cebEmployee={applicant.cebEmployee}
            />

            <Step2
              currentStep={this.state.currentStep}
              applicationId={application.id.applicationId}
              deptId={application.id.deptId}
              applicationType={application.applicationType}
              existingAccNo={updWiringLandDetails.existingAccNo}
              applicationSubType={application.applicationSubType}
              linkedWith={application.linkedWith}
              durationType={application.durationType}
              allocatedTo={application.allocatedTo}
              fromDate={application.fromDate}
              toDate={application.toDate}
              applicationNo={application.applicationNo}
              status={application.status}
              isPiv1Needed={application.isPiv1Needed}
              description={application.description}
              isLoanApp={application.isLoanApp}
              samurdhiMember={application.samurdhiMember}
              csc={csc.deptFullName}
              date={this.date}
              confromPiv=''

            />
            <Step3
              currentStep={this.state.currentStep}
              contactIdNo={application.contactIdNo}
              contactName={application.contactName}
              contactAddress={application.contactAddress}
              contactTelephone={application.contactTelephone}
              contactMobile={application.contactMobile}
              contactEmail={application.contactEmail}
            />

            <Step4
              currentStep={this.state.currentStep}
              serviceStreetAddress={updWiringLandDetails.serviceStreetAddress}
              serviceSuburb={updWiringLandDetails.serviceSuburb}
              serviceCity={updWiringLandDetails.serviceCity}
              servicePostalCode={updWiringLandDetails.servicePostalCode}
              zoneId={updWiringLandDetails.zoneId}
              assessmentNo={updWiringLandDetails.assessmentNo}
              neighboursAccNo={updWiringLandDetails.neighboursAccNo}
              ownership={updWiringLandDetails.ownership}
              isGovernmentPlace={updWiringLandDetails.isGovernmentPlace}
              occupyOwnerCertified={updWiringLandDetails.occupyOwnerCertified}
            />

            <Step5
              currentStep={this.state.currentStep}
              noOfBulbs={updWiringLandDetails.noOfBulbs}
              noOfFans={updWiringLandDetails.noOfFans}
              noOfPlugs5a={updWiringLandDetails.noOfPlugs5a}
              noOfPlugs15a={updWiringLandDetails.noOfPlugs15a}
              motorTotal={updWiringLandDetails.motorTotal}
              weldingPlant={updWiringLandDetails.weldingPlant}
              metalCrusher={updWiringLandDetails.metalCrusher}
              sawMills={updWiringLandDetails.sawMills}
              phase={updWiringLandDetails.phase}
              connectionType={updWiringLandDetails.connectionType}
              customerCategory={updWiringLandDetails.customerCategory}
              customerType={updWiringLandDetails.customerType}
              tariffCatCode={updWiringLandDetails.tariffCatCode}
              tariffCode={updWiringLandDetails.tariffCode}
              confirmedBy={application.confirmedBy}
              preparedBy={application.preparedBy}
            />


            <br />

            {this.previousButton()}
            {this.nextButton()}




          </Jumbotron>
        </Jumbotron>


      </React.Fragment>
    );
  }
  //scrollToMyRef = () => window.scrollTo(0, 1000)

}

function Step1(props) {
  if (props.currentStep !== 1) {
    return null
  }
  return (

    <React.Fragment >
      <Container style={{ display: "flex", justifyContent: "center" }}>
        <br></br>
        <br></br>
        <br></br>
        <Card style={{ width: "100%" }}>
          <CardBody>
            <Row>
              <Col sm="6">
                <Table>
                  <tbody>
                    <tr>
                      <th scope="row">ID Type</th>
                      <td>{props.idType}</td>
                    </tr>
                    <tr>
                      <th scope="row">IdNo</th>
                      <td>{props.idNo}</td>
                    </tr>
                    <tr>
                      <th scope="row">First name</th>
                      <td>{props.firstName}</td>
                    </tr>
                    <tr>
                      <th scope="row">Last Name</th>
                      <td>{props.lastName}</td>
                    </tr>
                    <tr>
                      <th scope="row">Street Address(line 1</th>
                      <td>{props.streetAddress}</td>
                    </tr>
                    <tr>
                      <th scope="row">Suburb(line 2)</th>
                      <td>{props.suburb}</td>
                    </tr>
                    <tr className="tr_Application">
                      <th scope="row">City(line 3)</th>
                      <td>{props.city}</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
              <Col sm="6">
                <Table>
                  <tbody>
                    <br></br>
                    <br></br>
                    <tr>
                      <th scope="row">Postal Code</th>
                      <td>{props.postalCode}</td>
                    </tr>
                    <tr>
                      <th scope="row">Telephone No</th>
                      <td>{props.telephoneNo}</td>
                    </tr>
                    <tr>
                      <th scope="row">Mobile No/SMS</th>
                      <td>{props.mobileNo}</td>
                    </tr>
                    <tr>
                      <th scope="row">Email</th>
                      <td>{props.email}</td>
                    </tr>
                    <tr>
                      <th scope="row">Preferred Language</th>
                      <td>{props.preferredLanguage}</td>
                    </tr>
                    <tr className="tr_Application">
                      <th scope="row">CEB Employee</th>
                      <td>{props.cebEmployee}</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Container>
    </React.Fragment>
  );
}



function Step2(props) {

  let confirmPiv
  if (props.status === 'M' || props.status === 'N') {
    confirmPiv = 'Yes'
  } else {
    confirmPiv = 'No'
  }
  let applicationType
  if (props.applicationType === 'NC') {
    applicationType = 'New Connection';
  }

  let isPiv1Needed
  switch (props.isPiv1Needed) {
    case 'Y':
      isPiv1Needed = 'Yes';
      break;
    case 'N':
      isPiv1Needed = 'No';
      break;
    default:
      isPiv1Needed = props.isPiv1Needed;
  }

  let isLoanApp
  switch (props.isLoanApp) {
    case 'Y':
      isLoanApp = 'Yes';
      break;
    case 'N':
      isLoanApp = 'No';
      break;
    default:
      isLoanApp = props.isLoanApp;
  }

  let samurdhiMember
  switch (props.samurdhiMember) {
    case 'Y':
      samurdhiMember = 'Yes';
      break;
    case 'N':
      samurdhiMember = 'No';
      break;
    default:
      samurdhiMember = props.samurdhiMember;
  }

  let applicationSubType
  switch (props.applicationSubType) {
    case 'PM':
      applicationSubType = 'Permanent';
      break;
    case 'C1':
      applicationSubType = 'Temp Cons1';
      break;
    case 'C2':
      applicationSubType = 'Temp Cons2';
      break;
    case 'C3':
      applicationSubType = 'Temp Cons3';
      break;
    case 'FF':
      applicationSubType = 'First Fifty';
      break;
    case 'SP':
      applicationSubType = 'School Program';
      break;
    case 'FS':
      applicationSubType = 'Free Service';
      break;
    case 'TU':
      applicationSubType = 'Time Of Use';
      break;
    case 'TA':
      applicationSubType = 'Agriculture(TOU)';
      break;
    default:
      applicationSubType = '-';
  }

  if (props.currentStep !== 2) {
    return null
  }
  return (

    <React.Fragment>

      <Container style={{ display: "flex", justifyContent: "center" }}>
        <br></br>
        <br></br>
        <br></br>
        <Card style={{ width: "100%", overflowX: "auto" }}>
          <CardBody>
            <Row>
              <Col sm="6">
                <Table>
                  <tbody>
                    <tr>
                      <th scope="row">Temp ID</th>
                      <td>{props.applicationId}</td>
                    </tr>
                    <tr>
                      <th scope="row">Cost Center No</th>
                      <td>{props.deptId}</td>
                    </tr>
                    <tr>
                      <th scope="row">Application Type</th>
                      <td>{applicationType}</td>
                    </tr>
                    <tr>
                      <th scope="row">Application Sub Type</th>
                      <td>{applicationSubType}</td>
                    </tr>
                    <tr>
                      <th scope="row">Duration</th>
                      <td>{props.durationType}</td>
                    </tr>
                    <tr>
                      <th scope="row">From Date</th>
                      <td>{props.fromDate}</td>
                    </tr>
                    <tr>
                      <th scope="row">To Date</th>
                      <td>{props.toDate}</td>
                    </tr>
                    <tr>
                      <th scope="row">Estimate No</th>
                      <td>{props.applicationNo}</td>
                    </tr>
                    <tr className="tr_Application" >
                      <th scope="row">Allocated To</th>
                      <td>{props.allocatedTo}</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
              <Col sm="6">
                <Table>
                  <tbody>
                    <br></br>
                    <br></br>
                    <tr>
                      <th scope="row">CSC</th>
                      <td>{props.csc}</td>
                    </tr>
                    <tr>
                      <th scope="row">Old Acc No</th>
                      <td>{props.existingAccNo}</td>
                    </tr>
                    <tr>
                      <th scope="row">Linked With</th>
                      <td>{props.linkedWith}</td>
                    </tr>
                    <tr>
                      <th scope="row">Confirm PIV</th>
                      <td>{confirmPiv}</td>
                    </tr>
                    <tr>
                      <th scope="row">Is Piv 1 Needed Default</th>
                      <td>{isPiv1Needed}</td>
                    </tr>
                    <tr>
                      <th scope="row">Is Applying For a Loan***</th>
                      <td>{isLoanApp}</td>
                    </tr>
                    <tr>
                      <th scope="row">Samurdhi Member***</th>
                      <td>{samurdhiMember}</td>
                    </tr>
                    <tr className="tr_Application">
                      <th scope="row">Description</th>
                      <td>{props.description}</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Container>

    </React.Fragment>

  );
}

function Step3(props) {
  if (props.currentStep !== 3) {
    return null
  }
  return (
    <React.Fragment>

      <Container style={{ display: "flex", justifyContent: "center" }}>
        <br></br>
        <br></br>
        <br></br>
        <Col sm="1"></Col>
        <Col sm="10">
          <Card style={{ width: "100%", overflowX: "auto" }}>
            <CardBody>
              <Row>

                <Table>
                  <tbody>
                    <tr>
                      <th scope="row">ID No</th>
                      <td>{props.contactIdNo}</td>
                    </tr>
                    <tr>
                      <th scope="row">Contact Name</th>
                      <td>{props.contactName}</td>
                    </tr>
                    <tr>
                      <th scope="row">Contact Address</th>
                      <td>{props.contactAddress}</td>
                    </tr>
                    <tr>
                      <th scope="row">Telephone No</th>
                      <td>{props.contactTelephone}</td>
                    </tr>
                    <tr>
                      <th scope="row">Mobile No</th>
                      <td>{props.contactMobile}</td>
                    </tr>
                    <tr className="tr_Application">
                      <th scope="row">Email</th>
                      <td>{props.contactEmail}</td>
                    </tr>
                  </tbody>
                </Table>

              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col sm="1"></Col>
      </Container>


    </React.Fragment>
  );

}

function Step4(props) {

  let isGovernmentPlace
  switch (props.isGovernmentPlace) {
    case 'Y':
      isGovernmentPlace = 'Yes';
      break;
    case 'N':
      isGovernmentPlace = 'No';
      break;
    default:
      isGovernmentPlace = props.isGovernmentPlace;
  }

  let occupyOwnerCertified
  switch (props.occupyOwnerCertified) {
    case 'Y':
      occupyOwnerCertified = 'Yes';
      break;
    case 'N':
      occupyOwnerCertified = 'No';
      break;
    default:
      occupyOwnerCertified = props.occupyOwnerCertified;
  }

  if (props.currentStep !== 4) {
    return null
  }
  return (
    <React.Fragment>
      <Container style={{ display: "flex", justifyContent: "center" }}>
        <br></br>
        <br></br>
        <br></br>
        <Col sm="1"></Col>
        <Col sm="10">
          <Card style={{ width: "100%", overflowX: "auto" }}>
            <CardBody>
              <Row>
                <Table>
                  <tbody>
                    <tr>
                      <th scope="row">Street Address(line 1)</th>
                      <td>{props.serviceStreetAddress}</td>
                    </tr>
                    <tr>
                      <th scope="row">Suburb(line 2)</th>
                      <td>{props.serviceSuburb}</td>
                    </tr>
                    <tr>
                      <th scope="row">City(line 3)</th>
                      <td>{props.serviceCity}</td>
                    </tr>
                    <tr>
                      <th scope="row">Postal Code</th>
                      <td>{props.servicePostalCode}</td>
                    </tr>
                    <tr>
                      <th scope="row">Zone</th>
                      <td>{props.zoneId}</td>
                    </tr>
                    <tr>
                      <th scope="row">Assessement No</th>
                      <td>{props.assessmentNo}</td>
                    </tr>
                    <tr>
                      <th scope="row">Neighbours Acc. No</th>
                      <td>{props.neighboursAccNo}</td>
                    </tr>
                    <tr>
                      <th scope="row">Ownership</th>
                      <td>{props.ownership}</td>
                    </tr>
                    <tr>
                      <th scope="row">Is Goverment place</th>
                      <td>{isGovernmentPlace}</td>
                    </tr>
                    <tr className="tr_Application">
                      <th scope="row">Occupy/Owner Certified</th>
                      <td>{occupyOwnerCertified}</td>
                    </tr>
                  </tbody>
                </Table>

              </Row>
            </CardBody>
          </Card>
        </Col>
        <Col sm="1"></Col>
      </Container>


    </React.Fragment>
  );
}

function Step5(props) {

  let customerType
  switch (props.customerType) {
    case 'DOME':
      customerType = 'Domestic';
      break;
    case 'CONS':
      customerType = 'Construction';
      break;
    case 'SHOP':
      customerType = 'Shop/Office';
      break;
    case 'SCHL':
      customerType = 'School';
      break;
    case 'INDT':
      customerType = 'Industrial';
      break;
    case 'HOTE':
      customerType = 'Hotel';
      break;
    case 'GARM':
      customerType = 'Garment';
      break;
    case 'FORC':
      customerType = 'Forces';
      break;
    case 'TEMP':
      customerType = 'Temple';
      break;
    case 'CHUR':
      customerType = 'Church';
      break;
    case 'MOSQ':
      customerType = 'MOSQUE';
      break;
    case 'FSER':
      customerType = 'Free Service';
      break;
    case 'AGRI':
      customerType = 'Agriculture';
      break;
    default:
      customerType = '-';
  }


  let customerCategory
  switch (props.customerCategory) {
    case 'PRIV':
      customerCategory = 'Private';
      break;
    case 'GOVE':
      customerCategory = 'Government';
      break;
    case 'SEGO':
      customerCategory = 'Semi_Government';
      break;
    case 'FORE':
      customerCategory = 'Foreign';
      break;
    case 'RELI':
      customerCategory = 'Religious';
      break;
    default:
      customerCategory = '-';
  }

  if (props.currentStep !== 5) {
    return null
  }

  return (

    <React.Fragment>

      <Container style={{ display: "flex", justifyContent: "center" }}>
        <br></br>
        <br></br>
        <br></br>
        <Card style={{ width: "100%", overflowX: "auto" }}>
          <CardBody>
            <Row>
              <Col sm="6">
                <Table>
                  <tbody>
                    <tr>
                      <th scope="row">Number of Bulbs</th>
                      <td>{props.noOfBulbs}</td>
                    </tr>
                    <tr>
                      <th scope="row">Number of Plugs(5A)</th>
                      <td>{props.noOfPlugs5a}</td>
                    </tr>
                    <tr>
                      <th scope="row">Motors Total(hp/Kw)</th>
                      <td>{props.motorTotal}</td>
                    </tr>
                    <tr>
                      <th scope="row">Metal Crusher(hp/Kw)</th>
                      <td>{props.metalCrusher}</td>
                    </tr>
                    <tr>
                      <th scope="row">Phase</th>
                      <td>{props.phase}</td>
                    </tr>
                    <tr>
                      <th scope="row">Customer Category</th>
                      <td>{customerCategory}</td>
                    </tr>
                    <tr>
                      <th scope="row">Tariff Category Code</th>
                      <td>{props.tariffCatCode}</td>
                    </tr>
                    <tr className="tr_Application" >
                      <th scope="row">Prepared By</th>
                      <td>{props.preparedBy}</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
              <Col sm="6">
                <Table>
                  <tbody>
                    <tr>
                      <th scope="row">Number of Fans</th>
                      <td>{props.noOfFans}</td>
                    </tr>
                    <tr>
                      <th scope="row">Number of Plugs(15A)</th>
                      <td>{props.noOfPlugs15a}</td>
                    </tr>
                    <tr>
                      <th scope="row">Welding Plant(KVA)</th>
                      <td>{props.weldingPlant}</td>
                    </tr>
                    <tr>
                      <th scope="row">Saw Mills(hp/Kw)</th>
                      <td>{props.sawMills}</td>
                    </tr>
                    <tr>
                      <th scope="row">Connection Type</th>
                      <td>{props.connectionType}</td>
                    </tr>
                    <tr>
                      <th scope="row">Customer Type</th>
                      <td>{customerType}</td>
                    </tr>
                    <tr>
                      <th scope="row">Tariff Code</th>
                      <td>{props.tariffCode}</td>
                    </tr>
                    <tr className="tr_Application">
                      <th scope="row">Confirmed By</th>
                      <td>{props.confirmedBy}</td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Container>
    </React.Fragment>
  );
}

export default withRouter(ApplicationAdd);
