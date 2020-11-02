import React from 'react';
import { Button,ButtonGroup, Container, Form, FormGroup,Col, Row, CustomInput, Input, Label, Table } from 'reactstrap';
import Swal from 'sweetalert2';
import '../../css/Estimation.css'
// import '../Master/masters.css';
import { Helmet } from 'react-helmet'
import { AvForm, AvGroup, AvInput, AvFeedback, AvField } from 'availity-reactstrap-validation';
const TITLE = ' Estimate Details'

class peggingestView extends React.Component {

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

  emptyEstimate = {
    id:{
      estimateNo:'',
      deptId:''
    },
    estType:'',
    etimateDt:'',
    fundSource:'',
    fundId:'',
    
  }
  

  initialpIVApplication = {
       
    pivNo: '',
    deptId:  sessionStorage.getItem('costCenterNo'),
    pivReceiptNo: '',
    payingBankName: '',
    cebBranch: '',
    costCenterNo: '',
    date: '',
    referenceNo: '',
    description: '',
    idNo: '',
    fullName: '',
    fullAddress: '',
    paymentMode: '',
    payDate: '',
    bankCode: '',
    branchCode: '',
    chequeDate: '',
    chequeNo: '',
    loanAmount: '',
    amountInWords: '',
    preparedBy: '',
    approvedBy: '',
    miscellaneousIncome: '',
    electricityDebtors: '',
    securityDeposit: '',
    serConnOrElecSch: '',
    tenderDeposit: '',
    miscellaneousDeposit: '',
    cashInTransit: '',
    forDishonouredCheque: '',
    applicationFee: '',
    subTotal: '',
    vat: '',
    grandTotal: '',


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
        Estimate:this.emptyEstimate,
        pIVApplication: this.initialpIVApplication,
        // pole:this.emptyPole,
        // strut:this.emptyStrut,
        // stay:this.emptyStay,
        idGroup:this.emptyIdGroup,
        estimateNoList:[],
        matCds:[],
        BankList: [],
        BranchList: [],
        sestimateNo:'',
        materialList:[],
        MaterialList:[],
        // strutList:[],
        // stayList:[],
        searched:false 
      };
   
      this.handleChangeIdGroup=this.handleChangeIdGroup.bind(this);
      this.toInputUppercase=this.toInputUppercase.bind(this);
      this.getData=this.getData.bind(this);
      this.goToStep=this.goToStep.bind(this);
      this.handleBank = this.handleBank.bind(this); 
      // this.handlePivNo = this.handlePivNo.bind(this);
      // this.setMaterialsToTable=this.setMaterialsToTable.bind(this);
      // this.setStrutsToTable=this.setStrutsToTable.bind(this);
      // this.setStaysToTable=this.setStaysToTable.bind(this);
      // this.deleteServiceEstimate=this.deleteServiceEstimate.bind(this); 
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
  handleBank(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let pIVApplication = { ...this.state.pIVApplication };
    pIVApplication[name] = value;
    this.setState({ pIVApplication }, () => this.afterBankSetStateFinished())

}
afterBankSetStateFinished() {
  console.log(this.state.pIVApplication.bankCode)
  fetch(`/branch/findByIdBankCodeOrderByBranchName?bankCode=${this.state.pIVApplication.bankCode}`)
      .then(response => response.json())
      .then(data => this.setState({ BranchList: data }))
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
      
      
        let Estimate = await fetch(`/pcesthtt/findByIdEstimateNoAndIdDeptIdAndIdRevNo?estimateNo=${this.state.idGroup.estimationNo}&deptId=${this.state.idGroup.costCenter}&revNo=2`);
        if(Estimate.status==200){
          Estimate = await (Estimate).json();
          this.setState({Estimate});
        }else{
          await Swal.fire(
            'Error!',
            "Sketch doesn't exist",
            'error',

          )
          console.log(Estimate);
        }
        
        const sestimateNo=await (await fetch(`/EstimateReference/findByWorkEstimateNo?workEstimateNo=${this.state.idGroup.estimationNo}`));
        this.setState(sestimateNo);

        let pIVApplication = await fetch(`/pcesthtt/findByIdReferenceNo?referenceNo=${sestimateNo}`);
        if(pIVApplication.status==200){
          pIVApplication = await (pIVApplication).json();
          this.setState({pIVApplication});
        }else{
          await Swal.fire(
            'Error!',
            "PIV doesn't exist",
            'error',

          )
        }
        
        const MaterialList = await (await fetch(`/pcestdtt/findByIdEstimateNoAndIdRevNoAndIdDeptId?estimateNo=${this.state.idGroup.estimationNo}&deptId=${this.state.idGroup.costCenter}&revNo=2`)).json();
        this.setState(MaterialList);
        console.log(MaterialList);

        const materialTable = this.state.MaterialList.map(x => {
      
          return <tr >
            <td>{x[0]}</td>
            <td>{x[1]}</td>
            <td>{x[2]}</td>
            <td>{x[3]}</td>
            <td>{x[4]}</td>
            <td>{x[5]}</td>
          </tr>
        });

        // const strutList = await (await fetch(`/strutEstimate/findByIdApplicationNoAndIdDeptId?applicationNo=${this.state.idGroup.estimationNo}&deptId=${this.state.idGroup.costCenter}`)).json();
        // this.setStrutsToTable(strutList);

        // const stayList = await (await fetch(`/stayEstimate/findByIdApplicationNoAndIdDeptId?applicationNo=${this.state.idGroup.estimationNo}&deptId=${this.state.idGroup.costCenter}`)).json();
        // this.setStaysToTable(stayList);

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


  // setMaterialsToTable(list){
  //   let materialList=[]
  //   for(var i=0;i<list.length;i++){
  //     const material={
  //       code:list[i[0]],
  //       description:list[i[1]],
  //       unittype:list[i[2]],
  //       qty:list[i[3]],
  //       unitcost:list[i[4]],
  //       cost:list[i[5]]
  //     }
  //     materialList.push(material);
  //   }
  //   this.setState({materialList});
  // }
  

  // setStrutsToTable(list){
  //   let strutList=[]
  //   for(var i=0;i<list.length;i++){
  //     const strut={
  //       matCd:list[i].id.matCd,
  //       matQty:list[i].matQty
  //     }
  //     strutList.push(strut);
  //   }
  //   this.setState({strutList});
  // }

  // setStaysToTable(list){
  //   let stayList=[]
  //   for(var i=0;i<list.length;i++){
  //     const stay={
  //       matCd:list[i].id.matCd,
  //       stayType:list[i].id.stayType,
  //       matQty:list[i].matQty
  //     }
  //     stayList.push(stay);
  //   }
  //   this.setState({stayList});
  // }

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
      Estimate:this.emptyeEstimate,
      pivList:this.emptyPivList,
      // pole:this.emptyPole,
      // strut:this.emptyStrut,
      // stay:this.emptyStay,
      idGroup:this.emptyIdGroup,
      // estimateNoList:[],
      // matCds:[],
      // poleList:[],
      // strutList:[],
      // stayList:[],
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
          <br/>
                 <div className="padd-left">
        <a className="path" href="/home">Home</a> |
        <a className="path" href="/home"> Estimation</a> |
        <a className="path" href="/home">Estimation</a>|
        <a className="path2" href="serviceEstimate/view"> Estimation Details</a>
        </div>
          <Container>
        <h1> Estimate</h1>
        <br></br>
        <ul id="progressbar">
            <li className={this.state.isCompleted[0]+' '+this.state.isActive[0]} onClick={()=>this.goToStep(1)}>Applicant Details</li>
            <li className={this.state.isCompleted[1]+' '+this.state.isActive[1]} onClick={()=>this.goToStep(2)}>Estimate Details</li>
            <li className={this.state.isCompleted[2]+' '+this.state.isActive[2]} onClick={()=>this.goToStep(3)}>PIV Details</li>
            <li className={this.state.isCompleted[3]+' '+this.state.isActive[3]} onClick={()=>this.goToStep(4)}>Materials</li>
            <li className={this.state.isCompleted[4]+' '+this.state.isActive[4]} onClick={()=>this.goToStep(5)}>Summary Of The Estimate</li>
            <li className={this.state.isCompleted[5]+' '+this.state.isActive[5]} onClick={()=>this.goToStep(6)}>Stays</li>
        </ul>
        <div className="row">
            <div className="col-sm-4"></div>
            <div className="col-sm-8">
            {/* <button className="btn btn-danger float-right" type="button" style={{marginBottom:'10px'}} onClick={this.deleteServiceEstimate} disabled={!this.state.searched}>Delete Service Estimate</button> */}
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
            Estimate={this.state.Estimate}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
          />
          <Step3 
            currentStep={this.state.currentStep} 
            handleChange={this.handleChangeServiceEstimate}
            pIVApplication={this.state.pIVApplication}
            pivList={this.state.pivList}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            
          />
          <Step4 
            currentStep={this.state.currentStep} 
            materialList={this.state.materialList}
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
    const {wiringLandDetail,Estimate,nextStep,prevStep}=props;
    if (props.currentStep !== 2) {
      return null
    } 
    return(
      <div>
        <h4>Estimate Details</h4>
        <hr className="line"></hr>
        <br></br>  
        <Form onSubmit={nextStep}>
        <div className="form-group row">
          <div className="col-sm-3">Estimate Date</div>
          <div className="col-sm-3">: {Estimate.etimateDt}</div>
          <div className="col-sm-3">Estimate Category</div>
          <div className="col-sm-3">: {Estimate.estType}</div>
        </div>
        <div className="form-group row">
          <div className="col-sm-3">Fund Source</div>
          <div className="col-sm-3">: {Estimate.fundSource}</div>
          <div className="col-sm-3">Fund Id</div>
          <div className="col-sm-3">: {Estimate.fundId}</div>
        </div>
        
        <br></br>
        <button className="btn btn-secondary" type="button" onClick={prevStep}>Previous</button>
        <button className="btn btn-primary float-right" type="submit" >Next</button>
        </Form>
      </div>
    );
  }
  
  function Step3(props) {
    const {pIVApplication,nextStep,prevStep}=props;
    if (props.currentStep !== 3) {
        return null
    }
    return (
        <div>
         <h4>PIV Details</h4>
        <hr className="line"></hr>
        <br></br>  
            <div className="row"> 
                            <div className="col sm 3"><Label for="pivNo" inline="true" >PIV No.</Label></div>
                            <div className="col-sm-3">: {props.pivNo}</div>
                            <div className="col sm 3"><Label for="pivReceiptNo" inline="true" >PIV Receipt No</Label></div>
                            <div className="col-sm-3">: {props.pivReceiptNo}</div>
            </div>
            <div className="row" >
                            <div className="col sm 3"><Label for="payingBankName" inline="true" >People's Bank Branch.</Label></div>
                            <div className="col-sm-3">: {props.payingBankName}</div>
                            <div className="col sm 3"><Label for="cebBranch" inline="true" >CEB Branch</Label></div>
                            <div className="col-sm-3">: {props.cebBranch}</div>
                </div>
            <div className="row">
                            <div className="col sm 3"><Label for="deptId" inline="true" >Cost Center No.</Label></div>
                            <div className="col-sm-3">: {props.deptId}</div>
                            <div className="col sm 3"><Label for="date" inline="true" >Date</Label></div>
                            <div className="col-sm-3">: {props.date}</div>
                </div>
            <div className="row" >
                            <div className="col sm 3"><Label for="referenceNo" inline="true" >Reference No.</Label></div>
                            <div className="col-sm-3">: {props.referenceNo}</div>
                            <div className="col sm 3"><Label for="description" inline="true" >Job Description</Label></div>
                            <div className="col-sm-3">: {props.description}</div>
            </div>
            <div className="row" >
                            <div className="col sm 3"><Label for="idNo" inline="true" >ID No.</Label></div>
                            <div className="col-sm-3">: {props.idNo}</div>
                            <div className="col sm 3"><Label for="fullName" inline="true" >Depositor's Name</Label></div>
                            <div className="col-sm-3">: {props.fullName}</div>
            </div>
            <div className="row" >
                            <div className="col sm 3"><Label for="fullAddress" inline="true" >Address.</Label></div>
                            <div className="col-sm-3">: {props.fullAddress}</div>
                            <div className="col sm 3"><Label for="paymentMode" inline="true" >Payment Mode</Label></div>
                            <div className="col-sm-3">: {props.paymentMode}</div>
            </div>
            <div className="row">
                  <div className="col sm 3"><Label for="payDate" inline="true" >Pay Date</Label></div>
                            <div className="col-sm-3">: {props.payDate}</div>
                            <div className="col sm 3"><Label for="bankCode" inline="true" >Bank Code</Label></div>
                            <div className="col-sm-3">: {props.bankCode}</div>    
            </div>
            <div className="row" >
                            <div className="col sm 3"><Label for="branchCode" inline="true" >Branch Code</Label></div>
                            <div className="col-sm-3">: {props.branchCode}</div>
                            <div className="col sm 3"><Label for="chequeDate" inline="true" >Cheque Date</Label></div>
                            <div className="col-sm-3">: {props.chequeDate}</div>
            </div>
            <div className="row" >
                            <div className="col sm 3"><Label for="chequeNo" inline="true" >Cheque No</Label></div>
                            <div className="col-sm-3">: {props.chequeNo}</div>
                            <div className="col sm 3"><Label for="loanAmount" inline="true" >Amount Allocated</Label></div>
                            <div className="col-sm-3">: {props.loanAmount}</div>
            </div>
            <div className="row" >
                            <div className="col sm 3"><Label for="amountInWords" inline="true" >Amount In Words</Label></div>
                            <div className="col-sm-3">: {props.amountInWords}</div>
                            <div className="col sm 3"><Label for="preparedBy" inline="true" >Prepared By</Label></div>
                            <div className="col-sm-3">: {props.preparedBy}</div>
            </div>
            <div className="row" >
                            <div className="col sm 3"><Label for="approvedBy" inline="true" >Certified By</Label></div>
                            <div className="col-sm-3">: {props.approvedBy}</div>
                           
                            <div className="col sm 3"></div> <div className="col sm 3"></div>
            </div>
             <div className="row" >
               <div className="col sm 3"><Label for="approvedBy" inline="true" >Depositor's Signature</Label></div>
                            <div className="col-sm-3">: {props.approvedBy}</div>
                            <div className="col sm 3"><Label for="approvedBy" inline="true" >Bank Officer's Signature</Label></div>
                            <div className="col-sm-3">: {props.approvedBy}</div>
               </div>
             <Table  >
                        <tbody >

                            <tr>
                                <td>Code No </td>
                                <td>Description</td>
                                <td>Amount Cents</td>
                            </tr>
                            

             <tr className="tr_Application">
               <td width="20%">1300</td>
            <td width="50%">Miscellaneous Income</td>
             <td ><Input  type="text" name="miscellaneousIncome" id="miscellaneousIncome" value={pIVApplication.miscellaneousIncome} readOnly /> </td>
             </tr>
           <tr className="tr_Application">
                            <td width="20%">3600</td>
                                <td width="50%">Electricity Debtors</td>
                                <td ><Input  type="text" name="electricityDebtors" id="electricityDebtors" value={pIVApplication.electricityDebtors} readOnly/> </td>
                            </tr>
                            <tr className="tr_Application">
                            <td width="20%">5600</td>
                                <td width="50%">Security Deposit</td>
                                <td ><Input  type="text" name="securityDeposit" id="securityDeposit" value={pIVApplication.securityDeposit} readOnly /></td>
                            </tr>
                            <tr className="tr_Application">
                            <td width="20%">5610</td>
                                <td width="50%">Service Connection / Electricity Schemes</td>
                                <td ><Input  type="text" name="serConnOrElecSch" id="serConnOrElecSch" value={pIVApplication.serConnOrElecSch} readOnly /></td>
                            </tr>
                            <tr className="tr_Application">
                            <td width="20%">5640</td>
                                <td width="50%">Tender Deposit</td>
                                <td ><Input  type="text" name="tenderDeposit" id="tenderDeposit" value={pIVApplication.tenderDeposit} readOnly /></td>
                            </tr>
                            <tr className="tr_Application">
                            <td width="20%">5660</td>
                                <td width="50%">Miscellaneous Deposit</td>
                                <td ><Input type="text" name="miscellaneousDeposit" id="miscellaneousDeposit" value={pIVApplication.miscellaneousDeposit} readOnly/></td>
                            </tr>
                            <tr className="tr_Application">
                            <td width="20%">5800</td>
                                <td width="50%">Cash In Transit</td>
                                <td ><Input  type="text" name="cashInTransit" id="cashInTransit" value={pIVApplication.cashInTransit} readOnly /> </td>
                            </tr>
                            <tr className="tr_Application">
                            <td width="20%">5910</td>
                                <td width="50%">For Dishonoured Cheque</td>
                                <td ><Input  type="text" name="forDishonouredCheque" id="forDishonouredCheque" value={pIVApplication.forDishonouredCheque} readOnly/> </td>
                            </tr>
                            <tr className="tr_Application">
                            <td width="20%">1380</td>
                                <td width="50%">Application Fee</td>
                                <td ><Input  type="text" name="applicationFee" id="applicationFee" value={pIVApplication.applicationFee} readOnly /> </td>
                            </tr>
                            <tr className="tr_Application">
                            <td width="20%"></td>
                                <td width="50%">Sub Total</td>
                                <td ><Input  type="text" name="subTotal" id="subTotal" value={pIVApplication.subTotal} readOnly/> </td>
                            </tr>
                            <tr className="tr_Application">
                            <td width="20%">5222</td>
                                <td width="50%">V.A.T.</td>
                                <td ><Input type="text" name="vat" id="vat" value={pIVApplication.vat} readOnly /> </td>
                            </tr>
                            <tr className="tr_Application">
                            <td width="20%">1300</td>
                                <td width="50%">Grand Total</td>
                                <td ><Input type="text"  name="grandTotal" id="grandTotal" value={pIVApplication.grandTotal} readOnly/> </td>
                            </tr>

                        </tbody>
                    </Table>
                    <br></br>
        <button className="btn btn-secondary" type="button" onClick={prevStep}>Previous</button>
        <button className="btn btn-primary float-right" type="submit" onClick={nextStep} >Next</button>
        </div>
    );
}


  class Step4 extends React.Component {
    constructor(props) {
      super(props)
    
    }
    
    render() {    
      const {currentStep,materialTable,nextStep,prevStep}=this.props;
      
      if (currentStep !== 4) {
        return null
      } 
      return (
        <React.Fragment>
        <h4>Materials</h4>
        <hr className="line"></hr>
       <br></br>
        <Table className="mt-4 table-bordered">
            <thead>
            <tr>
              <th>Code</th>
              <th>Description</th>
              <th>Unit / Type</th>
              <th>Qty</th>
              <th>Unit cost</th>
              <th>Cost ( Rs.)</th>
            </tr>
            </thead>
            <tbody>
              {materialTable}
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

      if (currentStep !== 5) {
        return null
      } 
      return (
        <React.Fragment>
          <h4>Summary Of The Estimate</h4>
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
              {/* {strutTable} */}
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

      // const stayTable = stayList.map(stay => {
      
      //   return <tr>
      //     <td>{stay.matCd}</td>
      //     <td>{stay.stayType}</td>
      //     <td>{stay.matQty}</td>
          
      //   </tr>
      // });
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
              {/* {stayTable} */}
            </tbody>
        </Table>
        <br></br>
        <button className="btn btn-secondary" type="button" onClick={prevStep}>Previous</button>
        {/* <button className="btn btn-danger float-right" type="button" onClick={deleteServiceEstimate}>Delete</button> */}
      </React.Fragment>
      );
    }  
  
  }
export default peggingestView;
