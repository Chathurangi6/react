import React from 'react';
import { Button,ButtonGroup, Container, Form, FormGroup, Input, Label, Table } from 'reactstrap';
import Swal from 'sweetalert2';
import '../../css/Estimation.css'
import { switchCase } from '@babel/types';
import {estimateStatus} from './EstimateStatus'

class EstimateView extends React.Component {

  emptyIdGroup={
    estimationNo:'',
    tempId:'',
    costCenter:'',
    area:'',
    catCd:''
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

  emptyStandardEstimate={
    id:{
      estimateNo:'',
      deptId:''
    },
    serviceLength:'',
    conductorType:'',
    conductorLength:'',
    span:'',
    insideLength:'',
    poleNo:'',
    lineLength:'',
    conversionLength:'',
    conversionLength2p:'',
    secondCircuitLength:'',
    wiringType:'',
    isLoopService:'',
    cableType:'',
    isStandardVc:'',
    stayNo:'',
    strutNo:'',
    fixedCost:0,
    variableCost:0,
    processingFee:0,
    otherMatCost:0,
    otherLabourCost:0,
    capitalCost:0,
    conversionCost:0,
    nbtAmount:0,
    nbtPresent:0,
    taxAmount:0,
    taxPresent:0,
    securityDeposit:0,
    addlDeposit:0,
    totalCost:0
  }
  // emptyMaterialCostList={
  //   id:{
  //     estimateNo:'',
  //     deptNo:'',
  //     revNo:'',
  //     resCd:''
  //   },
  //   resType:'',
  //   resCat:'',
  //   *reName:'',
  //   uom:'',
  //   unitPrice:'',
  //   estimateQty:'',
  //   estimateCost:'',
  //   fundQty:'',
  //   *fundCost:'',
  //   customerQty:'',
  //   *customerCost:'' 
  // }

    // emptyLabourCostList={
    //   id:{
    //     estimateNo:'',
    //     deptNo:'',
    //     labourCode:''
    //   },
    //   activityDescription:'',
    //   unitLabourHrs:'',
    //   unitPrice:'',
    //   itemQty:'',
    //   labourHours:'',
    //   labourCost:''
    // }
    constructor(props) {
      super(props)
      this.state = {
        currentStep: 1,
        isActive:[],
        isCompleted:[],
        applicant:this.emptyApplicant,
        application:this.emptyApplication,
        wiringLandDetail:this.emptyWiringLandDetail,
        standardEstimate:this.emptyStandardEstimate,
        pcesthtt:this.emptyPcesthtt,
        idGroup:this.emptyIdGroup,
        estimateNoList:[],
        materialCostList:[],
        labourCostList:[],
        searched:false,
        isParams:false
        
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
      this.setMaterialCostsToTable=this.setMaterialCostsToTable.bind(this);
      // this.setStrutsToTable=this.setStrutsToTable.bind(this);
      // this.setStaysToTable=this.setStaysToTable.bind(this);
      this.deleteEstimate=this.deleteEstimate.bind(this);
      this.undoRejectEstimate=this.undoRejectEstimate.bind(this); 
      this.rejectEstimate=this.rejectEstimate.bind(this);
      this.approveEstimate=this.approveEstimate.bind(this);
      this.cancelEstimate=this.cancelEstimate.bind(this);
      this.getNameOfView=this.getNameOfView.bind(this);
      this.setActionButton=this.setActionButton.bind(this);
      this.searchForCancel=this.searchForCancel.bind(this);
      this.setActions=this.setActions.bind(this);
      this.searchForDelete=this.searchForDelete.bind(this);
      this.loadData=this.loadData.bind(this);
      this.getStatusForUserRole=this.getStatusForUserRole.bind(this);
      this.getCatCd=this.getCatCd.bind(this);
    }

    async componentDidMount() {
      // const estimateNoList=["01","02","03","04","05", "06"];
      let idGroup=this.state.idGroup;
      idGroup.costCenter=sessionStorage.getItem('costCenterNo');
      idGroup.catCd=this.getCatCd(sessionStorage.getItem('jobType'));
      await this.setState({idGroup})
      let status=0;
      // const userRole=sessionStorage.getItem('userLevel');
      switch(this.props.status){
        // case "delete":
        //   status=estimateStatus.MODIFIED;
        //   break;
        case "undoRejects":
          status=estimateStatus.EST_REJECTED;
          break;
        case "approveOrReject":
          status=this.getStatusForUserRole();
          break;
        case "approveLowerLevel":{
          const userLevel=sessionStorage.getItem('userLevel');
          const userName=sessionStorage.getItem('userName');
          await fetch(`/estimate/getEstNoApprovalListLowerLevels?userName=${userName}&authorityLevel=${userLevel}`)
          .then(response => response.json())
          .then(data => this.setState({estimateNoList: data.sort()}));
          break;
         
        }
          // {
          //   if(userRole=="ES"){
          //     status=estimateStatus.EST_APPROVAL_ES;
          //   }else if(userRole=="EA"){
          //     status=estimateStatus.EST_APPROVAL_EA;
          //   }else if(userRole=="EE"){
          //     status=estimateStatus.EST_APPROVAL_EE;
          //   }else if(userRole=="CE"){
          //     status=estimateStatus.EST_APPROVAL_CE;
          //   }else if(userRole=="DGM"){
          //     status=estimateStatus.EST_APPROVAL_DGM;
          //   }else if(userRole=="AGM"){
          //     status=estimateStatus.EST_APPROVAL_AGM;
          //   }else if(userRole=="PEN"){
          //     status=estimateStatus.EST_APPROVAL_PEN;
          //   }else if(userRole=="PCE"){
          //     status=estimateStatus.EST_APPROVAL_PCE;
          //   }
          // }
      }
      if(status!=0){
        if(this.props.location.state){
          let applicationType =await fetch(`/application/findApplicationTypeByApplicationNo?applicationNo=${this.props.location.state.estNo}`);
          if(applicationType.status==200){
            applicationType = await (applicationType).json();
            let idGroup=this.state.idGroup;
            idGroup.costCenter=this.props.location.state.costCenter;
            idGroup.catCd=this.getCatCd(applicationType);
          // idGroup.costCenter=sessionStorage.getItem('costCenterNo');
            this.setState({idGroup,isParams:true},()=>this.loadData(status))
          }
        }else{
          // let idGroup=this.state.idGroup;
          // idGroup.costCenter=sessionStorage.getItem('costCenterNo');
          // await this.setState({idGroup})

          await fetch(`/pcesthtt/findEstimateNoByStatusAndDeptIdAndRevNoAndCatCd?status=${status}&deptId=${this.state.idGroup.costCenter}&revNo=1&catCd=${this.state.idGroup.catCd}`)
          .then(response => response.json())
          .then(data => this.setState({estimateNoList: data.sort()}));
          
        }  
      }
      // console.log(this.state.estimateNoList.sort())
      // this.setState({estimateNoList});
      let isActive=this.state.isActive;
      isActive[0]='active';
      this.setState({isActive});
    
  }
  
  getStatusForUserRole(){
    const userRole=sessionStorage.getItem('userLevel');
    let status=0;
    if(userRole=="ES"){
      status=estimateStatus.EST_APPROVAL_ES;
    }else if(userRole=="EA"){
      status=estimateStatus.EST_APPROVAL_EA;
    }else if(userRole=="EE"){
      status=estimateStatus.EST_APPROVAL_EE;
    }else if(userRole=="CE"){
      status=estimateStatus.EST_APPROVAL_CE;
    }else if(userRole=="DGM"){
      status=estimateStatus.EST_APPROVAL_DGM;
    }else if(userRole=="AGM"){
      status=estimateStatus.EST_APPROVAL_AGM;
    }else if(userRole=="PEN"){
      status=estimateStatus.EST_APPROVAL_PEN;
    }else if(userRole=="PCE"){
      status=estimateStatus.EST_APPROVAL_PCE;
    }
    console.log(userRole)
    return status;
  }

  getCatCd(jobType){
    let catCd;
    if(jobType=="NC"){
      catCd = "SMC";
    }else if(jobType=="CR"){
      catCd = "CRJ";
    }else if(jobType=="TC"){
      catCd = "TMP";
    }else if(jobType=="SA"){
      catCd = "SYA";
    }else if(jobType=="MT"){
      catCd = "MTN";
    }else if(jobType=="BD"){
      catCd = "BDJ";
    }else if(jobType=="RE"){
      catCd = "REJ";
    }else if(jobType=="AM"){
      catCd = "AMU";
    }else if(jobType=="EM"){
      catCd = "EMU";
    }else if(jobType=="BC"){
      catCd = "ABC";
    }else if(jobType=="LS"){
      catCd = "LSF";
    }else if(jobType=="PS"){
      catCd = "PSF";
    }else if(jobType=="CS"){
      catCd = "CSC";
    }else if(jobType=="CC"){
      catCd = "CCC";
    }else{
      catCd = "XXX";
    }
    return catCd;
  }

  async loadData(status){
    await fetch(`/pcesthtt/findEstimateNoByStatusAndDeptIdAndRevNoAndCatCd?status=${status}&deptId=${this.state.idGroup.costCenter}&revNo=1&catCd=${this.state.idGroup.catCd}`)
          .then(response => response.json())
          .then(data => this.setState({estimateNoList: data.sort()}));
      
    let idGroup=this.state.idGroup;
    idGroup.estimationNo=this.props.location.state.estNo;
    this.setState({idGroup},()=>this.getData());
    if(this.props.status=="undoRejects"){
      this.props.history.replace('/estimate/undoRejects/',null);
    }else if(this.props.status=="approveOrReject"){
      this.props.history.replace('/estimate/approveOrReject/',null)
    }
    
  }
  
  handleChangeIdGroup(event) {
    this.clearForm();
    const status=this.props.status;
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let idGroup = {...this.state.idGroup};
    idGroup[name] = value;
    if(status=="view"||status=="cancel"||status=="delete"){
      if(idGroup.estimationNo.length!=18){
        event.target.setCustomValidity('Please lengthen the estimate no to 18 characters');
     
      }else{
        event.target.setCustomValidity('');
        
      }
      this.setState({idGroup});
    }else if(status=="undoRejects"||status=="approveOrReject"||status=="approveLowerLevel"){
      this.setState({idGroup},()=>this.getData());
    }
    // else if(status=="approveLowerLevel"){
    //   idGroup.costCenter=idGroup.estimationNo.substring(0,6);
    //   this.setState({idGroup},()=>this.getData());
    // }
  }

  toInputUppercase(e) {
    e.target.value = ("" + e.target.value).toUpperCase();
  };

  setActions(e){
    e.preventDefault();
    const status=this.props.status;
    if(status=="view"){
      this.getData();
    }else if(status=="cancel"){
      this.searchForCancel();
    }else if(status=="delete"){
      this.searchForDelete();
    }
  }

  async searchForCancel(){
    let status= await fetch(`/pcesthtt/findStatusByEstimateNoAndRevNo?estimateNo=${this.state.idGroup.estimationNo}&revNo=1`);
    if(status.status==200){
      status=await (status).json();
      if(status==estimateStatus.EST_APPROVED){
        let approvedBy= await(await fetch(`/approval/findLastApprovedBy?toStatus=${estimateStatus.EST_APPROVED}&referenceNo=${this.state.idGroup.estimationNo}`)).json();
        const approvedUser=approvedBy[1];
        const currentUser=sessionStorage.getItem('userName');
        if(currentUser==approvedUser){
          this.getData();
        }else{
          this.clearForm();
          Swal.fire(
            'Info!',
            "You have no authority to cancel this approval",
            'info'
          )
        }
      }else{
        this.clearForm();
        Swal.fire(
          'Error!',
          "Estimation hasn't been approved",
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
    
  }

  async searchForDelete(){
    let status= await fetch(`/pcesthtt/findStatusByEstimateNoAndRevNo?estimateNo=${this.state.idGroup.estimationNo}&revNo=1`);
    if(status.status==200){
      status=await (status).json();
      if(status==estimateStatus.MODIFIED){
        this.getData();
      }else{
        this.clearForm();
        Swal.fire(
          'Error!',
          "Estimation can't be deleted",
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
    
  }

  async getData(){
    if(this.state.idGroup.estimationNo){
      let application = await fetch(`/application/findByApplicationNo?applicationNo=${this.state.idGroup.estimationNo}`);
      // console.log(application);
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
    
        let standardEstimate = await fetch(`/speststd/findByIdEstimateNo?estimateNo=${this.state.idGroup.estimationNo}`);
        if(standardEstimate.status==200){
          standardEstimate =await (standardEstimate).json();
          this.setState({standardEstimate},()=>console.log(this.state.standardEstimate));
        }else{
          await Swal.fire(
            'Error!',
            "Sketch and Standard Estimate doesn't exist",
            'error',
            
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
        

        const materialCostList = await (await fetch(`/pcestdtt/findByIdEstimateNoAndIdRevNo?estimateNo=${this.state.idGroup.estimationNo}&revNo=1`)).json();
        // this.setState({materialCostList},()=>console.log(this.state.materialCostList));
        this.setMaterialCostsToTable(materialCostList);

        const labourCostList = await (await fetch(`/spestlab/findByIdEstimateNo?estimateNo=${this.state.idGroup.estimationNo}`)).json();
        this.setState({labourCostList},()=>console.log(this.state.labourCostList));
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
    }else{
      this.clearForm();
    }
  }

  async deleteEstimate(){
    if(this.state.idGroup.estimationNo!=""){
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
      const {idGroup,standardEstimate,pcesthtt}=this.state
      const approval={
        approvalId:'',
        referenceNo:idGroup.estimationNo,
        deptId:pcesthtt.id.deptId,
        approvalType:'EST_DELE',
        systemBy:'SMC',
        approvedLevel:sessionStorage.getItem('userLevel'),
        approvedBy:sessionStorage.getItem('userName'),
        fromStatus:estimateStatus.MODIFIED,
        toStatus:'00',
        standardCost:'',
        detailedCost:''
      }
      //const response = await fetch(`/estimate/delete?estimateNo=${this.state.idGroup.estimationNo}&deptId=${this.state.idGroup.costCenter}&revNo=1`);
      const response=await fetch('/estimate/delete', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
           'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          estimateNo:idGroup.estimationNo,
          deptId:pcesthtt.id.deptId,
          revNo:1,
          approval:approval}),
      });
      if(response.status==200){
        this.clearForm();
        Swal.fire(
            'Deleted!',
            "Estimate has been deleted",
            'success'
          )
      }else{
        Swal.fire(
          'Error!',
          "Estimate has not been deleted",
          'error'
        )
      }
    }
    }
  }

  async undoRejectEstimate(){
    if(this.state.idGroup.estimationNo!=""){
    const message= await Swal.fire({
      title: 'Are you sure?',
      // text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, activate rejected estimate!'
    })
    if(message.value){
      const {idGroup,standardEstimate,pcesthtt}=this.state
      const approval={
        approvalId:'',
        referenceNo:idGroup.estimationNo,
        deptId:pcesthtt.id.deptId,
        approvalType:'EST_UNDO_RJCT',
        systemBy:'SMC',
        approvedLevel:sessionStorage.getItem('userLevel'),
        approvedBy:sessionStorage.getItem('userName'),
        fromStatus:estimateStatus.EST_REJECTED,
        toStatus:estimateStatus.MODIFIED,
        standardCost:'',
        detailedCost:''
      }
      //const response = await fetch(`/pcesthtt/updateStatus?estimateNo=${this.state.idGroup.estimationNo}&deptId=${this.state.idGroup.costCenter}&revNo=1&status=75`);
      const response=await fetch('/estimate/changeStatusAndAddApproval', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
           'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          estimateNo:idGroup.estimationNo,
          deptId:pcesthtt.id.deptId,
          revNo:1,
          status:estimateStatus.MODIFIED,
          approval:approval}),
      });
      
      if(response.status==200){
        this.clearForm();
        Swal.fire(
            'Activated!',
            "Estimate has been activated",
            'success'
          )
          
        await fetch(`/pcesthtt/findEstimateNoByStatusAndDeptIdAndRevNoAndCatCd?status=${estimateStatus.EST_REJECTED}&deptId=${this.state.idGroup.costCenter}&revNo=1&catCd=${this.state.idGroup.catCd}`)
          .then(response => response.json())
          .then(data => this.setState({estimateNoList: data.sort()}));
        if(this.state.isParams==true){
          this.setState({isParams:false});
        }  
      
      }else{
        Swal.fire(
          'Error!',
          "Estimate has not been activated",
          'error'
        )
      }
    }
    }
  }

  async rejectEstimate(){
    if(this.state.idGroup.estimationNo!=""){
    const message= await Swal.fire({
      title: 'Are you sure?',
      // text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, reject estimate!'
    })
    if(message.value){
      const {idGroup,standardEstimate,pcesthtt}=this.state;
      const userLevel=sessionStorage.getItem('userLevel');
      const userName=sessionStorage.getItem('userName');
      const status=this.props.status;
      const approval={
        approvalId:'',
        referenceNo:idGroup.estimationNo,
        deptId:pcesthtt.id.deptId,
        approvalType:'EST_RJCT',
        systemBy:'SMC',
        approvedLevel:userLevel,
        approvedBy:userName,
        fromStatus:this.state.pcesthtt.status,
        toStatus:estimateStatus.EST_REJECTED,
        standardCost:'',
        detailedCost:''
      }
      //const response = await fetch(`/pcesthtt/updateStatus?estimateNo=${this.state.idGroup.estimationNo}&deptId=${this.state.idGroup.costCenter}&revNo=1&status=75`);
      const response=await fetch('/estimate/changeStatusAndAddApproval', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
           'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          estimateNo:idGroup.estimationNo,
          deptId:pcesthtt.id.deptId,
          revNo:1,
          status:estimateStatus.EST_REJECTED,
          approval:approval}),
      });
      
      if(response.status==200){
        this.clearForm();
        Swal.fire(
            'Rejected!',
            "Estimate has been rejected",
            'success'
          )
        
        if(status=="approveOrReject") { 
          await fetch(`/pcesthtt/findEstimateNoByStatusAndDeptIdAndRevNoAndCatCd?status=${this.getStatusForUserRole()}&deptId=${this.state.idGroup.costCenter}&revNo=1&catCd=${this.state.idGroup.catCd}`)
          .then(response => response.json())
          .then(data => this.setState({estimateNoList: data.sort()}));
      
          if(this.state.isParams==true){
            this.setState({isParams:false});
          }
        }else if(status=="approveLowerLevel"){
          await fetch(`/estimate/getEstNoApprovalListLowerLevels?userName=${userName}&authorityLevel=${userLevel}`)
          .then(response => response.json())
          .then(data => this.setState({estimateNoList: data.sort()}));
        }
      }else{
        Swal.fire(
          'Error!',
          "Estimate has not been rejected",
          'error'
        )
      }
    }
    }
  }

  async approveEstimate(){
    if(this.state.idGroup.estimationNo!=""){
    const message= await Swal.fire({
      title: 'Are you sure?',
      // text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, approve estimate!'
    })
    if(message.value){
      const userLevel=sessionStorage.getItem('userLevel');
      const userName=sessionStorage.getItem('userName');
      const status=this.props.status;
      var response;
      if(status=="approveOrReject"){
        response = await (await fetch(`/estimate/approve?estimateNo=${this.state.idGroup.estimationNo}&deptId=${this.state.pcesthtt.id.deptId}&userLevel=${userLevel}&userName=${userName}`)).text();
      }else if(status=="approveLowerLevel"){
        response = await (await fetch(`/estimate/approveLowerLevel?estimateNo=${this.state.idGroup.estimationNo}&deptId=${this.state.pcesthtt.id.deptId}&userLevel=${userLevel}&userName=${userName}`)).text();
      }

      if(response.charAt(0)=="$"){
        this.clearForm();
        Swal.fire(
            'Approved!',
            "Estimate has been approved",
            'success'
          )
        if(status=="approveOrReject") { 
          await fetch(`/pcesthtt/findEstimateNoByStatusAndDeptIdAndRevNoAndCatCd?status=${this.getStatusForUserRole()}&deptId=${this.state.idGroup.costCenter}&revNo=1&catCd=${this.state.idGroup.catCd}`)
          .then(response => response.json())
          .then(data => this.setState({estimateNoList: data.sort()}));
        
          if(this.state.isParams==true){
            this.setState({isParams:false});
          }
        }else if(status=="approveLowerLevel"){
          await fetch(`/estimate/getEstNoApprovalListLowerLevels?userName=${userName}&authorityLevel=${userLevel}`)
          .then(response => response.json())
          .then(data => this.setState({estimateNoList: data.sort()}));
        }
      
      }else if(response.charAt(0)=="#"){
        this.clearForm();
        Swal.fire(
          'Info!',
          response.substr(1),
          'info'
        )
        if(status=="approveOrReject") {
          await fetch(`/pcesthtt/findEstimateNoByStatusAndDeptIdAndRevNoAndCatCd?status=${this.getStatusForUserRole()}&deptId=${this.state.idGroup.costCenter}&revNo=1&catCd=${this.state.idGroup.catCd}`)
          .then(response => response.json())
          .then(data => this.setState({estimateNoList: data.sort()}));

          
          if(this.state.isParams==true){
            this.setState({isParams:false});
          }
        }else if(status=="approveLowerLevel"){
          await fetch(`/estimate/getEstNoApprovalListLowerLevels?userName=${userName}&authorityLevel=${userLevel}`)
          .then(response => response.json())
          .then(data => this.setState({estimateNoList: data.sort()}));
        }
      }else if(response.charAt(0)=="@"){
        Swal.fire(
          'Error!',
          "Estimate has not been approved",
          'error'
        )
      }
    }
    }
  }

  async cancelEstimate(){
    if(this.state.idGroup.estimationNo!=""){
    const message= await Swal.fire({
      title: 'Are you sure?',
      // text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel approved estimate!'
    })
    if(message.value){
      const {idGroup,standardEstimate,pcesthtt}=this.state
      const approval={
        approvalId:'',
        referenceNo:idGroup.estimationNo,
        deptId:pcesthtt.id.deptId,
        approvalType:'EST_CLAP',
        systemBy:'SMC',
        approvedLevel:sessionStorage.getItem('userLevel'),
        approvedBy:sessionStorage.getItem('userName'),
        fromStatus:estimateStatus.EST_APPROVED,
        toStatus:estimateStatus.MODIFIED,
        standardCost:'',
        detailedCost:''
      }
      //const response = await fetch(`/pcesthtt/updateStatus?estimateNo=${this.state.idGroup.estimationNo}&deptId=${this.state.idGroup.costCenter}&revNo=1&status=75`);
      const response=await fetch('/estimate/changeStatusAndAddApproval', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
           'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          estimateNo:idGroup.estimationNo,
          deptId:pcesthtt.id.deptId,
          revNo:1,
          status:estimateStatus.MODIFIED,
          approval:approval}),
      });
      
      if(response.status==200){
        this.clearForm();
        Swal.fire(
            'Canceled!',
            "Approval has been canceled",
            'success'
          )
          
      }else{
        Swal.fire(
          'Error!',
          "Approval has not been canceled",
          'error'
        )
      }
    }
    }
  }


  async setMaterialCostsToTable(list){
    let materialCostList=[]
    
    for(var i=0;i<list.length;i++){
      const resNm=await (await fetch(`/inmatm/findMatNmByMatCd?matCd=${list[i].id.resCd}`)).text();
      const materialCost={
        resCd:list[i].id.resCd,
        resType:list[i].resType,
        resCat:list[i].resCat,
        resName:resNm,
        uom:list[i].uom,
        unitPrice:list[i].unitPrice,
        estimateQty:list[i].estimateQty,
        estimateCost:(list[i].unitPrice*list[i].estimateQty),
        fundQty:list[i].fundQty,
        fundCost:(list[i].unitPrice*list[i].fundQty),
        customerQty:list[i].customerQty,
        customerCost:(list[i].unitPrice*list[i].customerQty)
      }
      materialCostList.push(materialCost);
    }
    this.setState({materialCostList});
  }

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
      standardEstimate:this.emptyStandardEstimate,
      pcesthtt:this.emptyPcesthtt,
      // pole:this.emptyPole,
      // strut:this.emptyStrut,
      // stay:this.emptyStay,
      idGroup:this.emptyIdGroup,
      // estimateNoList:[],
      // matCds:[],
      materialCostList:[],
      labourCostList:[],
      searched:false
    })
  }
    
    nextStep = () => {
      if(this.state.idGroup.estimationNo){
      let currentStep = this.state.currentStep

      let isCompleted=this.state.isCompleted;
      isCompleted[currentStep-1]='completed';
      this.setState({isCompleted});

      currentStep = currentStep >= 5? 6: currentStep + 1
      this.setState({currentStep: currentStep},()=>this.setActive())
      }
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

    getNameOfView(){
      const status=this.props.status;
      switch(status){
        case "view": return <span>View </span>
        case "delete": return <span>Delete </span>
        case "undoRejects": return <span>Activate Rejected </span>
        case "approveOrReject": return <span>Approve/Reject </span>
        case "cancel": return <span>Cancel Approved </span>
        case "approveLowerLevel": return <span>Approve Lower Level </span>
      }
    }
    setActionButton(){
      const status=this.props.status;
      switch(status){
        // case "view": return <span>View </span>
        // case "delete": return <button className="btn btn-danger btn-block" type="button" style={{marginBottom:'10px', marginLeft:'900px',marginRight:'10px',position:'relative'}}>Delete Estimate</button>
        case "delete": return <button className="btn btn-danger float-right" type="button" style={{marginBottom:'10px'}} onClick={this.deleteEstimate} disabled={!this.state.searched}>Delete Estimate</button>
        case "undoRejects": return <button className="btn btn-primary float-right" type="button" style={{marginBottom:'10px'}} onClick={this.undoRejectEstimate} disabled={!this.state.searched}>Activate Rejected Estimate</button>
        case "approveOrReject":
        case "approveLowerLevel": 
          return <div className="float-right">
            <button className="btn btn-primary" type="button" style={{marginBottom:'10px',marginRight:'20px'}} onClick={this.approveEstimate} disabled={!this.state.searched}>Approve Estimate</button>
            <button className="btn btn-primary" type="button" style={{marginBottom:'10px'}} onClick={this.rejectEstimate} disabled={!this.state.searched}>Reject Estimate</button>
          </div>
        case "cancel": return <button className="btn btn-primary float-right" type="button" style={{marginBottom:'10px'}} onClick={this.cancelEstimate} disabled={!this.state.searched}>Cancel Approved Estimate</button>
      }
    }
    
    render() {    
      return (
        <React.Fragment>
          <Container>
        {/* <h1>Estimate</h1> */}
          <h1>{this.getNameOfView()}Estimate</h1>
          <br></br>
          <ul id="progressbar">
            <li className={this.state.isCompleted[0]+' '+this.state.isActive[0]} onClick={()=>this.goToStep(1)}>Applicant Details</li>
            <li className={this.state.isCompleted[1]+' '+this.state.isActive[1]} onClick={()=>this.goToStep(2)}>Connection Details</li>
            <li className={this.state.isCompleted[2]+' '+this.state.isActive[2]} onClick={()=>this.goToStep(3)}>Sketch</li>
            <li className={this.state.isCompleted[3]+' '+this.state.isActive[3]} onClick={()=>this.goToStep(4)}>Standard Estimate</li>
            <li className={this.state.isCompleted[4]+' '+this.state.isActive[4]} onClick={()=>this.goToStep(5)}>Meterial Costs</li>
            <li className={this.state.isCompleted[5]+' '+this.state.isActive[5]} onClick={()=>this.goToStep(6)}>Labour Costs</li>
          </ul>
          <div className="row">
            <div className="col-sm-4"></div>
            <div className="col-sm-8">
            {this.setActionButton()}
            </div>
          </div>
          {/* <div className="form-inline" >
          {this.setActionButton()}
          </div> */}
          <div className="formBorder multiStepForm">
          <Step1 
            currentStep={this.state.currentStep} 
            handleChange={this.handleChangeIdGroup}
            toInputUppercase={this.toInputUppercase}
            getData={this.getData}
            setActions={this.setActions}
            idGroup={this.state.idGroup}
            applicant={this.state.applicant}
            application={this.state.application}
            wiringLandDetail={this.state.wiringLandDetail}
            pcesthtt={this.state.pcesthtt}
            estimateNoList={this.state.estimateNoList}
            nextStep={this.nextStep}
            status={this.props.status}
            searched={this.state.searched}
            isParams={this.state.isParams}
          />
          <Step2 
            currentStep={this.state.currentStep} 
            wiringLandDetail={this.state.wiringLandDetail}
            standardEstimate={this.state.standardEstimate}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
          />
          <Step3 
            currentStep={this.state.currentStep} 
            // handleChange={this.handleChangeServiceEstimate}
            standardEstimate={this.state.standardEstimate}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
          />
          <Step4 
            currentStep={this.state.currentStep} 
            standardEstimate={this.state.standardEstimate}
            pcesthtt={this.state.pcesthtt}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
          />
          <Step5 
            currentStep={this.state.currentStep} 
            materialCostList={this.state.materialCostList}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
          />
          <Step6 
            currentStep={this.state.currentStep} 
            labourCostList={this.state.labourCostList}
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
    const {handleChange,idGroup,getData,setActions,applicant, application, wiringLandDetail,estimateNoList,pcesthtt,nextStep,status,toInputUppercase,searched,isParams}=props;
    console.log(isParams)
    if (props.currentStep !== 1) {
      return null
    } 
    return(
      <div>
        {/* <Form onSubmit={nextStep}> */}
        {/* <div className="form-group row">
          <label for="estimationNo" className="col-sm-2 col-form-label">Estimation Number</label> */}
          {(()=>{
            if(status=="view"||status=="cancel"||status=="delete"){
              return(
                // <React.Fragment>
                <Form onSubmit={setActions}>
                  <div className="form-group row">
                  <label for="estimationNo" className="col-sm-2 col-form-label">Estimation Number</label>
                  <div className="col-sm-3">
                    <Input type="text" name="estimationNo" id="estimationNo" value={idGroup.estimationNo} onInput={toInputUppercase}
                           minLength="18" maxLength="18" onChange={handleChange} autoComplete="estimationNo" required/>
                  </div>
                  <div className="col-sm-3">
                  <button className="btn btn-primary" type="submit" >Search</button>
                  </div>
              <div className="col-sm-3 col-form-label">Temp Id : {application.id.applicationId}</div>
          
                  </div>
                </Form>
                // </React.Fragment>
              )
            }else if((status=="undoRejects"&& isParams==false)||(status=="approveOrReject"&& isParams==false)||(status=="approveLowerLevel")){
              return(
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
                <div className="col-sm-3 col-form-label">Temp Id : {application.id.applicationId}</div>
              </div> 
              )
            }else if((status=="undoRejects"&&isParams==true)||(status=="approveOrReject"&& isParams==true)){
              return(
              <div className="form-group row">
                <label for="estimationNo" className="col-sm-2 col-form-label">Estimation Number</label>
                <div className="col-sm-3">
                  <select className="form-control" name="estimationNo" id="estimationNo" value={idGroup.estimationNo}
                          onChange={handleChange} required>
                     {/* <option value="">Please Select</option> */}

                           {
                               (estimateNoList && estimateNoList.length>0) && estimateNoList.map((number)=>{
                                   return(<option value={number}>{number}</option>);
                               })
                           }
                  </select>
                </div>
                <div className="col-sm-3 col-form-label">Temp Id : {application.id.applicationId}</div>
              </div> 
              )
            }        

          })()}
          {/* <label for="tempId" className="col-sm-3 col-form-label">Temp Id</label> */}
          {/* <div className="col-sm-3 col-form-label">Temp Id : </div>
          
        </div> */}
        <div className="form-group row">
          <div className="col-sm-5 col-form-label">Cost Center : {pcesthtt.id.deptId}</div>
          <div className="col-sm-4 col-form-label">Estimated Date : {pcesthtt.etimateDt}</div>
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
        <button className="btn btn-primary float-right" type="button" onClick={nextStep} disabled={!searched}>Next</button>
        <br></br>
        <br></br>
        {/* </Form> */}
    </div>
    );
  }
  
  function Step2(props) {
    const {wiringLandDetail,standardEstimate,nextStep,prevStep}=props;
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
                     checked={standardEstimate.wiringType==="Over Head"}  disabled/>
              <label className="form-check-label" for="overHead">Over Head</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="wiringType" id="underGround" value="Under Ground"
                     checked={standardEstimate.wiringType==="Under Ground"}  disabled/>
              <label className="form-check-label" for="underGround">Under Ground</label>
            </div>
          </div>
          <label for="cableType" className="col-sm-3 col-form-label">Cable Type</label>
          <div className="col-sm-3">
            <select className="form-control" name="cableType" id="cableType" value={standardEstimate.cableType}
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
          <label for="isLoopService" className="col-sm-3 col-form-label">Is Loop Service</label>
          <div className="col-sm-3 col-form-label">
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="isLoopService" id="yes" value="Yes"
                     checked={standardEstimate.isLoopService==="Yes"}  disabled/>
              <label className="form-check-label" for="yes">Yes</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="isLoopService" id="no" value="No"
                     checked={standardEstimate.isLoopService==="No"}  disabled/>
              <label className="form-check-label" for="no">No</label>
            </div>
          </div>
        </div>
        {/* <div className="form-group row">
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
        </div> */}
        {/* <div className="form-group row">
          <label for="isStandardVc" className="col-sm-3 col-form-label">Is Variable Cost Calculate According to Stantards?</label>
          <div className="col-sm-3 col-form-label">
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="isStandardVc" id="yes" value="Yes"
                     checked={standardEstimate.isStandardVc==="Yes"}  disabled/>
              <label className="form-check-label" for="yes">Yes</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="isStandardVc" id="no" value="No"
                     checked={standardEstimate.isStandardVc==="No"}  disabled/>
              <label className="form-check-label" for="no">No</label>
            </div>
          </div>
        </div> */}
        <br></br>
        <button className="btn btn-secondary" type="button" onClick={prevStep}>Previous</button>
        <button className="btn btn-primary float-right" type="submit" >Next</button>
        </Form>
      </div>
    );
  }
  
  function Step3(props) {
    const {handleChange, standardEstimate,nextStep,prevStep}=props;
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
            <Input type="number" name="serviceLength" id="serviceLength" value={(standardEstimate.serviceLength!=null)?standardEstimate.serviceLength:0}
                   min="0" step=".01" readOnly/>
          </div>
          <label for="lineLength" className="col-sm-3 col-form-label">Total Line Length(m)</label>
          <div className="col-sm-3">
            <Input type="number" name="lineLength" id="lineLength" value={standardEstimate.lineLength=(Number(standardEstimate.serviceLength)+Number(standardEstimate.conductorLength))}
                   min="0" step=".01" readOnly/>
          </div>
        </div>
        <div className="form-group row">
          <label for="conductorType" className="col-sm-3 col-form-label">Conductor Type</label>
          <div className="col-sm-3 col-form-label">
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="conductorType" id="ABC" value="ABC"
                     checked={standardEstimate.conductorType==="ABC"}  disabled/>
              <label className="form-check-label" for="ABC">ABC 3&#215;70+54.6mm<sup>2</sup></label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="conductorType" id="ABC2" value="ABC2"
                     checked={standardEstimate.conductorType==="ABC2"}  disabled/>
              <label className="form-check-label" for="ABC2">ABC 3&#215;95+70mm<sup>2</sup></label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="conductorType" id="FLY" value="FLY"
                     checked={standardEstimate.conductorType==="FLY"}  disabled/>
              <label className="form-check-label" for="FLY">FLY</label>
            </div>
          </div>
          <label for="conductorLength" className="col-sm-3 col-form-label">Conductor Wire Length(m)</label>
          <div className="col-sm-3">
            <Input type="number" name="conductorLength" id="conductorLength" value={(standardEstimate.conductorLength!=null)?standardEstimate.conductorLength:0}
                   min="0" step=".01" readOnly/>
          </div>
        </div>
        <div className="form-group row">
          <label for="insideLength" className="col-sm-3 col-form-label">Length Inside the Premises(m)</label>
          <div className="col-sm-3">
            <Input type="number" name="insideLength" id="insideLength" value={(standardEstimate.insideLength!=null)?standardEstimate.insideLength:0}
                   min="0" step=".01" readOnly/>
          </div>
          <label for="secondCircuitLength" className="col-sm-3 col-form-label">Second Circuit Length(m)</label>
          <div className="col-sm-3">
            <Input type="number" name="secondCircuitLength" id="secondCircuitLength" value={(standardEstimate.secondCircuitLength!=null)?standardEstimate.secondCircuitLength:0}
                   min="0" step=".01" readOnly/>
          </div>
        </div>
        <div className="form-group row">
          <label for="conversionLength" className="col-sm-3 col-form-label">1P-3P Line Conversion Length(m)</label>
          <div className="col-sm-3">
            <Input type="number" name="conversionLength" id="conversionLength" value={(standardEstimate.conversionLength!=null)?standardEstimate.conversionLength:0}
                   min="0" step=".01" readOnly/>
          </div>
          <label for="conversionLength2p" className="col-sm-3 col-form-label">2P-3P Line Conversion Length(m)</label>
          <div className="col-sm-3">
            <Input type="number" name="conversionLength2p" id="conversionLength2p" value={(standardEstimate.conversionLength2p!=null)?standardEstimate.conversionLength2p:0}
                   min="0" step=".01" readOnly/>
          </div>
        </div>
        <div className="form-group row">  
          <label for="span" className="col-sm-3 col-form-label">No of Spans(For Service Length)</label>
          <div className="col-sm-3">
            <Input type="number" name="span" id="span" value={(standardEstimate.span!=null)?standardEstimate.span:0} 
                   min="0" step=".01" readOnly/>
          </div>
          <label for="poleNo" className="col-sm-3 col-form-label">No of Poles</label>
          <div className="col-sm-3">
            <Input type="number" name="poleNo" id="poleNo" value={(standardEstimate.poleNo!=null)?standardEstimate.poleNo:0} 
                  min="0" max="99" readOnly/>
          </div>
        </div>
        <div className="form-group row">   
          <label for="stayNo" className="col-sm-3 col-form-label">No of Stays</label>
          <div className="col-sm-3">
            <Input type="number" name="stayNo" id="stayNo" value={(standardEstimate.stayNo!=null)?standardEstimate.stayNo:0} 
                  min="0" max="99" readOnly/>
          </div>
          <label for="strutNo" className="col-sm-3 col-form-label">No of Struts</label>
          <div className="col-sm-3">
            <Input type="number" name="strutNo" id="strutNo" value={(standardEstimate.strutNo)?standardEstimate.strutNo:0} 
                  min="0" max="99" readOnly/>
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
      this.getTotalCostForNBT=this.getTotalCostForNBT.bind(this);
      this.getTotalCostForVAT=this.getTotalCostForVAT.bind(this);
    }
    getTotalCostForNBT(){
      const standardEstimate=this.props.standardEstimate;
      const totalCostNBT= standardEstimate.fixedCost+standardEstimate.variableCost+
                      standardEstimate.processingFee +standardEstimate.otherMatCost+
                      standardEstimate.otherLabourCost+standardEstimate.capitalCost+standardEstimate.conversionCost;
      // Number(standardEstimate.fixedCost)+Number(standardEstimate.variableCost)
      // +Number(standardEstimate.processingFee)+Number(standardEstimate.fixedCost)
      // +Number(standardEstimate.otherMatCost)+Number(standardEstimate.otherLabourCost)+Number(standardEstimate.capitalCost)+Number(standardEstimate.conversionCost);

      return totalCostNBT;
    }

    getTotalCostForVAT(){
      const standardEstimate=this.props.standardEstimate;
      const totalCostVAT=this.getTotalCostForNBT()+standardEstimate.nbtAmount;
      return totalCostVAT;
    }
    render() {    
      const {currentStep,standardEstimate,pcesthtt,nextStep,prevStep}=this.props;
      // const {poleList}=this.state;
  
     
      if (currentStep !== 4) {
        return null
      } 
      return (
        <React.Fragment>
        <h4>Standard Estimate</h4>
        <hr className="line"></hr>
        <br></br>
        <Form>
        <div className="form-group row">
          <label for="fixedCost" className="col-sm-3 col-form-label">Fixed Cost</label>
          <div className="col-sm-3">
            <Input type="number" name="fixedCost" id="fixedCost" value={(standardEstimate.fixedCost!=null)?standardEstimate.fixedCost.toFixed(2):(0).toFixed(2)} 
                   min="0" step=".01" autoComplete="fixedCost" className="text-right" readOnly/>
          </div>
          <label for="catCd" className="col-sm-3 col-form-label">Category Code</label>
          <div className="col-sm-3">
            <Input type="text" name="catCd" id="catCd" value={pcesthtt.catCd} 
                   autoComplete="catCd" required/>
          </div>
        </div>
        {/* <div className="row">
        <div className="col-sm-3">
        </div>
        <div className="col-sm-6"> */}
        
        <div className="form-group row">
          <label for="variableCost" className="col-sm-3 col-form-label">Variable Cost</label>
          <div className="col-sm-3">
            <Input type="number" name="variableCost" id="variableCost" value={(standardEstimate.variableCost!=null)?standardEstimate.variableCost.toFixed(2):(0).toFixed(2)} 
                   min="0" autoComplete="variableCost" className="text-right" readOnly/>
          </div>
          <label for="fundSource" className="col-sm-3 col-form-label">Fund Source & ID</label>
          <div className="col-sm-3">
            <Input type="text" name="fundSource" id="fundSource" value={pcesthtt.fundSource} 
                   autoComplete="fundSource" required/>
          </div>
        </div>
        <div className="form-group row">
          <label for="processingFee" className="col-sm-3 col-form-label">Processing Fee</label>
          <div className="col-sm-3">
            <Input type="number" name="processingFee" id="processingFee" value={(standardEstimate.processingFee!=null)?standardEstimate.processingFee.toFixed(2):(0).toFixed(2)} 
                   min="0"  autoComplete="processingFee" className="text-right" readOnly/>
          </div>
        </div>
        <div className="form-group row">
          <label for="otherMatCost" className="col-sm-3 col-form-label">Other Cost</label>
          <div className="col-sm-3">
            <Input type="number" name="otherMatCost" id="otherMatCost" value={(standardEstimate.otherMatCost!=null)?standardEstimate.otherMatCost.toFixed(2):(0).toFixed(2)} 
                   min="0"  autoComplete="otherMatCost" className="text-right" readOnly/>
          </div>
          <div className="col-sm-3">
            (Material)
          </div>
        </div>
        <div className="form-group row">
          <label for="otherLabourCost" className="col-sm-3 col-form-label"></label>
          <div className="col-sm-3">
            <Input type="number" name="otherLabourCost" id="otherLabourCost" value={(standardEstimate.otherLabourCost!=null)?standardEstimate.otherLabourCost.toFixed(2):(0).toFixed(2)} 
                   min="0" autoComplete="otherLabourCost" className="text-right" readOnly/>
          </div>
          <div className="col-sm-3">
            (Labour)
          </div>
        </div>
        <div className="form-group row">
          <label for="capitalCost" className="col-sm-3 col-form-label">Capital Cost</label>
          <div className="col-sm-3">
            <Input type="number" name="capitalCost" id="capitalCost" value={(standardEstimate.capitalCost!=null)?standardEstimate.capitalCost.toFixed(2):(0).toFixed(2)} 
                   min="0" autoComplete="capitalCost" className="text-right" readOnly/>
          </div>
        </div>
        <div className="form-group row">
          <label for="conversionCost" className="col-sm-3 col-form-label">Conversion Cost</label>
          <div className="col-sm-3">
            <Input type="number" name="conversionCost" id="conversionCost" value={(standardEstimate.conversionCost!=null)?standardEstimate.conversionCost.toFixed(2):(0).toFixed(2)} 
                   min="0" autoComplete="conversionCost" className="text-right" readOnly/>
          </div>
        </div>
        <div className="form-group row">
          <label for="matQty" className="col-sm-3 col-form-label font-weight-bold">Total Cost for NBT</label>
          <div className="col-sm-3">
            <Input type="number" name="matQty" id="matQty" value={this.getTotalCostForNBT().toFixed(2)} 
                   min="0" autoComplete="matQty" className="text-right" readOnly/>
          </div>
        </div>
        <div className="form-group row">
          <label for="nbtAmount" className="col-sm-3 col-form-label">Nation Building Tax(NBT)</label>
          <div className="col-sm-3">
            <Input type="number" name="nbtAmount" id="nbtAmount" value={(standardEstimate.nbtAmount!=null)?standardEstimate.nbtAmount.toFixed(2):(0).toFixed(2)} 
                   min="0" autoComplete="nbtAmount" className="text-right" readOnly/>
          </div>
          <span>&#215;</span>
          <div className="col-sm-2">
            <Input type="number" name="nbtPresent" id="nbtPresent" value={(standardEstimate.nbtPresent!=null)?standardEstimate.nbtPresent.toFixed(2):(0).toFixed(2)} 
                   min="0" autoComplete="nbtPresent" className="text-right" readOnly/>
          </div>
          <span>%</span>
          {/* <div className="col-sm-3">
            &#215; {standardEstimate.nbtPresent.toFixed(2)} %
          </div> */}
        </div>
        <div className="form-group row">
          <label for="matQty" className="col-sm-3 col-form-label font-weight-bold">Total Cost for VAT</label>
          <div className="col-sm-3">
            <Input type="number" name="matQty" id="matQty" value={this.getTotalCostForVAT().toFixed(2)} 
                   min="0" autoComplete="matQty" className="text-right" readOnly/>
          </div>
        </div>
        <div className="form-group row">
          <label for="taxAmount" className="col-sm-3 col-form-label">VAT Amount</label>
          <div className="col-sm-3">
            <Input type="number" name="taxAmount" id="taxAmount" value={(standardEstimate.taxAmount!=null)?standardEstimate.taxAmount.toFixed(2):(0).toFixed(2)} 
                   min="0" autoComplete="taxAmount" className="text-right" readOnly/>
          </div>
          <span>&#215;</span>
          <div className="col-sm-2">
            <Input type="number" name="taxPresent" id="taxPresent" value={(standardEstimate.taxPresent!=null)?standardEstimate.taxPresent.toFixed(2):(0).toFixed(2)} 
                   min="0" autoComplete="taxPresent" className="text-right" readOnly/>
          </div>
          <span>%</span>
          {/* <div className="col-sm-3">
            &#215; {standardEstimate.taxPresent.toFixed(2)} %
          </div> */}
        </div>
        <div className="form-group row">
          <label for="securityDeposit" className="col-sm-3 col-form-label">Security Deposit</label>
          <div className="col-sm-3">
            <Input type="number" name="securityDeposit" id="securityDeposit" value={(standardEstimate.securityDeposit!=null)?standardEstimate.securityDeposit.toFixed(2):(0).toFixed(2)} 
                   min="0" autoComplete="securityDeposit" className="text-right" readOnly/>
          </div>
        </div>
        <div className="form-group row">
          <label for="addlDeposit" className="col-sm-3 col-form-label">Add1 Security Deposit</label>
          <div className="col-sm-3">
            <Input type="number" name="addlDeposit" id="addlDeposit" value={(standardEstimate.addlDeposit!=null)?standardEstimate.addlDeposit.toFixed(2):(0).toFixed(2)} 
                   min="0" autoComplete="addlDeposit" className="text-right" readOnly/>
          </div>
        </div>
        <div className="form-group row">
          <label for="totalCost" className="col-sm-3 col-form-label font-weight-bold">Estimated Total Cost</label>
          <div className="col-sm-3">
            <Input type="number" name="totalCost" id="totalCost" value={(standardEstimate.totalCost!=null)?standardEstimate.totalCost.toFixed(2):(0).toFixed(2)} 
                   min="0" autoComplete="totalCost" className="text-right" readOnly/>
          </div>
        </div>
        <div style={{color:'blue'}}>Variable cost is calculated using <b>{standardEstimate.isStandardVc=="Yes"?"Standard":"Non Standard"}</b> Method</div>
        <br></br>
        <div style={{color:'blue'}}>Estimated with <b>{pcesthtt.estimatedYear}</b> Standard Contruction Rates</div>

        {/* </div>
        </div> */}
        <br></br>
        <button className="btn btn-secondary" type="button" onClick={prevStep}>Previous</button>
        <button className="btn btn-primary float-right" type="submit" onClick={nextStep}>Next</button>
        </Form>
      </React.Fragment>
      );
    }  
  
  }

  
  class Step5 extends React.Component {
    constructor(props) {
      super(props)
      this.getTotalEstimateCost=this.getTotalEstimateCost.bind(this);
      this.getTotalFundCost=this.getTotalFundCost.bind(this);
      this.getTotalCustomerCost=this.getTotalCustomerCost.bind(this);

    }
    
   
    getTotalEstimateCost(){
      const materialCostList=this.props.materialCostList;
     
      let totalEstimateCost=0;
      for(var i=0;i<materialCostList.length;i++){
        totalEstimateCost=totalEstimateCost+materialCostList[i].estimateCost;
      }
      return totalEstimateCost;
    }

    getTotalFundCost(){
      const materialCostList=this.props.materialCostList;
      let totalFundCost=0;
      for(var i=0;i<materialCostList.length;i++){
        totalFundCost=totalFundCost+materialCostList[i].fundCost;
      }
      return totalFundCost;
    }

    getTotalCustomerCost(){
      const materialCostList=this.props.materialCostList;
      let totalCustomerCost=0;
      for(var i=0;i<materialCostList.length;i++){
        totalCustomerCost=totalCustomerCost+materialCostList[i].customerCost;
      }
      return totalCustomerCost;
    }
    
    render() {    
      const {currentStep,materialCostList,nextStep,prevStep}=this.props;

      const materialCostTable = materialCostList.map(materialCost => {
      
        return <tr >
          <td>{materialCost.resCd}</td>
          <td>{materialCost.resType}</td>
          <td>{materialCost.resCat}</td>
          <td>{materialCost.resName}</td>
          <td>{materialCost.uom}</td>
          <td className="text-right">{(materialCost.unitPrice!=null)?materialCost.unitPrice.toFixed(2):(0).toFixed(2)}</td>
          <td className="text-right">{(materialCost.estimateQty!=null)?materialCost.estimateQty:0}</td>
          <td className="text-right">{materialCost.estimateCost.toFixed(2)}</td>
          <td className="text-right">{(materialCost.fundQty!=null)?materialCost.fundQty:0}</td>
          <td className="text-right">{materialCost.fundCost.toFixed(2)}</td>
          <td className="text-right">{(materialCost.customerQty!=null)?materialCost.customerQty:0}</td>
          <td className="text-right">{materialCost.customerCost.toFixed(2)}</td>

          
        </tr>
      });
      if (currentStep !== 5) {
        return null
      } 
      return (
        <React.Fragment>
          <h4>Material Costs</h4>
          <hr className="line"></hr>
       <br></br>
        <Table className="mt-4 table-bordered">
            <thead>
            <tr>
              <th>Res. Code</th>
              <th>Res. Type</th>
              <th>Res. Cat</th>
              <th>Res. Name</th>
              <th>UOM</th>
              <th>Unit Price</th>
              <th>Est. Qty</th>
              <th>Est. Cost</th>
              <th>Qty.(CEB Fund)</th>
              <th>Cost(CEB Fund)</th>
              <th>Customer Qty.</th>
              <th>Customer Cost</th>


            </tr>
            </thead>
            <tbody>
              {materialCostTable}
              <tr>
                <td colspan="7" className="font-weight-bold text-right">Total Cost</td>
                <td className="text-right">{this.getTotalEstimateCost().toFixed(2)}</td>
                <td></td>
                <td className="text-right">{this.getTotalFundCost().toFixed(2)}</td>
                <td></td>
                <td className="text-right">{this.getTotalCustomerCost().toFixed(2)}</td>
              </tr>
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
      this.getTotalLabourHrs=this.getTotalLabourHrs.bind(this);
      this.getTotalcebLabourCost=this.getTotalcebLabourCost.bind(this);
    }  
    
    getTotalLabourHrs(){
      const labourCostList=this.props.labourCostList;
      let total=0;
      for(var i=0; i<labourCostList.length;i++){
        total=total+labourCostList[i].labourHours;
      }
      return total;
    }

    getTotalcebLabourCost(){
      const labourCostList=this.props.labourCostList;
      let total=0;
      for(var i=0; i<labourCostList.length;i++){
        total=total+labourCostList[i].cebLabourCost;
      }
      return total;
    }
    
    render() {    
      const {currentStep,labourCostList,prevStep,deleteServiceEstimate}=this.props;
     
      const labourCostTable = labourCostList.map(labourCost => {
      
        return <tr>
          <td>{labourCost.id.labourCode}</td>
          <td>{labourCost.activityDescription}</td>
          <td className="text-right">{(labourCost.unitLabourHrs!=null)?labourCost.unitLabourHrs:0}</td>
          <td className="text-right">{(labourCost.cebUnitPrice!=null)?labourCost.cebUnitPrice:0}</td>
          <td className="text-right">{(labourCost.itemQty!=null)?labourCost.itemQty:0}</td>
          <td className="text-right">{(labourCost.labourHours!=null)?labourCost.labourHours.toFixed(2):(0).toFixed(2)}</td>
          <td className="text-right">{(labourCost.cebLabourCost!=null)?labourCost.cebLabourCost.toFixed(2):(0).toFixed(2)}</td>
          
        </tr>
      });
      if (currentStep !== 6) {
        return null
      } 
      return (
        <React.Fragment>
          <h4>Labour Costs</h4>
          <hr className="line"></hr>
       <br></br>
        <Table className="mt-4 table-bordered">
            <thead>
            <tr>
              <th>Labour Code</th>
              <th>Description</th>
              <th>Unit Labour Hrs.</th>
              <th>Labour Rate</th>
              <th>Qty.</th>
              <th>Total Labour Hrs.</th>
              <th>Labour Cost</th>
            </tr>
            </thead>
            <tbody>
              {labourCostTable}
              <tr>
                <td colspan="5" className="font-weight-bold text-right">Total Cost</td>
                <td className="text-right">{this.getTotalLabourHrs().toFixed(2)}</td>
                <td className="text-right">{this.getTotalcebLabourCost().toFixed(2)}</td>
              </tr>
            </tbody>
        </Table>
        <br></br>
        <button className="btn btn-secondary" type="button" onClick={prevStep}>Previous</button>
        {/* <button className="btn btn-danger float-right" type="button" onClick={deleteServiceEstimate}>Delete</button> */}
      </React.Fragment>
      );
    }  
  
  }
export default EstimateView;