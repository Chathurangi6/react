import React from 'react';
import { Button,ButtonGroup, Container, Form, FormGroup, Input, Label, Table } from 'reactstrap';
import Swal from 'sweetalert2';
import '../../css/Estimation.css'
import '../../css/Path.css';
import { Helmet } from 'react-helmet'
const TITLE = 'Add Service Estimate'
class ServiceEstimateAdd extends React.Component {

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
        stayList:[] 
      };
      this.handleChangeServiceEstimate = this.handleChangeServiceEstimate.bind(this);
      this.handleChangePole=this.handleChangePole.bind(this);
      this.handleChangeStrut=this.handleChangeStrut.bind(this);
      this.handleChangeStay=this.handleChangeStay.bind(this);
      this.handleChangeIdGroup=this.handleChangeIdGroup.bind(this);
      this.getData=this.getData.bind(this);
      this.handleSubmit=this.handleSubmit.bind(this);
      this.goToStep=this.goToStep.bind(this);
    }

    async componentDidMount() {
    
      // const estimateNoList=["514.20/ENC/19/0001","514.20/ENC/19/0002","514.20/ENC/19/0090"];
    
      // this.setState({estimateNoList});

       await fetch(`/spestedy/findAppointmentIdByStatusAndDeptId?status=A&deptId=${this.state.idGroup.costCenter}`)
      .then(response => response.json())
      .then(data => this.setState({estimateNoList: data.sort()}));


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
    
    this.setState({idGroup},()=>this.getData());
    
}

  async getData(){
    if(this.state.idGroup.estimationNo){
      let application = await fetch(`/application/findByApplicationNo?applicationNo=${this.state.idGroup.estimationNo}`);
      if(application.status==200){
        application=await (application).json();

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
            "Wiring Land Detail doesn't exist",
            'error'
          )
        }
      
       
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
   
    handleChangeServiceEstimate(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let serviceEstimate = {...this.state.serviceEstimate};
        serviceEstimate[name] = value;
        serviceEstimate.id[name]=value;
        this.setState({serviceEstimate});
    }

    handleChangePole(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
      let pole = {...this.state.pole};
      pole[name] = value;
      this.setState({pole});

    }

    handleChangeStrut(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
      let strut = {...this.state.strut};
      strut[name] = value;
      this.setState({strut});

    }

    handleChangeStay(event) {
      const target = event.target;
      const value = target.value;
      const name = target.name;
      let stay = {...this.state.stay};
      stay[name] = value;
      this.setState({stay});

    }
  
   
     
    async handleSubmit(event){
      event.preventDefault()
      let isCompleted=this.state.isCompleted;
      isCompleted[5]='completed';
      this.setState({isCompleted});

      const message= await Swal.fire({
        title: 'Are you sure?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, save it!'
      })
      if(message.value){
      const { serviceEstimate,idGroup, poleList, strutList, stayList } = this.state;
      serviceEstimate.id.applicationNo=idGroup.estimationNo;
      serviceEstimate.id.deptId=idGroup.costCenter;

      let selectedPoles=[];
      let selectedStruts=[];
      let selectedStays=[];
      let selectedWires=[];

      for(var i=0;i<poleList.length;i++){
        const pole={
          id:{
            applicationNo:idGroup.estimationNo,
            deptId:idGroup.costCenter,
            matCd:poleList[i].matCd,
            poleType:poleList[i].poleType,
            fromConductor:poleList[i].fromConductor,
            toConductor:poleList[i].toConductor,
            pointType:poleList[i].pointType,
          },
          
          matQty:poleList[i].matQty
        }
        selectedPoles.push(pole);
      }
      for(var i=0;i<strutList.length;i++){
        const strut={
          id:{
            applicationNo:idGroup.estimationNo,
            deptId:idGroup.costCenter,
            matCd:strutList[i].matCd
          },
         
          matQty:strutList[i].matQty
        }
        selectedStruts.push(strut);

      }

      for(var i=0;i<stayList.length;i++){
        const stay={
          id:{
            applicationNo:idGroup.estimationNo,
            deptId:idGroup.costCenter,
            matCd:stayList[i].matCd,
            stayType:stayList[i].stayType
          },
          matQty:stayList[i].matQty
        }
        
       selectedStays.push(stay);

      }
      const wire1={
        id:{
          applicationNo:idGroup.estimationNo,
          deptId:idGroup.costCenter,
          matCd:'SERVICE'
        },
        wireLength:serviceEstimate.serviceLength,
        wireType:'SERVICE'
      }
      selectedWires.push(wire1);
      if(serviceEstimate.bareconLength!=''){
        const wire2={
          id:{
            applicationNo:idGroup.estimationNo,
            deptId:idGroup.costCenter,
            matCd:'BARE'
          },
          wireLength:serviceEstimate.bareconLength,
          wireType:serviceEstimate.bareconType
        }
        selectedWires.push(wire2);
      }
      const response=await fetch('/serviceEstimate/add', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
           'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          spserest:serviceEstimate,
          spsetpol:selectedPoles,
          spsetstu:selectedStruts,
          spsetsty:selectedStays,
          spsetwir:selectedWires}),
      });
      console.log(response.status);
      if(response.status==200){
        Swal.fire(
          'Saved!',
          'Service estimate has been saved.',
          'success'
        )
        // this.props.history.push('/serviceEstimate/add');
        //this.clearForm();

        // await fetch(`/spestedy/findAppointmentIdByStatusAndDeptId?status=A&deptId=${this.state.idGroup.costCenter}`)
        // .then(response => response.json())
        // .then(data => this.setState({estimateNoList: data.sort()}));
        //this.props.history.push("/serviceEstimate/edit/" + this.state.idGroup.estimationNo);
        this.props.history.push({pathname:'/serviceEstimate/edit/',state:{estimationNo:this.state.idGroup.estimationNo}});

      }else{
        Swal.fire(
          'Error!',
          'Service estimate has not been saved.',
          'error'
        )
      }
      console.log(serviceEstimate);
      console.log(selectedPoles);
      console.log(selectedStruts);
      console.log(selectedStays);
      console.log(selectedWires);
      
      }
     
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
        stayList:[] 
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
        <a className="path" href="/home">  Home  </a> |
        <a className="path" href="/home"> Service Estimation </a>|
        <a className="path2" href="/serviceEstimate/add"> Add Service Estimate </a>
        </div>
          <Container>
        <h1 align="center">New Service Estimate</h1>
        <br></br>
        <ul id="progressbar">
            <li className={this.state.isCompleted[0]+' '+this.state.isActive[0]} onClick={()=>this.goToStep(1)}>Applicant Details</li>
            <li className={this.state.isCompleted[1]+' '+this.state.isActive[1]} onClick={()=>this.goToStep(2)}>Connection Details</li>
            <li className={this.state.isCompleted[2]+' '+this.state.isActive[2]} onClick={()=>this.goToStep(3)}>Sketch</li>
            <li className={this.state.isCompleted[3]+' '+this.state.isActive[3]} onClick={()=>this.goToStep(4)}>Poles</li>
            <li className={this.state.isCompleted[4]+' '+this.state.isActive[4]} onClick={()=>this.goToStep(5)}>Struts</li>
            <li className={this.state.isCompleted[5]+' '+this.state.isActive[5]} onClick={()=>this.goToStep(6)}>Stays</li>
        </ul>
        
          <div className="formBorder">
          <Step1 
            currentStep={this.state.currentStep} 
            handleChange={this.handleChangeIdGroup}
            idGroup={this.state.idGroup}
            applicant={this.state.applicant}
            application={this.state.application}
            wiringLandDetail={this.state.wiringLandDetail}
            estimateNoList={this.state.estimateNoList}
            nextStep={this.nextStep}
          />
          <Step2 
            currentStep={this.state.currentStep} 
            wiringLandDetail={this.state.wiringLandDetail}
            handleChange={this.handleChangeServiceEstimate}
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
            handleChange={this.handleChangePole}
            poles={this.state.matCds}
            pole={this.state.pole}
            poleList={this.state.poleList}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
          />
          <Step5 
            currentStep={this.state.currentStep} 
            handleChange={this.handleChangeStrut}
            struts={this.state.matCds}
            strut={this.state.strut}
            strutList={this.state.strutList}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
          />
          <Step6 
            currentStep={this.state.currentStep} 
            handleChange={this.handleChangeStay}
            stay={this.state.stay}
            stayList={this.state.stayList}
            prevStep={this.prevStep}
            handleSubmit={this.handleSubmit}
          />
          </div>
          
        </Container>
        </React.Fragment>
      );
    }
  }
  
  function Step1(props) {
    const {handleChange,idGroup, applicant, application, wiringLandDetail,estimateNoList,nextStep}=props;
    if (props.currentStep !== 1) {
      return null
    } 
    return(
     <div>
      <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
   
        <Form onSubmit={nextStep}>
        <div className="form-group row">
          <label for="estimationNo" className="col-sm-2 col-form-label">Estimation Number</label>
          <div className="col-sm-3">
            <select className="form-control" name="estimationNo" id="estimationNo" value={idGroup.estimationNo}
                    onChange={handleChange} required>
               <option value="">Please Select</option>
                     
                     {
                         (estimateNoList && estimateNoList.length>0) && estimateNoList.map((number)=>{
                             return(<option value={number}>{number}</option>);
                         })
                     }
            </select>
          </div>
          {/* <label for="tempId" className="col-sm-3 col-form-label">Temp Id</label> */}
          <div className="col-sm-3 col-form-label">Temp Id : {idGroup.estimationNo}</div>
          <div className="col-sm-2 col-form-label">Cost Center : {idGroup.costCenter}</div>
          <div className="col-sm-2 col-form-label">Area :</div>
        </div>
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
        <button className="btn btn-primary float-right" type="submit">Next</button>
        <br></br>
        <br></br>
        </Form>
    </div>
    );
  }
  
  function Step2(props) {
    const {wiringLandDetail,handleChange, serviceEstimate,nextStep,prevStep}=props;
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
                     checked={serviceEstimate.wiringType==="Over Head"} onChange={handleChange} required/>
              <label className="form-check-label" for="overHead">Over Head</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="wiringType" id="underGround" value="Under Ground"
                     checked={serviceEstimate.wiringType==="Under Ground"} onChange={handleChange} />
              <label className="form-check-label" for="underGround">Under Ground</label>
            </div>
          </div>
          <label for="cableType" className="col-sm-3 col-form-label">Cable Type</label>
          <div className="col-sm-3">
            <select className="form-control" name="cableType" id="cableType" value={serviceEstimate.cableType}
                    onChange={handleChange} >
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
                     checked={serviceEstimate.loopCable==="Yes"} onChange={handleChange} required/>
              <label className="form-check-label" for="yes">Yes</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="loopCable" id="no" value="No"
                     checked={serviceEstimate.loopCable==="No"} onChange={handleChange} />
              <label className="form-check-label" for="no">No</label>
            </div>
          </div>
        </div>
        <div className="form-group row">
          <label for="isServiceConversion" className="col-sm-3 col-form-label">Is Service Conversion</label>
          <div className="col-sm-9 col-form-label">
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="isServiceConversion" id="no" value="No"
                     checked={serviceEstimate.isServiceConversion==="No"} onChange={handleChange} />
              <label className="form-check-label" for="no">No</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="isServiceConversion" id="3p-30a" value="3P-30A"
                     checked={serviceEstimate.isServiceConversion==="3P-30A"} onChange={handleChange} />
              <label className="form-check-label" for="3p-30a">3P-30A</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="isServiceConversion" id="3p-60a" value="3P-60A"
                     checked={serviceEstimate.isServiceConversion==="3P-60A"} onChange={handleChange} />
              <label className="form-check-label" for="3p-60a">3P-60A</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="isServiceConversion" id="3p-30ConRate" value="3P-30 Con Rate"
                     checked={serviceEstimate.isServiceConversion==="3P-30 Con Rate"} onChange={handleChange} />
              <label className="form-check-label" for="3p-30ConRate">3P-30 Con Rate</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="isServiceConversion" id="3p-60ConRate" value="3P-60 Con Rate"
                     checked={serviceEstimate.isServiceConversion==="3P-60 Con Rate"} onChange={handleChange} />
              <label className="form-check-label" for="3p-60ConRate">3P-60 Con Rate</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="isServiceConversion" id="30-60ConRate" value="30-60 Con Rate"
                     checked={serviceEstimate.isServiceConversion==="30-60 Con Rate"} onChange={handleChange} />
              <label className="form-check-label" for="30-60ConRate">30-60 Con Rate</label>
            </div>
          </div>
        </div>
        <div className="form-group row">
          <label for="isStandardVc" className="col-sm-3 col-form-label">Is Variable Cost Calculate According to Stantards?</label>
          <div className="col-sm-3 col-form-label">
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="isStandardVc" id="yes" value="Yes"
                     checked={serviceEstimate.isStandardVc==="Yes"} onChange={handleChange} required/>
              <label className="form-check-label" for="yes">Yes</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="isStandardVc" id="no" value="No"
                     checked={serviceEstimate.isStandardVc==="No"} onChange={handleChange} />
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
                   min="0" step=".01" onChange={handleChange} autoComplete="serviceLength" required/>
          </div>
          <label for="distanceToSp" className="col-sm-3 col-form-label">Distance to Service Place(Km)</label>
          <div className="col-sm-3">
            <Input type="number" name="distanceToSp" id="distanceToSp"  value={serviceEstimate.distanceToSp} 
                   min="0" step=".01" onChange={handleChange} autoComplete="distanceToSp" required/>
          </div>
        </div>
        <div className="form-group row">
          <label for="bareconType" className="col-sm-3 col-form-label">Conductor Type</label>
          <div className="col-sm-3 col-form-label">
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="bareconType" id="ABC" value="ABC"
                     checked={serviceEstimate.bareconType==="ABC"} onChange={handleChange} />
              <label className="form-check-label" for="ABC">ABC 3&#215;70+54.6mm<sup>2</sup></label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="bareconType" id="ABC2" value="ABC2"
                     checked={serviceEstimate.bareconType==="ABC2"} onChange={handleChange} />
              <label className="form-check-label" for="ABC2">ABC 3&#215;95+70mm<sup>2</sup></label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="bareconType" id="FLY" value="FLY"
                     checked={serviceEstimate.bareconType==="FLY"} onChange={handleChange} />
              <label className="form-check-label" for="FLY">FLY</label>
            </div>
          </div>
          <label for="sin" className="col-sm-3 col-form-label">SIN Number</label>
          <div className="col-sm-3">
            <Input type="text" name="sin" id="sin" value={serviceEstimate.sin} 
                   onChange={handleChange} autoComplete="sin" required/>
          </div>
        </div>
        <div className="form-group row">
          <label for="bareconLength" className="col-sm-3 col-form-label">Conductor Wire Length(m)</label>
          <div className="col-sm-3">
            <Input type="number" name="bareconLength" id="bareconLength" value={serviceEstimate.bareconLength}
                   min="0" step=".01" onChange={handleChange} autoComplete="bareconLength" />
          </div>
          <label for="noOfSpans" className="col-sm-3 col-form-label">No of Spans(For Service Length)</label>
          <div className="col-sm-3">
            <Input type="number" name="noOfSpans" id="noOfSpans" value={serviceEstimate.noOfSpans} 
                   min="0" step=".01" onChange={handleChange} autoComplete="noOfSpans" required/>
          </div>
        </div>
        <div className="form-group row">
          <label for="insideLength" className="col-sm-3 col-form-label">Length Inside the Premises(m)</label>
          <div className="col-sm-3">
            <Input type="number" name="insideLength" id="insideLength" value={serviceEstimate.insideLength}
                   min="0" step=".01" onChange={handleChange} autoComplete="insideLength" required/>
          </div>
          <label for="poleno" className="col-sm-3 col-form-label">Pole No</label>
          <div className="col-sm-3">
            <Input type="number" name="poleno" id="poleno" value={serviceEstimate.poleno} 
                  min="0" max="99" onChange={handleChange} autoComplete="poleno" />
          </div>
        </div>
        <div className="form-group row">
          <label for="totalLength" className="col-sm-3 col-form-label">Total Line Length(m)</label>
          <div className="col-sm-3">
            <Input type="number" name="totalLength" id="totalLength" value={serviceEstimate.totalLength=(Number(serviceEstimate.serviceLength)+Number(serviceEstimate.bareconLength))}
                   min="0" step=".01" onChange={handleChange} autoComplete="totalLength" required/>
          </div>
          <label for="substation" className="col-sm-3 col-form-label">Sub Station</label>
          <div className="col-sm-3">
            <Input type="text" name="substation" id="substation" value={serviceEstimate.substation} 
                   onChange={handleChange} autoComplete="substation" />
          </div>
        </div>
        <div className="form-group row">
          <label for="conversionLength" className="col-sm-3 col-form-label">1P-3P Line Conversion Length(m)</label>
          <div className="col-sm-3">
            <Input type="number" name="conversionLength" id="conversionLength" value={serviceEstimate.conversionLength}
                   min="0" step=".01" onChange={handleChange} autoComplete="conversionLength" />
          </div>
          <label for="distanceFromSs" className="col-sm-3 col-form-label">Distance From S/S</label>
          <div className="col-sm-3">
            <Input type="number" name="distanceFromSs" id="distanceFromSs" value={serviceEstimate.distanceFromSs} 
                   min="0" step=".01" onChange={handleChange} autoComplete="distanceFromSs" />
          </div>
        </div>
        <div className="form-group row">
          <label for="conversionLength2p" className="col-sm-3 col-form-label">2P-3P Line Conversion Length(m)</label>
          <div className="col-sm-3">
            <Input type="number" name="conversionLength2p" id="conversionLength2p" value={serviceEstimate.conversionLength2p}
                   min="0" step=".01" onChange={handleChange} autoComplete="conversionLength2p" />
          </div>
          <label for="transformerCapacity" className="col-sm-3 col-form-label">Transformer Capacity(KVA)</label>
          <div className="col-sm-3">
            <Input type="number" name="transformerCapacity" id="transformerCapacity" value={serviceEstimate.transformerCapacity} 
                   min="0" step=".01" onChange={handleChange} autoComplete="transformerCapacity" />
          </div>
        </div>
        <div className="form-group row">
          <label for="secondCircuitLength" className="col-sm-3 col-form-label">Second Circuit Length(m)</label>
          <div className="col-sm-3">
            <Input type="number" name="secondCircuitLength" id="secondCircuitLength" value={serviceEstimate.secondCircuitLength}
                   min="0" step=".01" onChange={handleChange} autoComplete="secondCircuitLength" />
          </div>
          <label for="transformerLoad" className="col-sm-3 col-form-label">Transformer Load(KVA)</label>
          <div className="col-sm-3">
            <Input type="number" name="transformerLoad" id="transformerLoad" value={serviceEstimate.transformerLoad} 
                   min="0" step=".01" onChange={handleChange} autoComplete="transformerLoad" />
          </div>
        </div>
        <div className="form-group row">        
          <label for="transformerPeakLoad" className="col-sm-3 col-form-label">Transformer Peak Load(KVA)</label>
          <div className="col-sm-3">
            <Input type="number" name="transformerPeakLoad" id="transformerPeakLoad" value={serviceEstimate.transformerPeakLoad} 
                   min="0" step=".01" onChange={handleChange} autoComplete="transformerPeakLoad" />
          </div>
          <label for="feederControlType" className="col-sm-3 col-form-label">Feeder Control Type</label>
          <div className="col-sm-3">
            <Input type="text" name="feederControlType" id="feederControlType" value={serviceEstimate.feederControlType} 
                   onChange={handleChange} autoComplete="feederControlType" />
          </div>
        </div>
        <div className="form-group row">       
          <label for="phase" className="col-sm-3 col-form-label">Phase</label>
          <div className="col-sm-3">
            <select className="form-control" name="phase" id="phase" value={serviceEstimate.phase}
                    onChange={handleChange} >
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
      // this.state = {
      // //  props:this.props
      //   poleList:[],
      //   // poleTableList:[]
      // };
      
      this.addToPoleList=this.addToPoleList.bind(this);
      this.removeFromPoleList=this.removeFromPoleList.bind(this);
      
    }

    addToPoleList(event,pole){
      event.preventDefault();
      const poleList =this.props.poleList;
      if(poleList.length!=0){
        for(var i=0;i<poleList.length;i++){
          if((poleList[i].matCd==pole.matCd)&&(poleList[i].poleType==pole.poleType)&&(poleList[i].fromConductor==pole.fromConductor)&&(poleList[i].toConductor==pole.toConductor)&&(poleList[i].pointType==pole.pointType)){
            console.log("true");
             Swal.fire(
              'Warning!',
              'pole already exist',
              'warning'
            )
            return;
          }
        }
        poleList.push(pole);
        this.setState({poleList});
      }else{
        poleList.push(pole);
        this.setState({poleList});
      }
    }

    
    removeFromPoleList(indexOfPole) {
     
      const poleList=this.props.poleList;
      console.log(indexOfPole);
       
      poleList.splice(indexOfPole, 1); 
           
      this.setState({poleList});
      console.log(this.state.poleList);
      
    }
    
    render() {    
      const {currentStep,handleChange,poles,pole,poleList,nextStep,prevStep}=this.props;
      // const {poleList}=this.state;

      const poleTable = poleList.map(x => {
      
        return <tr >
          <td>{x.matCd}</td>
          <td>{x.poleType}</td>
          <td>{x.fromConductor}</td>
          <td>{x.toConductor}</td>
          <td>{x.pointType}</td>
          <td>{x.matQty}</td>
          
          <td>
            {/* <ButtonGroup> */}
              <Button size="sm" color="primary" onClick={()=>this.removeFromPoleList(poleList.indexOf(x))}>Remove</Button>
              {/* <Button size="sm" color="danger" onClick={() => this.remove(contractor.id.contractorId, contractor.id.deptId)}>Delete</Button> */}
            {/* </ButtonGroup> */}
          </td>
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
        <Form onSubmit={(event)=>this.addToPoleList(event,pole)}>
        <div className="form-group row">
        <label for="matCd" className="col-sm-3 col-form-label">Pole</label>
          <div className="col-sm-3">
            <select className="form-control" name="matCd" id="matCd" value={pole.matCd}
                    onChange={handleChange} required>
              <option value="">Please Select</option>
                {
                  (poles && poles.length>0) && poles.map((pole)=>{
                    return(<option value={pole}>{pole}</option>);
                  })
                }
            </select>
          </div>
          <label for="poleType" className="col-sm-3 col-form-label">Pole Type</label>
          <div className="col-sm-3">
            <select className="form-control" name="poleType" id="poleType" value={pole.poleType}
                    onChange={handleChange} >
              <option value="INTERMEDIATE">INTERMEDIATE</option>
              <option value="TAPPING">TAPPING</option>
            </select>
          </div>
        </div>
        <div className="form-group row">
        <label for="fromConductor" className="col-sm-3 col-form-label">From Conductor</label>
          <div className="col-sm-3">
            <select className="form-control" name="fromConductor" id="fromConductor" value={pole.fromConductor}
                    onChange={handleChange} >
              <option value="SERVICE">SERVICE</option>
              <option value="FLY">FLY</option>
              <option value="ABC">ABC</option>
            </select>
          </div>
          <label for="toConductor" className="col-sm-3 col-form-label">To Conductor</label>
          <div className="col-sm-3">
            <select className="form-control" name="toConductor" id="toConductor" value={pole.toConductor}
                    onChange={handleChange} >
              <option value="SERVICE">SERVICE</option>
              <option value="FLY">FLY</option>
              <option value="ABC">ABC</option>
            </select>
          </div>
        </div>
        <div className="form-group row">
          <label for="pointType" className="col-sm-3 col-form-label">Pointer Type</label>
          <div className="col-sm-3">
            <select className="form-control" name="pointType" id="pointType" value={pole.pointType}
                    onChange={handleChange} >
              <option value="NEW">NEW</option>
              <option value="EXIST">EXIST</option>
            </select>
          </div>
          <label for="matQty" className="col-sm-3 col-form-label">Quantity</label>
          <div className="col-sm-3">
            <Input type="number" name="matQty" id="matQty" value={pole.matQty} 
                   min="0" onChange={handleChange} autoComplete="matQty" required/>
          </div>
        </div>
        <button 
          className="btn btn-primary float-right" 
          type="submit" >
        Add to pole list
        </button> 
        </Form> 
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
              <th width="10%">Actions</th>
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
      // this.state = {
      
      //   strutList:this.props.strutList,
        
      // };
      
      this.addToStrutList=this.addToStrutList.bind(this);
      this.removeFromStrutList=this.removeFromStrutList.bind(this);
    }

    addToStrutList(event,strut){
      event.preventDefault();
      const strutList= this.props.strutList
      if(strutList.length!=0){
        for(var i=0;i<strutList.length;i++){
          if((strutList[i].matCd==strut.matCd)){
            console.log("true");
             Swal.fire(
              'Warning!',
              'strut already exist',
              'warning'
            )
            return;
          }
        }
        strutList.push(strut);
        this.setState({strutList});
      }else{
        strutList.push(strut);
        this.setState({strutList});
      }
    }
    
    removeFromStrutList(indexOfStrut) {
     
      const strutList=this.props.strutList;
      console.log(indexOfStrut);
       
      strutList.splice(indexOfStrut, 1); 
           
      this.setState({strutList});
      console.log(this.state.strutList);
      
    }
    
    render() {    
      const {currentStep,handleChange,struts,strut,strutList,nextStep,prevStep}=this.props;

      const strutTable = strutList.map(strut => {
      
        return <tr >
          <td>{strut.matCd}</td>
          <td>{strut.matQty}</td>
          
          <td>
            <ButtonGroup>
              <Button size="sm" color="primary" onClick={()=>this.removeFromStrutList(strutList.indexOf(strut))}>Remove</Button>
            </ButtonGroup>
          </td>
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
          <Form onSubmit={(event)=>this.addToStrutList(event,strut)}>
          <div className="form-group row">
            <label for="matCd" className="col-sm-3 col-form-label">Strut</label>
            <div className="col-sm-3">
              <select className="form-control" name="matCd" id="matCd" value={strut.matCd}
                      onChange={handleChange} required>
                <option value="">Please Select</option>
                {
                  (struts && struts.length>0) && struts.map((strut)=>{
                    return(<option value={strut}>{strut}</option>);
                  })
                }
              </select>
            </div>
            <label for="matQty" className="col-sm-3 col-form-label">Quantity</label>
            <div className="col-sm-3">
              <Input type="number" name="matQty" id="matQty" value={strut.matQty} 
                     min="0" onChange={handleChange} autoComplete="matQty" required/>
            </div>
          </div>
          <button 
            className="btn btn-primary float-right" 
            type="submit">
        Add to strut list
        </button>  
        </Form>
       <br></br>
        <Table className="mt-4 table-bordered">
            <thead>
            <tr>
              <th>Strut</th>
              <th>Quantity</th>
              <th width="10%">Actions</th>
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
      // this.state = {
      // //  props:this.props
      //   stayList:this.props.stayList,
      //   // poleTableList:[]
      // };
      
      this.addToStayList=this.addToStayList.bind(this);
      this.removeFromStayList=this.removeFromStayList.bind(this);
    }  
    
    addToStayList(event,stay){
      event.preventDefault();
      const stayList =this.props.stayList;
      if(stayList.length!=0){
        for(var i=0;i<stayList.length;i++){
          if((stayList[i].matCd==stay.matCd)&&(stayList[i].stayType==stay.stayType)){
            console.log("true");
             Swal.fire(
              'Warning!',
              'stay already exist',
              'warning'
            )
            return;
          }
        }
        stayList.push(stay);
        this.setState({stayList});
      }else{
        stayList.push(stay);
        this.setState({stayList});
      }
    }

    removeFromStayList(indexOfStay) {
     
      const stayList=this.props.stayList;
      console.log(indexOfStay);
       
      stayList.splice(indexOfStay, 1); 
           
      this.setState({stayList});
      console.log(this.state.stayList);
      
    }
    
    render() {    
      const {currentStep,handleChange,stay,stayList,prevStep,handleSubmit}=this.props;

      const stayTable = stayList.map(stay => {
      
        return <tr>
          <td>{stay.matCd}</td>
          <td>{stay.stayType}</td>
          <td>{stay.matQty}</td>
          
          <td>
            <ButtonGroup>
              <Button size="sm" color="primary" onClick={()=>this.removeFromStayList(stayList.indexOf(stay))}>Remove</Button>
            </ButtonGroup>
          </td>
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
        <Form onSubmit={(event)=>this.addToStayList(event,stay)}>
        <div className="form-group row">
          <label for="matCd" className="col-sm-3 col-form-label">Stay</label>
          <div className="col-sm-3">
            <select className="form-control" name="matCd" id="matCd" value={stay.matCd}
                    onChange={handleChange} >
              <option value="B0805 - Wire stay G.S.  7/2.65 mm (Grade 700)">B0805 - Wire stay G.S.  7/2.65 mm (Grade 700)</option>
              <option value="B0810 - Wire stay G.S.  7/3.25 mm (Grade 700)">B0810 - Wire stay G.S.  7/3.25 mm (Grade 700)</option>
              <option value="B0815 - Wire stay G.S.  7/4.00 mm (Grade 700)">B0815 - Wire stay G.S.  7/4.00 mm (Grade 700)</option>
            </select>
          </div>
          <label for="stayType" className="col-sm-3 col-form-label">Stay Type</label>
          <div className="col-sm-3">
            <select className="form-control" name="stayType" id="stayType" value={stay.stayType}
                    onChange={handleChange} >
              <option value="NORMAL">NORMAL</option>
              <option value="FLYING">FLYING</option>
            </select>
          </div>
          
        </div>
        <div className="form-group row">
          <label for="matQty" className="col-sm-3 col-form-label">Quantity</label>
          <div className="col-sm-3">
            <Input type="number" name="matQty" id="matQty" value={stay.matQty} 
                   min="0" onChange={handleChange} autoComplete="matQty" required/>
          </div>
        </div>
          <button 
            className="btn btn-primary float-right" 
            type="submit" >
        Add to stay list
        </button>  
        </Form>
       <br></br>
        <Table className="mt-4 table-bordered">
            <thead>
            <tr>
              <th>Stay</th>
              <th>Stay Type</th>
              <th>Quantity</th>
              <th width="10%">Actions</th>
            </tr>
            </thead>
            <tbody>
              {stayTable}
            </tbody>
        </Table>
        <br></br>
        <button className="btn btn-secondary" type="button" onClick={prevStep}>Previous</button>
        <button className="btn btn-success float-right" type="button" onClick={handleSubmit}>Submit</button>
      </React.Fragment>
      );
    }  
  
  }
export default ServiceEstimateAdd;
