import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
// import {validateDecimal} from './LabourValidate';
import '../../css/Path.css';
import Swal from 'sweetalert2';
import {estimateStatus} from '../Estimate/EstimateStatus'
// import { Helmet } from 'react-helmet';
// const TITLE = 'Edit Labour Activity Rate';

class JobCreate extends Component {

    emptyIdGroup={
      estimationNo:'',
      costCenter:sessionStorage.getItem('costCenterNo'),
    }
    emptyOtherDetails={
      cscNo:sessionStorage.getItem('costCenterNo'),
      suggestedcscNo:'',
      refNo:'',
      jobNo:''
    }
    emptyApplicant={
      firstName:'',
      lastName:'',
      idNo:'',
      mobileNo:'',
      telephoneNo:'',
      cebEmployee:''
    }
    
    emptyApplication={
      id:{
      applicationId:''
      },
      applicationNo:'',
      description:'',
      idNo:'',
      submitDate:''
    }
    
    emptyWiringLandDetail={   
      neighboursAccNo:'',
      assessmentNo:'',
      serviceStreetAddress:'',
      serviceSuburb:'',
      serviceCity:'',
      phase:'',
      tariffCatCode:'',
      connectionType:'',
      tariffCode:''
    }
    emptyPcesthtt={
      id:{
        estimateNo:'',
        deptId:'',
        revNo:''
      },
      CatCd:'',
      estimatedYear:'',
      etimateDt:'',
      fundSource:'',
      stdCost:'',
      status:''
    }

  

  constructor(props) {
    super(props);
    this.state = {
        idGroup:this.emptyIdGroup,
        otherDetails:this.emptyOtherDetails,
        applicant:this.emptyApplicant,
        application:this.emptyApplication,
        wiringLandDetail:this.emptyWiringLandDetail,
        pcesthtt:this.emptyPcesthtt,
        estimateNoList:[],
        searched:false
      
    };
    this.handleChangeIdGroup = this.handleChangeIdGroup.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toInputUppercase = this.toInputUppercase.bind(this);
    this.getData=this.getData.bind(this);
  }

  async componentDidMount() {

    await fetch(`/pcesthtt/findEstimateNoByStatusAndDeptIdAndRevNo?status=${estimateStatus.EST_POSTING}&deptId=${this.state.idGroup.costCenter}&revNo=1`)
    .then(response => response.json())
    .then(data => this.setState({estimateNoList: data.sort()}));
   
  }

  toInputUppercase(e) {
    e.target.value = ("" + e.target.value).toUpperCase();
  };

  handleChangeIdGroup(event) {
    this.clearForm();
    const status=this.props.status;
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let idGroup = {...this.state.idGroup};
    idGroup[name] = value;
    this.setState({idGroup},()=>this.getData());
    
  }
  handleChange(event) {
    const status=this.props.status;
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let otherDetails = {...this.state.otherDetails};
    otherDetails[name] = value;
    this.setState({otherDetails});
    
  }

  async getData(){
    if(this.state.idGroup.estimationNo){
      let application = await fetch(`/application/findByApplicationNo?applicationNo=${this.state.idGroup.estimationNo}`);
      if(application.status==200){
        application = await (application).json();
        let applicant = await fetch(`/applicant/findByIdNo?idNo=${application.idNo}`);

        let wiringLandDetail = await fetch(`/wiringLandDetail/findByIdApplicationId?applicationId=${application.id.applicationId}`);
        this.setState({application});
        if(applicant.status==200){
          applicant = await (applicant).json();
          this.setState({applicant});
        }else{
          await Swal.fire(
            'Error!',
            "Applicant doesn't exist",
            'error'
          )
        }
        if(wiringLandDetail.status==200){
          wiringLandDetail = await (wiringLandDetail).json();
          this.setState({wiringLandDetail}); 
        }else{
          await Swal.fire(
            'Error!',
            "Wiring Land Detail doesn't exist",
            'error'
          )
        }
        let pcesthtt = await fetch(`/pcesthtt/findByIdEstimateNoAndIdRevNo?estimateNo=${this.state.idGroup.estimationNo}&revNo=1`);
        if(pcesthtt.status==200){
          pcesthtt=await (pcesthtt).json();
          this.setState({pcesthtt},()=>console.log(this.state.pcesthtt));
        }else{
          await Swal.fire(
            'Error!',
            "Header details doesn't exist",
            'error',
          
          )
        }
        
         this.setState({searched:true});

      
      }else{
        this.clearForm();
        Swal.fire(
          'Error!',
          "Estimation number doesn't exist",
          'error'
        )
      }
    }else{
      this.clearForm();
    }
  }
  

  

  async handleSubmit(event) {
   
    // event.preventDefault();
    // const message= await Swal.fire({
    //   title: 'Are you sure?',
    //   // text: "You won't be able to revert this!",
    //   type: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Yes, save it!'
    // })
    // if(message.value){
    //   const {labour} = this.state;

    //   await fetch('/labour/add', {
    //     method: 'POST',
    //     headers: {
    //       'Accept': 'application/json',
    //        'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(labour),
    //   });

    //   await Swal.fire(
    //     'Saved!',
    //     'Labour has been saved.',
    //     'success'
    //   )
    //   this.props.history.push({pathname:'/labour/findByDeptId',state:{year:(labour.id.year),currentPage:(this.props.match.params.currentPage)}});
    // }
  }

  clearForm=()=>{
    this.setState({
        idGroup:this.emptyIdGroup,
        otherDetails:this.emptyOtherDetails,
        applicant:this.emptyApplicant,
        application:this.emptyApplication,
        wiringLandDetail:this.emptyWiringLandDetail,
        pcesthtt:this.emptyPcesthtt,
        searched:false
    })
  }

  render() {
    const {idGroup,applicant, application, wiringLandDetail,pcesthtt,estimateNoList,searched,otherDetails}=this.state;

    return <div>
{/* <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
        <div className="padding">
        <a className="path" href="/home">  Home  </a> |
        <a className="path" href="/home">  Master  </a> |
        <a className="path" href="/labour/findByDeptId">   Labour  </a> |
        <a className="path2" href="/labour/findByDeptId">   Edit Labour Activity Rates</a> 
        </div>
     */}

      <Container>
        <br></br>
        <h1 align="center">Create Job </h1>
        <h3>Estimate Detail</h3>
        <Form onSubmit={this.handleSubmit}>
        <div className="form-group row">
          <div className="col-sm-2">Cost Center</div>
          <div className="col-sm-4">: {idGroup.costCenter}</div>
        </div>
        <h5>Application Details</h5>       
        <div className="form-group row">
          <div className="col-sm-2">Applicant Name</div>
          <div className="col-sm-4">: {applicant.firstName} {applicant.lastName} </div>
          <div className="col-sm-2">Application Date</div>
          <div className="col-sm-4">: {application.submitDate.slice(0,10)}</div>
        </div>
        <div className="form-group row">
          <div className="col-sm-2">Address</div>
          <div className="col-sm-4">: {wiringLandDetail.serviceStreetAddress}, {wiringLandDetail.serviceSuburb}, {wiringLandDetail.serviceCity}</div>
          <div className="col-sm-2">Remarks</div>
          <div className="col-sm-4">: {application.description}</div>
        </div>
        <div className="form-group row">
          <div className="col-sm-2">assesment Number</div>
          <div className="col-sm-4">: {wiringLandDetail.assessmentNo}</div>
          <div className="col-sm-2">Neighbours Acc. No</div>
          <div className="col-sm-4">: {wiringLandDetail.neighboursAccNo}</div>
        </div>
        <h5>Connection Details</h5>
        <div className="form-group row">
          <div className="col-sm-2">Phase</div>
          <div className="col-sm-4">: {wiringLandDetail.phase}</div>
          <div className="col-sm-2">Connection Type</div>
          <div className="col-sm-4">: {wiringLandDetail.connectionType}</div>
        </div>
        <div className="form-group row">
          <div className="col-sm-2">Tariff Category Code</div>
          <div className="col-sm-4">: {wiringLandDetail.tariffCatCode}</div>
          <div className="col-sm-2">Tariff Code</div>
          <div className="col-sm-4">: {wiringLandDetail.tariffCode}</div>
        </div>
        <div className="form-group row">
          <div className="col-sm-2">Job Description</div>
          <div className="col-sm-4">: </div>
         
        </div>
        <div className="form-group row">
          <div className="col-sm-2">Category Code</div>
          <div className="col-sm-4">: {pcesthtt.catCd}</div>
          <div className="col-sm-2">Fund Source</div>
          <div className="col-sm-4">: {pcesthtt.fundSource}</div>
        </div>
        <div className="form-group row">
          <label for="cscNo" className="col-sm-2 col-form-label">CSC No</label>
          <div className="col-sm-3">
            <Input type="text" name="cscNo" id="cscNo" value={otherDetails.cscNo} onInput={this.toInputUppercase}
                   onChange={this.handleChange} autoComplete="cscNo" required/>
          </div>
          <div className="col-sm-1"></div>
          <label for="suggestedcscNo" className="col-sm-2 col-form-label">Suggested CSC No</label>
          <div className="col-sm-3">
            <Input type="text" name="suggestedcscNo" id="suggestedcscNo" value={otherDetails.suggestedScsNo} onInput={this.toInputUppercase}
                   onChange={this.handleChange} autoComplete="suggestedcscNo" required/>
          </div>
          
        </div>
        <div className="form-group row">
          <label for="refNo" className="col-sm-2 col-form-label">Reference No (optional)</label>
          <div className="col-sm-3">
            <Input type="text" name="refNo" id="refNo" value={otherDetails.refNo} onInput={this.toInputUppercase}
                   onChange={this.handleChange} autoComplete="refNo" required/>
          </div>
        </div>
        <div className="form-group row">
            <label for="estimationNo" className="col-sm-2 col-form-label">Estimation Number</label>
            <div className="col-sm-3">
                <select className="form-control" name="estimationNo" id="estimationNo" value={idGroup.estimationNo}
                    onChange={this.handleChangeIdGroup} required>
                      <option value="">Please Select</option>
                    {
                        (estimateNoList && estimateNoList.length>0) && estimateNoList.map((number)=>{
                            return(<option value={number}>{number}</option>);
                        })
                    }
                    
                </select>
            </div>
        </div>   
        <div className="form-group row">
          <div className="col-sm-2">
          <Button color="primary" type="submit" disabled={!searched}>Genarate Job No</Button>
          </div>
          <div className="col-sm-3">
            <Input type="text" name="jobNo" id="jobNo" value={otherDetails.jobNo} onInput={this.toInputUppercase}
                   onChange={this.handleChange} autoComplete="jobNo" required/>
          </div>
        </div>
       
      
        
           
        {/* <FormGroup>
          {' '}
          <Button color="secondary" tag={Link} to="/labour/findByDeptId">Cancel</Button>
        </FormGroup> */}
        </Form>
      </Container>
    </div>
  }
}

export default withRouter(JobCreate);