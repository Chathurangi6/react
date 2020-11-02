import React from 'react';
import { Button,ButtonGroup, Container, Form, FormGroup, Input, Label, Table } from 'reactstrap';
import Swal from 'sweetalert2';
import '../../css/Estimation.css'
import '../../css/Path.css';
import { Helmet } from 'react-helmet'
const TITLE = 'Service Estimate Details'
class ServiceEstimateView extends React.Component {

  emptyIdGroup={
    estimationNo:'',
    tempId:'',
    costCenter:sessionStorage.getItem('costCenterNo'),
    area:'',
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

  emptyServiceEstimate = {
    id:{
      applicationNo:'',
      deptId:''
    },
    serviceLength:'',
    distanceToSp:'',
    bareconType:'',
    sin:'',
    bareconLength:'',
    noOfSpans:'',
    insideLength:'',
    poleno:'',
    totalLength:'',
    substation:'',
    conversionLength:'',
    distanceFromSs:'',
    conversionLength2p:'',
    transformerCapacity:'',
    secondCircuitLength:'',
    transformerLoad:'',
    wiringType:'Over Head',
    transformerPeakLoad:'',
    loopCable:'No',
    feederControlType:'',
    cableType:'162C,16mm2/2C',
    phase:'Red',
    isServiceConversion:'',
    isStandardVc:'Yes'
  }

  emptyPole={
    matCd:'',
    poleType:'INTERMEDIATE',
    fromConductor:'SERVICE',
    toConductor:'SERVICE',
    pointType:'NEW',
    matQty:''
  }

  emptyStrut={
    matCd:'',
    matQty:''
  }

  emptyStay={
    matCd:'B0805 - Wire stay G.S.  7/2.65 mm (Grade 700)',
    stayType:'NORMAL',
    matQty:''
  }
    constructor(props) {
      super(props)
      this.state = {
        currentStep: 1,
        isActive:[],
        isCompleted:[],
        applicant:this.emptyApplicant,
        application:this.emptyApplication,
        wiringLandDetail:this.emptyWiringLandDetail,
        serviceEstimate:this.emptyServiceEstimate,
        pole:this.emptyPole,
        strut:this.emptyStrut,
        stay:this.emptyStay,
        idGroup:this.emptyIdGroup,
        estimateNoList:[],
        matCds:[],
        poleList:[],
        strutList:[],
        stayList:[],
        searched:false 
      };
    //   this.handleChangeServiceEstimate = this.handleChangeServiceEstimate.bind(this);
    //   this.handleChangePole=this.handleChangePole.bind(this);
    //   this.handleChangeStrut=this.handleChangeStrut.bind(this);
    //   this.handleChangeStay=this.handleChangeStay.bind(this);
      this.handleChangeIdGroup=this.handleChangeIdGroup.bind(this);
      this.toInputUppercase=this.toInputUppercase.bind(this);
      this.getData=this.getData.bind(this);
    //   this.handleSubmit=this.handleSubmit.bind(this);
      this.goToStep=this.goToStep.bind(this);
      this.setPolesToTable=this.setPolesToTable.bind(this);
      this.setStrutsToTable=this.setStrutsToTable.bind(this);
      this.setStaysToTable=this.setStaysToTable.bind(this);
      this.deleteServiceEstimate=this.deleteServiceEstimate.bind(this); 
    }

    async componentDidMount() {
    
      const estimateNoList=["01","02","03","04","05"];
    
      this.setState({estimateNoList});
      let isActive=this.state.isActive;
      isActive[0]='active';
      this.setState({isActive});

      await fetch(`/spdppolm/findMatCdByIdDeptId?deptId=${this.state.idGroup.costCenter}`)
      .then(response => response.json())
      .then(data => this.setState({matCds: data}));
      console.log(this.state.matCds)
    
  }
  
  handleChangeIdGroup(event) {
    this.clearForm();
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let idGroup = {...this.state.idGroup};
    idGroup[name] = value;
    if(idGroup.estimationNo.length!=18){
      event.target.setCustomValidity('Please lengthen the estimate no to 18 characters');
   
    }else{
      event.target.setCustomValidity('');
      
    }
    this.setState({idGroup});
    
  }
  toInputUppercase(e) {
    e.target.value = ("" + e.target.value).toUpperCase();
  };

  async getData(e){
    e.preventDefault();
    if(this.state.idGroup.estimationNo){
      let application = await fetch(`/application/findByApplicationNo?applicationNo=${this.state.idGroup.estimationNo}`);
      // console.log(application);
      if(application.status==200){
        application = await (application).json();

        let applicant = await fetch(`/applicant/findByIdNo?idNo=${application.idNo}`);

        let wiringLandDetail = await fetch(`/wiringLandDetail/find?applicationId=${application.id.applicationId}&deptId=${this.state.idGroup.costCenter}`);
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
            "Wiring Land Details doesn't exist",
            'error'
          )
        }
      

        let serviceEstimate = await fetch(`/serEstimate/findByIdApplicationNoAndIdDeptId?applicationNo=${this.state.idGroup.estimationNo}&deptId=${this.state.idGroup.costCenter}`);
        if(serviceEstimate.status==200){
          serviceEstimate = await (serviceEstimate).json();
          this.setState({serviceEstimate});
        }else{
          await Swal.fire(
            'Error!',
            "Sketch doesn't exist",
            'error',

          )
        }

        const poleList = await (await fetch(`/poleEstimate/findByIdApplicationNoAndIdDeptId?applicationNo=${this.state.idGroup.estimationNo}&deptId=${this.state.idGroup.costCenter}`)).json();
        this.setPolesToTable(poleList);

        const strutList = await (await fetch(`/strutEstimate/findByIdApplicationNoAndIdDeptId?applicationNo=${this.state.idGroup.estimationNo}&deptId=${this.state.idGroup.costCenter}`)).json();
        this.setStrutsToTable(strutList);

        const stayList = await (await fetch(`/stayEstimate/findByIdApplicationNoAndIdDeptId?applicationNo=${this.state.idGroup.estimationNo}&deptId=${this.state.idGroup.costCenter}`)).json();
        this.setStaysToTable(stayList);

        this.setState({searched:true});

        let isCompleted=this.state.isCompleted;
        isCompleted=['completed','completed','completed','completed','completed','completed',];
        this.setState({isCompleted});

      }else{
        this.clearForm();
        Swal.fire(
          'Error!',
          "Estimation number doesn't exist",
          'error'
        )
      }
    }
  }

  async deleteServiceEstimate(){
    const message= await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })
    if(message.value){
      // const response =await fetch(`/serviceEstimate/delete/${this.state.idGroup.estimationNo}/${this.state.idGroup.costCenter}`, {
      //   method: 'GET',
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-Type': 'application/json'
      //   }
      // })
      const response = await fetch(`/serviceEstimate/delete?applicationNo=${this.state.idGroup.estimationNo}&deptId=${this.state.idGroup.costCenter}`);
      if(response.status==200){
        this.clearForm();
        Swal.fire(
            'Deleted!',
            "Service estimate has been deleted",
            'success'
          )
      }else{
        Swal.fire(
          'Error!',
          "Service estimate has not been deleted",
          'error'
        )
      }
    }
  }

  setPolesToTable(list){
    let poleList=[]
    for(var i=0;i<list.length;i++){
      const pole={
        matCd:list[i].id.matCd,
        poleType:list[i].id.poleType,
        fromConductor:list[i].id.fromConductor,
        toConductor:list[i].id.toConductor,
        pointType:list[i].id.pointType,
        matQty:list[i].matQty
      }
      poleList.push(pole);
    }
    this.setState({poleList});
  }

  setStrutsToTable(list){
    let strutList=[]
    for(var i=0;i<list.length;i++){
      const strut={
        matCd:list[i].id.matCd,
        matQty:list[i].matQty
      }
      strutList.push(strut);
    }
    this.setState({strutList});
  }

  setStaysToTable(list){
    let stayList=[]
    for(var i=0;i<list.length;i++){
      const stay={
        matCd:list[i].id.matCd,
        stayType:list[i].id.stayType,
        matQty:list[i].matQty
      }
      stayList.push(stay);
    }
    this.setState({stayList});
  }

  clearForm = () =>{
    let isActive=this.state.isActive;
    isActive=[];
    isActive[0]='active';

    this.setState({
      currentStep: 1,
      isActive:isActive,
      isCompleted:[],
      applicant:this.emptyApplicant,
      application:this.emptyApplication,
      wiringLandDetail:this.emptyWiringLandDetail,
      serviceEstimate:this.emptyServiceEstimate,
      pole:this.emptyPole,
      strut:this.emptyStrut,
      stay:this.emptyStay,
      idGroup:this.emptyIdGroup,
      // estimateNoList:[],
      // matCds:[],
      poleList:[],
      strutList:[],
      stayList:[],
      searched:false 
    })
  }
    
    nextStep = () => {
      let currentStep = this.state.currentStep

      let isCompleted=this.state.isCompleted;
      isCompleted[currentStep-1]='completed';
      this.setState({isCompleted});

      currentStep = currentStep >= 5? 6: currentStep + 1
      this.setState({currentStep: currentStep},()=>this.setActive())
    }
      
    prevStep = () => {
      let currentStep = this.state.currentStep
      currentStep = currentStep <= 1? 1: currentStep - 1
      this.setState({currentStep: currentStep},()=>this.setActive())
    }
  
    setActive=()=>{
      let currentStep = this.state.currentStep
      let isActive=this.state.isActive;
      isActive=[];
      isActive[currentStep-1]='active'
      this.setState({isActive});
    }
    
 
    goToStep(num){
      
      let currentStep=this.state.currentStep;
      let isCompleted=this.state.isCompleted;
      if(num==1){
        currentStep=num;
        this.setState({currentStep},()=>this.setActive());

      }else if(isCompleted[num-2]=='completed'){
        currentStep=num;
        this.setState({currentStep},()=>this.setActive());
      }
      
    }

    
   render() {    
      return (
        <React.Fragment>
      <Helmet>
                  <title>
                {TITLE}
                  </title>
                </Helmet>         
                 <div className="padding">
        <a className="path" href="/home"> Home </a> |
        <a className="path" href="/home"> Estimation </a> |
        <a className="path2" href="/serviceEstimate/view"> Service Estimate Details</a>
        </div>
          <Container>
        <h1 align="center">Service Estimate</h1>
        <br></br>
        <ul id="progressbar">
            <li className={this.state.isCompleted[0]+' '+this.state.isActive[0]} onClick={()=>this.goToStep(1)}>Applicant Details</li>
            <li className={this.state.isCompleted[1]+' '+this.state.isActive[1]} onClick={()=>this.goToStep(2)}>Connection Details</li>
            <li className={this.state.isCompleted[2]+' '+this.state.isActive[2]} onClick={()=>this.goToStep(3)}>Sketch</li>
            <li className={this.state.isCompleted[3]+' '+this.state.isActive[3]} onClick={()=>this.goToStep(4)}>Poles</li>
            <li className={this.state.isCompleted[4]+' '+this.state.isActive[4]} onClick={()=>this.goToStep(5)}>Struts</li>
            <li className={this.state.isCompleted[5]+' '+this.state.isActive[5]} onClick={()=>this.goToStep(6)}>Stays</li>
        </ul>
        <div className="row">
            <div className="col-sm-4"></div>
            <div className="col-sm-8">
            <button className="btn btn-danger float-right" type="button" style={{marginBottom:'10px'}} onClick={this.deleteServiceEstimate} disabled={!this.state.searched}>Delete Service Estimate</button>
            </div>
          </div>
          <div className="formBorder multiStepForm">
          <Step1 
            currentStep={this.state.currentStep} 
            handleChange={this.handleChangeIdGroup}
            toInputUppercase={this.toInputUppercase}
            getData={this.getData}
            idGroup={this.state.idGroup}
            applicant={this.state.applicant}
            application={this.state.application}
            wiringLandDetail={this.state.wiringLandDetail}
            estimateNoList={this.state.estimateNoList}
            nextStep={this.nextStep}
            searched={this.state.searched}
          />
          <Step2 
            currentStep={this.state.currentStep} 
            wiringLandDetail={this.state.wiringLandDetail}
            serviceEstimate={this.state.serviceEstimate}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
          />
          <Step3 
            currentStep={this.state.currentStep} 
            handleChange={this.handleChangeServiceEstimate}
            serviceEstimate={this.state.serviceEstimate}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
          />
          <Step4 
            currentStep={this.state.currentStep} 
            poleList={this.state.poleList}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
          />
          <Step5 
            currentStep={this.state.currentStep} 
            strutList={this.state.strutList}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
          />
          <Step6 
            currentStep={this.state.currentStep} 
            stayList={this.state.stayList}
            prevStep={this.prevStep}
            deleteServiceEstimate={this.deleteServiceEstimate}
          />
          </div>
          
        </Container>
        </React.Fragment>
      );
    }
  }
  
  function Step1(props) {
    const {handleChange,idGroup,getData,applicant, application, wiringLandDetail,estimateNoList,nextStep,searched,toInputUppercase}=props;
    if (props.currentStep !== 1) {
      return null
    } 
    return(
      <div>
   
      <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
        <Form onSubmit={getData}>
        <div className="form-group row">
          <label for="estimationNo" className="col-sm-2 col-form-label">Estimation Number</label>
          <div className="col-sm-3">
            <Input type="text" name="estimationNo" id="estimationNo" value={idGroup.estimationNo} onInput={toInputUppercase}
                   minLength="18" maxLength="18" onChange={handleChange} autoComplete="estimationNo" required/>
          </div>
           <div className="col-sm-3">
          <button className="btn btn-primary" type="submit">Search</button>
          </div>
          {/* <label for="tempId" className="col-sm-3 col-form-label">Temp Id</label> */}
          {/* <div className="col-sm-3 col-form-label">Temp Id : {idGroup.estimationNo}</div> */}
          <div className="col-sm-2 col-form-label">Cost Center : {idGroup.costCenter}</div>
          <div className="col-sm-2 col-form-label">Area :</div>
        </div>
        </Form>
        <hr className="line"></hr>
        <h4>Applicant Details</h4>
        <hr className="line"></hr>
        <br></br>
        <div className="form-group row">
          <div className="col-sm-2">Applicant Name</div>
          <div className="col-sm-4">: {applicant.firstName} {applicant.lastName} </div>
          <div className="col-sm-2">Application Date</div>
          <div className="col-sm-4">: {application.submitDate.slice(0,10)}</div>
        </div>
        <div className="form-group row">
          <div className="col-sm-2">NIC/Passport No</div>
          <div className="col-sm-4">: {applicant.idNo}</div>
          <div className="col-sm-2">Neighbours Acc. No</div>
          <div className="col-sm-4">: {wiringLandDetail.neighboursAccNo}</div>
        </div>
        <div className="form-group row">
          <div className="col-sm-2">Address</div>
          <div className="col-sm-4">: {wiringLandDetail.serviceStreetAddress}, {wiringLandDetail.serviceSuburb}, {wiringLandDetail.serviceCity}</div>
          <div className="col-sm-2">assesment Number</div>
          <div className="col-sm-4">: {wiringLandDetail.assessmentNo}</div>
        </div>
        <div className="form-group row">
          <div className="col-sm-2">Telephone No</div>
          <div className="col-sm-4">: {applicant.telephoneNo}</div>
          <div className="col-sm-2">Mobile No</div>
          <div className="col-sm-4">: {applicant.mobileNo}</div>
        </div>
        <div className="form-group row">
          <label for="cebEmployee" className="col-sm-2 col-form-label">CEB Employee</label>
          <div className="col-sm-4 col-form-label">
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="cebEmployee" id="yes" value="Yes"
                    checked={applicant.cebEmployee==="Yes"}  disabled/>
              <label className="form-check-label" for="yes">Yes</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="cebEmployee" id="no" value="No"
                     checked={applicant.cebEmployee==="No"}  disabled/>
              <label className="form-check-label" for="no">No</label>
            </div>
          </div>
          <div className="col-sm-2">Remarks</div>
          <div className="col-sm-4">: {application.description}</div>
        </div>
        <br></br>
        <button className="btn btn-primary float-right" type="button" onClick={nextStep} disabled={!searched}>Next</button>
        <br></br>
        <br></br>
        
    </div>
    );
  }
  
  function Step2(props) {
    const {wiringLandDetail,serviceEstimate,nextStep,prevStep}=props;
    if (props.currentStep !== 2) {
      return null
    } 
    return(
      <div>
        <h4>Connection Details</h4>
        <hr className="line"></hr>
        <br></br>  
        <Form onSubmit={nextStep}>
        <div className="form-group row">
          <div className="col-sm-3">Phase</div>
          <div className="col-sm-3">: {wiringLandDetail.phase}</div>
          <div className="col-sm-3">Tariff Category</div>
          <div className="col-sm-3">: {wiringLandDetail.tariffCatCode}</div>
        </div>
        <div className="form-group row">
          <div className="col-sm-3">Connection Type</div>
          <div className="col-sm-3">: {wiringLandDetail.connectionType}</div>
          <div className="col-sm-3">Tariff</div>
          <div className="col-sm-3">: {wiringLandDetail.tariffCode}</div>
        </div>
        <div className="form-group row">
          <label for="wiringType" className="col-sm-3 col-form-label">Wiring Type</label>
          <div className="col-sm-3 col-form-label">
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="wiringType" id="overHead" value="Over Head"
                     checked={serviceEstimate.wiringType==="Over Head"}  disabled/>
              <label className="form-check-label" for="overHead">Over Head</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="wiringType" id="underGround" value="Under Ground"
                     checked={serviceEstimate.wiringType==="Under Ground"}  disabled/>
              <label className="form-check-label" for="underGround">Under Ground</label>
            </div>
          </div>
          <label for="cableType" className="col-sm-3 col-form-label">Cable Type</label>
          <div className="col-sm-3">
            <select className="form-control" name="cableType" id="cableType" value={serviceEstimate.cableType}
                     disabled>
              <option value="162C,16mm2/2C">162C,16mm2/2C</option>
              <option value="16XPLE,16mm2XPLE">16XPLE,16mm2XPLE</option>
              <option value="35XPLE,35mm2XPLE">35XPLE,35mm2XPLE</option>
              <option value="70XPLE,70mm2XPLE">70XPLE,70mm2XPLE</option>
              <option value="95XPLE,95mm2XPLE">95XPLE,95mm2XPLE</option>
            </select>
          </div>
        </div>
        <div className="form-group row">
          <label for="loopCable" className="col-sm-3 col-form-label">Is Loop Service</label>
          <div className="col-sm-3 col-form-label">
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="loopCable" id="yes" value="Yes"
                     checked={serviceEstimate.loopCable==="Yes"}  disabled/>
              <label className="form-check-label" for="yes">Yes</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="loopCable" id="no" value="No"
                     checked={serviceEstimate.loopCable==="No"}  disabled/>
              <label className="form-check-label" for="no">No</label>
            </div>
          </div>
        </div>
        <div className="form-group row">
          <label for="isServiceConversion" className="col-sm-3 col-form-label">Is Service Conversion</label>
          <div className="col-sm-9 col-form-label">
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="isServiceConversion" id="no" value="No"
                     checked={serviceEstimate.isServiceConversion==="No"}  disabled/>
              <label className="form-check-label" for="no">No</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="isServiceConversion" id="3p-30a" value="3P-30A"
                     checked={serviceEstimate.isServiceConversion==="3P-30A"}  disabled/>
              <label className="form-check-label" for="3p-30a">3P-30A</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="isServiceConversion" id="3p-60a" value="3P-60A"
                     checked={serviceEstimate.isServiceConversion==="3P-60A"}  disabled/>
              <label className="form-check-label" for="3p-60a">3P-60A</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="isServiceConversion" id="3p-30ConRate" value="3P-30 Con Rate"
                     checked={serviceEstimate.isServiceConversion==="3P-30 Con Rate"}  disabled/>
              <label className="form-check-label" for="3p-30ConRate">3P-30 Con Rate</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="isServiceConversion" id="3p-60ConRate" value="3P-60 Con Rate"
                     checked={serviceEstimate.isServiceConversion==="3P-60 Con Rate"}  disabled/>
              <label className="form-check-label" for="3p-60ConRate">3P-60 Con Rate</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="isServiceConversion" id="30-60ConRate" value="30-60 Con Rate"
                     checked={serviceEstimate.isServiceConversion==="30-60 Con Rate"}  disabled/>
              <label className="form-check-label" for="30-60ConRate">30-60 Con Rate</label>
            </div>
          </div>
        </div>
        <div className="form-group row">
          <label for="isStandardVc" className="col-sm-3 col-form-label">Is Variable Cost Calculate According to Stantards?</label>
          <div className="col-sm-3 col-form-label">
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="isStandardVc" id="yes" value="Yes"
                     checked={serviceEstimate.isStandardVc==="Yes"}  disabled/>
              <label className="form-check-label" for="yes">Yes</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="isStandardVc" id="no" value="No"
                     checked={serviceEstimate.isStandardVc==="No"}  disabled/>
              <label className="form-check-label" for="no">No</label>
            </div>
          </div>
        </div>
        <br></br>
        <button className="btn btn-secondary" type="button" onClick={prevStep}>Previous</button>
        <button className="btn btn-primary float-right" type="submit" >Next</button>
        </Form>
      </div>
    );
  }
  
  function Step3(props) {
    const {handleChange, serviceEstimate,nextStep,prevStep}=props;
    if (props.currentStep !== 3) {
      return null
    } 
    return(
      <React.Fragment>
        <h4>Sketch</h4>
        <hr className="line"></hr>
        <br></br>
        <Form onSubmit={nextStep}>
        <div className="form-group row">
          <label for="serviceLength" className="col-sm-3 col-form-label">Service Wire Length(m)</label>
          <div className="col-sm-3">
            <Input type="number" name="serviceLength" id="serviceLength" value={serviceEstimate.serviceLength}
                   min="0" step=".01" readOnly/>
          </div>
          <label for="distanceToSp" className="col-sm-3 col-form-label">Distance to Service Place(Km)</label>
          <div className="col-sm-3">
            <Input type="number" name="distanceToSp" id="distanceToSp"  value={serviceEstimate.distanceToSp} 
                   min="0" step=".01" readOnly/>
          </div>
        </div>
        <div className="form-group row">
          <label for="bareconType" className="col-sm-3 col-form-label">Conductor Type</label>
          <div className="col-sm-3 col-form-label">
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="bareconType" id="ABC" value="ABC"
                     checked={serviceEstimate.bareconType==="ABC"}  disabled/>
              <label className="form-check-label" for="ABC">ABC 3&#215;70+54.6mm<sup>2</sup></label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="bareconType" id="ABC2" value="ABC2"
                     checked={serviceEstimate.bareconType==="ABC2"}  disabled/>
              <label className="form-check-label" for="ABC2">ABC 3&#215;95+70mm<sup>2</sup></label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="bareconType" id="FLY" value="FLY"
                     checked={serviceEstimate.bareconType==="FLY"}  disabled/>
              <label className="form-check-label" for="FLY">FLY</label>
            </div>
          </div>
          <label for="sin" className="col-sm-3 col-form-label">SIN Number</label>
          <div className="col-sm-3">
            <Input type="text" name="sin" id="sin" value={serviceEstimate.sin} 
                    autoComplete="sin" readOnly/>
          </div>
        </div>
        <div className="form-group row">
          <label for="bareconLength" className="col-sm-3 col-form-label">Conductor Wire Length(m)</label>
          <div className="col-sm-3">
            <Input type="number" name="bareconLength" id="bareconLength" value={serviceEstimate.bareconLength}
                   min="0" step=".01"  readOnly/>
          </div>
          <label for="noOfSpans" className="col-sm-3 col-form-label">No of Spans(For Service Length)</label>
          <div className="col-sm-3">
            <Input type="number" name="noOfSpans" id="noOfSpans" value={serviceEstimate.noOfSpans} 
                   min="0" step=".01" readOnly/>
          </div>
        </div>
        <div className="form-group row">
          <label for="insideLength" className="col-sm-3 col-form-label">Length Inside the Premises(m)</label>
          <div className="col-sm-3">
            <Input type="number" name="insideLength" id="insideLength" value={serviceEstimate.insideLength}
                   min="0" step=".01" readOnly/>
          </div>
          <label for="poleno" className="col-sm-3 col-form-label">Pole No</label>
          <div className="col-sm-3">
            <Input type="number" name="poleno" id="poleno" value={serviceEstimate.poleno} 
                  min="0" max="99" readOnly/>
          </div>
        </div>
        <div className="form-group row">
          <label for="totalLength" className="col-sm-3 col-form-label">Total Line Length(m)</label>
          <div className="col-sm-3">
            <Input type="number" name="totalLength" id="totalLength" value={serviceEstimate.totalLength=(Number(serviceEstimate.serviceLength)+Number(serviceEstimate.bareconLength))}
                   min="0" step=".01" readOnly/>
          </div>
          <label for="substation" className="col-sm-3 col-form-label">Sub Station</label>
          <div className="col-sm-3">
            <Input type="text" name="substation" id="substation" value={serviceEstimate.substation} 
                   readOnly/>
          </div>
        </div>
        <div className="form-group row">
          <label for="conversionLength" className="col-sm-3 col-form-label">1P-3P Line Conversion Length(m)</label>
          <div className="col-sm-3">
            <Input type="number" name="conversionLength" id="conversionLength" value={serviceEstimate.conversionLength}
                   min="0" step=".01" readOnly/>
          </div>
          <label for="distanceFromSs" className="col-sm-3 col-form-label">Distance From S/S</label>
          <div className="col-sm-3">
            <Input type="number" name="distanceFromSs" id="distanceFromSs" value={serviceEstimate.distanceFromSs} 
                   min="0" step=".01" readOnly/>
          </div>
        </div>
        <div className="form-group row">
          <label for="conversionLength2p" className="col-sm-3 col-form-label">2P-3P Line Conversion Length(m)</label>
          <div className="col-sm-3">
            <Input type="number" name="conversionLength2p" id="conversionLength2p" value={serviceEstimate.conversionLength2p}
                   min="0" step=".01" readOnly/>
          </div>
          <label for="transformerCapacity" className="col-sm-3 col-form-label">Transformer Capacity(KVA)</label>
          <div className="col-sm-3">
            <Input type="number" name="transformerCapacity" id="transformerCapacity" value={serviceEstimate.transformerCapacity} 
                   min="0" step=".01" readOnly/>
          </div>
        </div>
        <div className="form-group row">
          <label for="secondCircuitLength" className="col-sm-3 col-form-label">Second Circuit Length(m)</label>
          <div className="col-sm-3">
            <Input type="number" name="secondCircuitLength" id="secondCircuitLength" value={serviceEstimate.secondCircuitLength}
                   min="0" step=".01" readOnly/>
          </div>
          <label for="transformerLoad" className="col-sm-3 col-form-label">Transformer Load(KVA)</label>
          <div className="col-sm-3">
            <Input type="number" name="transformerLoad" id="transformerLoad" value={serviceEstimate.transformerLoad} 
                   min="0" step=".01" readOnly/>
          </div>
        </div>
        <div className="form-group row">        
          <label for="transformerPeakLoad" className="col-sm-3 col-form-label">Transformer Peak Load(KVA)</label>
          <div className="col-sm-3">
            <Input type="number" name="transformerPeakLoad" id="transformerPeakLoad" value={serviceEstimate.transformerPeakLoad} 
                   min="0" step=".01" readOnly/>
          </div>
          <label for="feederControlType" className="col-sm-3 col-form-label">Feeder Control Type</label>
          <div className="col-sm-3">
            <Input type="text" name="feederControlType" id="feederControlType" value={serviceEstimate.feederControlType} 
                   readOnly/>
          </div>
        </div>
        <div className="form-group row">       
          <label for="phase" className="col-sm-3 col-form-label">Phase</label>
          <div className="col-sm-3">
            <select className="form-control" name="phase" id="phase" value={serviceEstimate.phase}
                     disabled>
              <option value="Red">Red</option>
              <option value="Yellow">Yellow</option>
              <option value="Blue">Blue</option>
            </select>
          </div>
        </div>
        <br></br>
        <button className="btn btn-secondary" type="button" onClick={prevStep}>Previous</button>
        <button className="btn btn-primary float-right" type="submit">Next</button>
        </Form>
      </React.Fragment>
    );
  }


  class Step4 extends React.Component {
    constructor(props) {
      super(props)
    
    }
    
    render() {    
      const {currentStep,poleList,nextStep,prevStep}=this.props;
      // const {poleList}=this.state;

      const poleTable = poleList.map(x => {
      
        return <tr >
          <td>{x.matCd}</td>
          <td>{x.poleType}</td>
          <td>{x.fromConductor}</td>
          <td>{x.toConductor}</td>
          <td>{x.pointType}</td>
          <td>{x.matQty}</td>
        </tr>
      });
      if (currentStep !== 4) {
        return null
      } 
      return (
        <React.Fragment>
        <h4>Poles</h4>
        <hr className="line"></hr>
       <br></br>
        <Table className="mt-4 table-bordered">
            <thead>
            <tr>
              <th>Pole</th>
              <th>Pole Type</th>
              <th>From Conductor</th>
              <th>To Conductor</th>
              <th>Pointer Type</th>
              <th>Quantity</th>
            </tr>
            </thead>
            <tbody>
              {poleTable}
            </tbody>
        </Table>
        <br></br>
        <button className="btn btn-secondary" type="button" onClick={prevStep}>Previous</button>
        <button className="btn btn-primary float-right" type="button" onClick={nextStep}>Next</button>
      </React.Fragment>
      );
    }  
  
  }

  
  class Step5 extends React.Component {
    constructor(props) {
      super(props)
    }
    
    render() {    
      const {currentStep,strutList,nextStep,prevStep}=this.props;

      const strutTable = strutList.map(strut => {
      
        return <tr >
          <td>{strut.matCd}</td>
          <td>{strut.matQty}</td>
          
        </tr>
      });
      if (currentStep !== 5) {
        return null
      } 
      return (
        <React.Fragment>
          <h4>Struts</h4>
          <hr className="line"></hr>
       <br></br>
        <Table className="mt-4 table-bordered">
            <thead>
            <tr>
              <th>Strut</th>
              <th>Quantity</th>
            </tr>
            </thead>
            <tbody>
              {strutTable}
            </tbody>
        </Table>
        <br></br>
        <button className="btn btn-secondary" type="button" onClick={prevStep}>Previous</button>
        <button className="btn btn-primary float-right" type="button" onClick={nextStep}>Next</button>
      </React.Fragment>
      );
    }  
  
  }


  class Step6 extends React.Component {
    constructor(props) {
      super(props)
    }  
    
    
    render() {    
      const {currentStep,stayList,prevStep,deleteServiceEstimate}=this.props;

      const stayTable = stayList.map(stay => {
      
        return <tr>
          <td>{stay.matCd}</td>
          <td>{stay.stayType}</td>
          <td>{stay.matQty}</td>
          
        </tr>
      });
      if (currentStep !== 6) {
        return null
      } 
      return (
        <React.Fragment>
          <h4>Stays</h4>
          <hr className="line"></hr>
       <br></br>
        <Table className="mt-4 table-bordered">
            <thead>
            <tr>
              <th>Stay</th>
              <th>Stay Type</th>
              <th>Quantity</th>
            </tr>
            </thead>
            <tbody>
              {stayTable}
            </tbody>
        </Table>
        <br></br>
        <button className="btn btn-secondary" type="button" onClick={prevStep}>Previous</button>
        {/* <button className="btn btn-danger float-right" type="button" onClick={deleteServiceEstimate}>Delete</button> */}
      </React.Fragment>
      );
    }  
  
  }
export default ServiceEstimateView;
