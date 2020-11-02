import React from 'react';
import { Button,ButtonGroup, Container, Form, FormGroup, Input, Label, Table } from 'reactstrap';
import Swal from 'sweetalert2';
import '../../css/Estimation.css'
import { switchCase } from '@babel/types';
import {estimateStatus} from '../Estimate/EstimateStatus'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

class JobRevise extends React.Component {

  emptyIdGroup={
    jobNo:'',
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
  emptyPcesthmt={
    id:{
      estimateNo:'',
      deptId:'',
      revNo:''
    },
    CatCd:'',
    estimatedYear:'',
    etimateDt:'',
    fundSource:'',
    lbRateYear:'',
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
    totalCost:0,
    updUser:''
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
        pcesthmt:this.emptyPcesthmt,
        idGroup:this.emptyIdGroup,
        jobNoList:[],
        materialCostList:[],
        labourCostList:[],
        searched:false,
        isParams:false,
        labourRates:[],
        filteredLabourRates:[],
        isLabourRates:false,
        filterLabourRates:'',
        filterOnLabourRates:'labourCode',
        currentPageOfLabourRates:0,
        selectedLabourCodes:[],
        selectedLabourCosts:[],
        materials:[],
        filteredMaterials:[],
        isMaterials:false,
        filterMaterials:'',
        filterOnMaterials:'matCode',
        currentPageOfMaterials:0,
        selectedMatCodes:[],
        selectedResCodes:[]
        
      };
   
      this.handleChangeIdGroup=this.handleChangeIdGroup.bind(this);
      this.toInputUppercase=this.toInputUppercase.bind(this);
      this.getData=this.getData.bind(this);
      this.goToStep=this.goToStep.bind(this);
      this.setMaterialCostsToTable=this.setMaterialCostsToTable.bind(this);
      this.setLabourCostsToTable=this.setLabourCostsToTable.bind(this);
     
     
      this.getCatCd=this.getCatCd.bind(this);
      this.getLabourRates=this.getLabourRates.bind(this);
      this.filterLabourTable=this.filterLabourTable.bind(this);
      this.handleFilterLabourRates=this.handleFilterLabourRates.bind(this);
      this.handleFilterOnLabourRates=this.handleFilterOnLabourRates.bind(this);
      this.handlePageClickLabourRates=this.handlePageClickLabourRates.bind(this);
      this.addToLabourCosts=this.addToLabourCosts.bind(this);
      this.removeFromLabourCosts=this.removeFromLabourCosts.bind(this);
      this.handleLabourCostRow=this.handleLabourCostRow.bind(this);

      this.getMaterials=this.getMaterials.bind(this);
      this.filterMaterialTable=this.filterMaterialTable.bind(this);
      this.handleFilterMaterials=this.handleFilterMaterials.bind(this);
      this.handleFilterOnMaterials=this.handleFilterOnMaterials.bind(this);
      this.handlePageClickMaterials=this.handlePageClickMaterials.bind(this);
      this.addToMaterialCosts=this.addToMaterialCosts.bind(this);
      this.removeFromMaterialCosts=this.removeFromMaterialCosts.bind(this);
      this.handleMaterialCostRow=this.handleMaterialCostRow.bind(this);

      this.handleChangeStandardEstimate=this.handleChangeStandardEstimate.bind(this);
      this.getTotalCostForNBT=this.getTotalCostForNBT.bind(this);
      this.getTotalCostForVAT=this.getTotalCostForVAT.bind(this);
      this.getEstimatedTotalCost=this.getEstimatedTotalCost.bind(this);
      this.handleSubmit=this.handleSubmit.bind(this);

    }

    async componentDidMount() {
      
      let idGroup=this.state.idGroup;
      idGroup.costCenter=sessionStorage.getItem('costCenterNo');
      idGroup.catCd=this.getCatCd(sessionStorage.getItem('jobType'));
      await this.setState({idGroup})

      await fetch(`/pcesthmt/findProjectNoByStatusAndDeptIdAndCatCd?status=${estimateStatus.JOB_RIVISION}&deptId=${this.state.idGroup.costCenter}&catCd=${this.state.idGroup.catCd}`)
      .then(response => response.json())
      .then(data => this.setState({jobNoList: data.sort()}));
     
      let isActive=this.state.isActive;
      isActive[0]='active';
      this.setState({isActive});
    
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

  toInputUppercase(e) {
    e.target.value = ("" + e.target.value).toUpperCase();
  };
   

  async getData(){
    if(this.state.idGroup.jobNo){
      let pcesthmt = await fetch(`/pcesthmt/findByProjectNo?projectNo=${this.state.idGroup.jobNo}`);
      if(pcesthmt.status==200){
        pcesthmt=await (pcesthmt).json();
        console.log(pcesthmt.id.estimateNo)
        this.setState({pcesthmt},()=>console.log(this.state.pcesthmt));

      let application = await fetch(`/application/findByApplicationNo?applicationNo=${pcesthmt.id.estimateNo.trim()}`);
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
    
        let standardEstimate = await fetch(`/speststd/findByIdEstimateNo?estimateNo=${pcesthmt.id.estimateNo.trim()}`);
        if(standardEstimate.status==200){
          standardEstimate =await (standardEstimate).json();
          if(standardEstimate.nbtPresent){
            standardEstimate.nbtPresent=standardEstimate.nbtPresent.toFixed(2);
          }else{
            standardEstimate.nbtPresent=(0).toFixed(2);
          }
          if(standardEstimate.taxPresent){
            standardEstimate.taxPresent=standardEstimate.taxPresent.toFixed(2);
          }else{
            standardEstimate.taxPresent=(0).toFixed(2);
          }
          if(standardEstimate.addlDeposit){
            standardEstimate.addlDeposit=standardEstimate.addlDeposit.toFixed(2);
          }else{
            standardEstimate.addlDeposit=(0).toFixed(2);
          }
          
          this.setState({standardEstimate},()=>console.log(this.state.standardEstimate));
        }else{
          await Swal.fire(
            'Error!',
            "Sketch and Standard Estimate doesn't exist",
            'error',
            
          )
        }

        // let pcesthtt = await fetch(`/pcesthtt/findByIdEstimateNoAndIdRevNo?estimateNo=${this.state.idGroup.estimationNo}&revNo=1`);
        // if(pcesthtt.status==200){
        //   pcesthtt=await (pcesthtt).json();
        //   this.setState({pcesthtt},()=>console.log(this.state.pcesthtt));
        // }else{
        //   await Swal.fire(
        //     'Error!',
        //     "Header details doesn't exist",
        //     'error',
          
        //   )
        // }
        

        const materialCostList = await (await fetch(`/pcestdmt/findByIdEstimateNo?estimateNo=${pcesthmt.id.estimateNo.trim()}`)).json();
        // this.setState({materialCostList},()=>console.log(this.state.materialCostList));
        this.setMaterialCostsToTable(materialCostList);

        const labourCostList = await (await fetch(`/spestlab/findByIdEstimateNo?estimateNo=${pcesthmt.id.estimateNo.trim()}`)).json();
        this.setLabourCostsToTable(labourCostList);
        // this.setState({labourCostList},()=>console.log(this.state.labourCostList));
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
    }else if(pcesthmt.status==404){
        await Swal.fire(
          'Error!',
          "Job Number doesn't exist",
          'error',
        
        )
      }
    }else{
      this.clearForm();
    }
  }

  async setMaterialCostsToTable(list){
    let materialCostList=[]
    
    for(var i=0;i<list.length;i++){
      const resNm=await (await fetch(`/inmatm/findMatNmByMatCd?matCd=${list[i].id.resCd}`)).text();
      const materialCost={
        resCd:list[i].id.resCd.trim(),
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

  async setLabourCostsToTable(list){
    let labourCostList=[]
    
    for(var i=0;i<list.length;i++){
      const labourCost={
        labourCode:list[i].id.labourCode,
        activityDescription:list[i].activityDescription,
        unitLabourHrs:list[i].unitLabourHrs,
        cebUnitPrice:list[i].cebUnitPrice,
        itemQty:list[i].itemQty,
        labourHours:list[i].labourHours,
        cebLabourCost:list[i].cebLabourCost,
       
      }
      labourCostList.push(labourCost);
    }
    this.setState({labourCostList});
  }

  async getLabourRates(){
    
    await fetch(`/labour/findByIdDeptIdAndIdYear?deptId=${this.state.pcesthmt.id.deptId}&year=${this.state.pcesthmt.lbRateYear}`)
    .then(response => response.json())
    .then(data => this.setState({labourRates: data,filteredLabourRates:data,isLabourRates:true},()=>console.log(this.state.labourRates)));
  }

  handleFilterLabourRates(e){
    this.setState({filterLabourRates:e.target.value,currentPageOfLabourRates:0},()=>this.filterLabourTable())
  }

  handleFilterOnLabourRates(e){
    this.setState({filterOnLabourRates:e.target.value,currentPageOfLabourRates:0},()=>this.filterLabourTable())

  }


  filterLabourTable(){
    var filterLabourRates,data, i;
    var filteredLabourRates=[];
    const {labourRates}=this.state;
    filterLabourRates = this.state.filterLabourRates.toUpperCase();

    for (i = 0; i < labourRates.length; i++) {
      if(this.state.filterOnLabourRates=='labourCode'){
        data = labourRates[i].id.labourCode;
      }else{
        data = labourRates[i].description;
      }
      
      if (data.toUpperCase().indexOf(filterLabourRates) > -1) {
        filteredLabourRates.push(labourRates[i]);
      } 
    }
    this.setState({filteredLabourRates})
  }

  handlePageClickLabourRates(e, index) {
    e.preventDefault()
    this.setState({
      currentPageOfLabourRates: index
    });
    
  }

  addToLabourCosts(){
    const {labourCostList, labourRates, selectedLabourCodes}=this.state;
    var isLabour=false;
    for(var i=0;i<labourRates.length;i++){
      if(selectedLabourCodes.includes(labourRates[i].id.labourCode)){
        for(var j=0;j<labourCostList.length;j++){
          if(labourCostList[j].labourCode==labourRates[i].id.labourCode){
            isLabour=true;
            break;
          }else{
            isLabour=false;
          }
        }
        if(isLabour==false){
          const labour=labourRates[i];
          const labourCost={
           labourCode:labour.id.labourCode,
           activityDescription:labour.description,
           unitLabourHrs:labour.labourHours,
           cebUnitPrice:labour.unitPrice,
           itemQty:0,
           labourHours:0,
           cebLabourCost:0
          }
          labourCostList.push(labourCost);
        }
      }
    }
    this.setState({labourCostList,selectedLabourCodes:[]},()=>console.log(this.state.selectedLabourCodes));
  }

  removeFromLabourCosts(){
    const {labourCostList, selectedLabourCosts}=this.state;
    var n=labourCostList.length;
    var i=0;
    while(i<n){
      if(selectedLabourCosts.includes(labourCostList[i].labourCode)){
        labourCostList.splice(i,1);
        n--;
      }else{
        i++;
      }
    }
    this.setState({labourCostList,selectedLabourCosts:[]});
    
  }

  handleLabourCostRow(labourCost,event){
    const target = event.target;
    const value = target.value;
    const name = target.name;
  
    var labourCostList = this.state.labourCostList;
    var newLabourCostList=labourCostList.map((row,i)=>{
      if(row.labourCode==labourCost.labourCode){
          row[name]=value;
          row.labourHours=row.unitLabourHrs*row.itemQty;
          row.cebLabourCost=row.labourHours*row.cebUnitPrice;
      }
      return row;
      
    })
 
    this.setState({labourCostList:newLabourCostList});
    
  }

  async getMaterials(){
    await fetch(`/inwrhmtm/getMaterials?warehouse=${this.state.pcesthmt.id.deptId}`)
    .then(response => response.json())
    .then(data => this.setState({materials: data,filteredMaterials:data,isMaterials:true},()=>console.log(this.state.materials)));
  }

  handleFilterMaterials(e){
    this.setState({filterMaterials:e.target.value,currentPageOfMaterials:0},()=>this.filterMaterialTable())
  }

  handleFilterOnMaterials(e){
    this.setState({filterOnMaterials:e.target.value,currentPageOfMaterials:0},()=>this.filterMaterialTable())

  }


  filterMaterialTable(){
    var filterMaterials,data, i;
    var filteredMaterials=[];
    const {materials}=this.state;
    filterMaterials = this.state.filterMaterials.toUpperCase();

    for (i = 0; i < materials.length; i++) {
      if(this.state.filterOnMaterials=='matCode'){
        data = materials[i][0];
      }else{
        data = materials[i][3];
      }
      
      if (data.toUpperCase().indexOf(filterMaterials) > -1) {
        filteredMaterials.push(materials[i]);
      } 
    }
    this.setState({filteredMaterials})
  }


  handlePageClickMaterials(e, index) {
    e.preventDefault()
    this.setState({
      currentPageOfMaterials: index
    });
    
  }

  addToMaterialCosts(){
    const {materialCostList, materials, selectedMatCodes}=this.state;
    var isMaterial=false;
    for(var i=0;i<materials.length;i++){
      if(selectedMatCodes.includes(materials[i][0])){
        for(var j=0;j<materialCostList.length;j++){
          if(materialCostList[j].resCd==materials[i][0]){
            isMaterial=true;
            break;
          }else{
            isMaterial=false;
          }
        }
        if(isMaterial==false){
          const material=materials[i];
          const materialCost={
            resCd:material[0],
            resType:'MAT-COST',
            resCat:1,
            resName:material[3],
            uom:material[1],
            unitPrice:material[2],
            estimateQty:0,
            estimateCost:0,
            fundQty:0,
            fundCost:0,
            customerQty:0,
            customerCost:0
          }
          materialCostList.push(materialCost);
        }
      }
    }
    this.setState({materialCostList,selectedMatCodes:[]},()=>console.log(this.state.selectedMatCodes));
  }

  removeFromMaterialCosts(){
    const {materialCostList, selectedResCodes}=this.state;
    var n=materialCostList.length;
    var i=0;
    while(i<n){
      if(selectedResCodes.includes(materialCostList[i].resCd)){
        materialCostList.splice(i,1);
        n--;
      }else{
        i++
      }
    }
    this.setState({materialCostList,selectedResCodes:[]});
    
  }

  handleMaterialCostRow(materialCost,event){
    const target = event.target;
    const value = target.value;
    const name = target.name;
  
    var materialCostList = this.state.materialCostList;
    var newMaterialCostList=materialCostList.map((row,i)=>{
      if(row.resCd==materialCost.resCd){
          row[name]=value;
          if(name=='estimateQty'){
            row.estimateCost=row.unitPrice*row.estimateQty;
          }else if(name=='fundQty'){
            row.fundCost=row.unitPrice*row.fundQty;
          }else if(name=='customerQty'){
            row.customerCost=row.unitPrice*row.customerQty
          }
      }
      return row;
      
    })
 
    this.setState({materialCostList:newMaterialCostList});
    
  }

  handleChangeStandardEstimate(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let standardEstimate = {...this.state.standardEstimate};
    standardEstimate[name] = value;
    standardEstimate.id[name]=value;
    if(name=="nbtPresent"){
      standardEstimate.nbtAmount=this.getTotalCostForNBT()*(standardEstimate.nbtPresent/100)
    }else if(name=="taxPresent"){
      standardEstimate.taxAmount=this.getTotalCostForVAT()*(standardEstimate.taxPresent/100)
    }
    
    this.setState({standardEstimate});
}

  getTotalCostForNBT(){
    const standardEstimate=this.state.standardEstimate;
    const totalCostNBT= standardEstimate.fixedCost+standardEstimate.variableCost+
                    standardEstimate.processingFee +standardEstimate.otherMatCost+
                    standardEstimate.otherLabourCost+standardEstimate.capitalCost+standardEstimate.conversionCost;
    return totalCostNBT;
  }

  getTotalCostForVAT(){
    const standardEstimate=this.state.standardEstimate;
    const totalCostVAT=this.getTotalCostForNBT()+standardEstimate.nbtAmount;
    return totalCostVAT;
  }

  getEstimatedTotalCost(){
    const standardEstimate=this.state.standardEstimate;
    const estimatedTotalCost=this.getTotalCostForVAT()+standardEstimate.taxAmount+standardEstimate.securityDeposit+parseFloat(standardEstimate.addlDeposit);
    return estimatedTotalCost;
  }

  async handleSubmit(event){
    event.preventDefault()
    let isCompleted=this.state.isCompleted;
    isCompleted[5]='completed';
    this.setState({isCompleted});

    const message= await Swal.fire({
      title: 'Are you sure?',
      // text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, save it!'
    })
    if(message.value){
    const { standardEstimate,idGroup,pcesthmt,materialCostList, labourCostList} = this.state;
   
    let selectedMaterialCosts=[];
    let selectedlabourCosts=[];
   
    standardEstimate.updUser=sessionStorage.getItem('userName');
    for(var i=0;i<materialCostList.length;i++){
      const materialCost={
        id:{
          estimateNo:pcesthmt.id.estimateNo.trim(),
          revNo:1,
          deptId:pcesthmt.id.deptId,
          resCd:materialCostList[i].resCd

        },
        resType:materialCostList[i].resType,
        resCat:materialCostList[i].resCat,
        uom:materialCostList[i].uom,
        unitPrice:materialCostList[i].unitPrice,
        estimateQty:materialCostList[i].estimateQty,
        fundQty:materialCostList[i].fundQty,
        customerQty:materialCostList[i].customerQty
      }
      selectedMaterialCosts.push(materialCost)
    }

    for(var i=0;i<labourCostList.length;i++){
      const labourCost={
        id:{
          estimateNo:pcesthmt.id.estimateNo.trim(),
          deptId:pcesthmt.id.deptId,
          labourCode:labourCostList[i].labourCode
        },
        activityDescription:labourCostList[i].activityDescription,
        unitLabourHrs:labourCostList[i].unitLabourHrs,
        cebUnitPrice:labourCostList[i].cebUnitPrice,
        itemQty:labourCostList[i].itemQty,
        labourHours:labourCostList[i].labourHours,
        cebLabourCost:labourCostList[i].cebLabourCost
      }
      selectedlabourCosts.push(labourCost)
    }

    const response=await fetch('/job/revise', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
         'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        speststd:standardEstimate,
        pcestdmt:selectedMaterialCosts,
        spestlab:selectedlabourCosts}),
       
    });
    console.log(response.status);
    if(response.status==200){
      Swal.fire(
        'Saved!',
        'Job has been saved.',
        'success'
      )
      // this.props.history.push('/serviceEstimate/add');
      this.clearForm();
    }else{
      Swal.fire(
        'Error!',
        'Job has not been saved.',
        'error'
      )
    }
    console.log(standardEstimate);
    console.log(selectedMaterialCosts);
    console.log(selectedlabourCosts);
   
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
      standardEstimate:this.emptyStandardEstimate,
      pcesthmt:this.emptyPcesthmt,
      idGroup:this.emptyIdGroup,
      materialCostList:[],
      labourCostList:[],
      searched:false,
      labourRates:[],
      filteredLabourRates:[],
      isLabourRates:false,
      filterLabourRates:'',
      filterOnLabourRates:'labourCode',
      currentPageOfLabourRates:0,
      selectedLabourCodes:[],
      selectedLabourCosts:[],
      materials:[],
      filteredMaterials:[],
      isMaterials:false,
      filterMaterials:'',
      filterOnMaterials:'matCode',
      currentPageOfMaterials:0,
      selectedMatCodes:[],
      selectedResCodes:[]
    })
  }
    
    nextStep = () => {
      if(this.state.idGroup.jobNo){
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

    
    render() {    
      return (
        <React.Fragment>
          <Container>
          <h1>Revise Job</h1>
          <br></br>
          <ul id="progressbar">
            <li className={this.state.isCompleted[0]+' '+this.state.isActive[0]} onClick={()=>this.goToStep(1)}>Applicant Details</li>
            <li className={this.state.isCompleted[1]+' '+this.state.isActive[1]} onClick={()=>this.goToStep(2)}>Connection Details</li>
            <li className={this.state.isCompleted[2]+' '+this.state.isActive[2]} onClick={()=>this.goToStep(3)}>Sketch</li>
            <li className={this.state.isCompleted[3]+' '+this.state.isActive[3]} onClick={()=>this.goToStep(4)}>Standard Estimate</li>
            <li className={this.state.isCompleted[4]+' '+this.state.isActive[4]} onClick={()=>this.goToStep(5)}>Meterial Costs</li>
            <li className={this.state.isCompleted[5]+' '+this.state.isActive[5]} onClick={()=>this.goToStep(6)}>Labour Costs</li>
          </ul>
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
            pcesthmt={this.state.pcesthmt}
            jobNoList={this.state.jobNoList}
            nextStep={this.nextStep}
            searched={this.state.searched}
            isParams={this.state.isParams}
          />
          <Step2 
            currentStep={this.state.currentStep} 
            wiringLandDetail={this.state.wiringLandDetail}
            standardEstimate={this.state.standardEstimate}
            handleChange={this.handleChangeStandardEstimate}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
          />
          <Step3 
            currentStep={this.state.currentStep} 
            handleChange={this.handleChangeStandardEstimate}
            standardEstimate={this.state.standardEstimate}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
          />
          <Step4 
            currentStep={this.state.currentStep} 
            standardEstimate={this.state.standardEstimate}
            pcesthmt={this.state.pcesthmt}
            handleChange={this.handleChangeStandardEstimate}
            getTotalCostForNBT={this.getTotalCostForNBT}
            getTotalCostForVAT={this.getTotalCostForVAT}
            getEstimatedTotalCost={this.getEstimatedTotalCost}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
          />
          <Step5 
            currentStep={this.state.currentStep} 
            materialCostList={this.state.materialCostList}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            materials={this.state.materials}
            filteredMaterials={this.state.filteredMaterials}
            isMaterials={this.state.isMaterials}
            getMaterials={this.getMaterials}          
            filterMaterials={this.state.filterMaterials}
            filterOnMaterials={this.state.filterOnMaterials}
            currentPageOfMaterials={this.state.currentPageOfMaterials}
            filterMaterialTable={this.filterMaterialTable}
            handleFilterMaterials={this.handleFilterMaterials}
            handleFilterOnMaterials={this.handleFilterOnMaterials}
            handlePageClickMaterials={this.handlePageClickMaterials}
            selectedMatCodes={this.state.selectedMatCodes}
            addToMaterialCosts={this.addToMaterialCosts}
            selectedResCodes={this.state.selectedResCodes}
            removeFromMaterialCosts={this.removeFromMaterialCosts}
            handleMaterialCostRow={this.handleMaterialCostRow}
          />
          <Step6 
            currentStep={this.state.currentStep} 
            labourCostList={this.state.labourCostList}
            prevStep={this.prevStep}
            idGroup={this.state.idGroup}
            labourRates={this.state.labourRates}
            filteredLabourRates={this.state.filteredLabourRates}
            isLabourRates={this.state.isLabourRates}
            getLabourRates={this.getLabourRates}
            filterLabourRates={this.state.filterLabourRates}
            filterOnLabourRates={this.state.filterOnLabourRates}
            currentPageOfLabourRates={this.state.currentPageOfLabourRates}
            filterLabourTable={this.filterLabourTable}
            handleFilterLabourRates={this.handleFilterLabourRates}
            handleFilterOnLabourRates={this.handleFilterOnLabourRates}
            handlePageClickLabourRates={this.handlePageClickLabourRates}
            selectedLabourCodes={this.state.selectedLabourCodes}
            addToLabourCosts={this.addToLabourCosts}
            selectedLabourCosts={this.state.selectedLabourCosts}
            removeFromLabourCosts={this.removeFromLabourCosts}
            handleLabourCostRow={this.handleLabourCostRow}
            handleSubmit={this.handleSubmit}
          />
          </div>
          
        </Container>
        </React.Fragment>
      );
    }
  }
  
  function Step1(props) {
    const {handleChange,idGroup,applicant, application, wiringLandDetail,jobNoList,pcesthmt,nextStep,status,toInputUppercase,searched,isParams}=props;
    console.log(isParams)
    if (props.currentStep !== 1) {
      return null
    } 
    return(
      <div>
         <div className="form-group row">
                <label for="jobNo" className="col-sm-2 col-form-label">Job Number</label>
                <div className="col-sm-3">
                  <select className="form-control" name="jobNo" id="jobNo" value={idGroup.jobNo}
                          onChange={handleChange} required>
                     <option value="">Please Select</option>

                           {
                               (jobNoList && jobNoList.length>0) && jobNoList.map((number)=>{
                                   return(<option value={number}>{number}</option>);
                               })
                           }
                  </select>
                </div>
                <div className="col-sm-5 col-form-label">Estimation Number : {pcesthmt.id.estimateNo}</div>
              </div> 
        <div className="form-group row">
          <div className="col-sm-5 col-form-label">Cost Center : {pcesthmt.id.deptId}</div>
          <div className="col-sm-4 col-form-label">Estimated Date : {pcesthmt.etimateDt}</div>
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
    </div>
    );
  }
  
  function Step2(props) {
    const {wiringLandDetail,standardEstimate,handleChange,nextStep,prevStep}=props;
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
                     checked={standardEstimate.wiringType==="Over Head"}  onChange={handleChange}/>
              <label className="form-check-label" for="overHead">Over Head</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="wiringType" id="underGround" value="Under Ground"
                     checked={standardEstimate.wiringType==="Under Ground"}  onChange={handleChange}/>
              <label className="form-check-label" for="underGround">Under Ground</label>
            </div>
          </div>
          <label for="cableType" className="col-sm-3 col-form-label">Cable Type</label>
          <div className="col-sm-3">
            <select className="form-control" name="cableType" id="cableType" value={standardEstimate.cableType}
                     onChange={handleChange}>
              <option value="">Please Select</option>
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
                     checked={standardEstimate.isLoopService==="Yes"}  onChange={handleChange}/>
              <label className="form-check-label" for="yes">Yes</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="isLoopService" id="no" value="No"
                     checked={standardEstimate.isLoopService==="No"}  onChange={handleChange}/>
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
            <Input type="number" name="serviceLength" id="serviceLength" value={standardEstimate.serviceLength}
                   min="0" step=".01" onChange={handleChange} required/>
          </div>
          <label for="lineLength" className="col-sm-3 col-form-label">Total Line Length(m)</label>
          <div className="col-sm-3">
            <Input type="number" name="lineLength" id="lineLength" value={standardEstimate.lineLength=(Number(standardEstimate.serviceLength)+Number(standardEstimate.conductorLength))}
                   min="0" step=".01" onChange={handleChange} required/>
          </div>
        </div>
        <div className="form-group row">
          <label for="conductorType" className="col-sm-3 col-form-label">Conductor Type</label>
          <div className="col-sm-3 col-form-label">
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="conductorType" id="ABC" value="ABC"
                     checked={standardEstimate.conductorType==="ABC"}  onChange={handleChange}/>
              <label className="form-check-label" for="ABC">ABC 3&#215;70+54.6mm<sup>2</sup></label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="conductorType" id="ABC2" value="ABC2"
                     checked={standardEstimate.conductorType==="ABC2"}  onChange={handleChange}/>
              <label className="form-check-label" for="ABC2">ABC 3&#215;95+70mm<sup>2</sup></label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="conductorType" id="FLY" value="FLY"
                     checked={standardEstimate.conductorType==="FLY"}  onChange={handleChange}/>
              <label className="form-check-label" for="FLY">FLY</label>
            </div>
          </div>
          <label for="conductorLength" className="col-sm-3 col-form-label">Conductor Wire Length(m)</label>
          <div className="col-sm-3">
            <Input type="number" name="conductorLength" id="conductorLength" value={standardEstimate.conductorLength}
                   min="0" step=".01" onChange={handleChange} />
          </div>
        </div>
        <div className="form-group row">
          <label for="insideLength" className="col-sm-3 col-form-label">Length Inside the Premises(m)</label>
          <div className="col-sm-3">
            <Input type="number" name="insideLength" id="insideLength" value={standardEstimate.insideLength}
                   min="0" step=".01" onChange={handleChange} required/>
          </div>
          <label for="secondCircuitLength" className="col-sm-3 col-form-label">Second Circuit Length(m)</label>
          <div className="col-sm-3">
            <Input type="number" name="secondCircuitLength" id="secondCircuitLength" value={standardEstimate.secondCircuitLength}
                   min="0" step=".01" onChange={handleChange} />
          </div>
        </div>
        <div className="form-group row">
          <label for="conversionLength" className="col-sm-3 col-form-label">1P-3P Line Conversion Length(m)</label>
          <div className="col-sm-3">
            <Input type="number" name="conversionLength" id="conversionLength" value={standardEstimate.conversionLength}
                   min="0" step=".01" onChange={handleChange} />
          </div>
          <label for="conversionLength2p" className="col-sm-3 col-form-label">2P-3P Line Conversion Length(m)</label>
          <div className="col-sm-3">
            <Input type="number" name="conversionLength2p" id="conversionLength2p" value={standardEstimate.conversionLength2p}
                   min="0" step=".01" onChange={handleChange} />
          </div>
        </div>
        <div className="form-group row">  
          <label for="span" className="col-sm-3 col-form-label">No of Spans(For Service Length)</label>
          <div className="col-sm-3">
            <Input type="number" name="span" id="span" value={standardEstimate.span} 
                   min="0" step=".01" onChange={handleChange} required/>
          </div>
          <label for="poleNo" className="col-sm-3 col-form-label">No of Poles</label>
          <div className="col-sm-3">
            <Input type="number" name="poleNo" id="poleNo" value={standardEstimate.poleNo} 
                  min="0" max="99" onChange={handleChange} />
          </div>
        </div>
        <div className="form-group row">   
          <label for="stayNo" className="col-sm-3 col-form-label">No of Stays</label>
          <div className="col-sm-3">
            <Input type="number" name="stayNo" id="stayNo" value={standardEstimate.stayNo} 
                  min="0" max="99" onChange={handleChange} />
          </div>
          <label for="strutNo" className="col-sm-3 col-form-label">No of Struts</label>
          <div className="col-sm-3">
            <Input type="number" name="strutNo" id="strutNo" value={standardEstimate.strutNo} 
                  min="0" max="99" onChange={handleChange} />
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
      // this.getTotalCostForNBT=this.getTotalCostForNBT.bind(this);
      // this.getTotalCostForVAT=this.getTotalCostForVAT.bind(this);
      // this.getEstimatedTotalCost=this.getEstimatedTotalCost.bind(this);
      this.handleBlur=this.handleBlur.bind(this);
    }
    // getTotalCostForNBT(){
    //   const standardEstimate=this.props.standardEstimate;
    //   const totalCostNBT= standardEstimate.fixedCost+standardEstimate.variableCost+
    //                   standardEstimate.processingFee +standardEstimate.otherMatCost+
    //                   standardEstimate.otherLabourCost+standardEstimate.capitalCost+standardEstimate.conversionCost;
    //   // Number(standardEstimate.fixedCost)+Number(standardEstimate.variableCost)
    //   // +Number(standardEstimate.processingFee)+Number(standardEstimate.fixedCost)
    //   // +Number(standardEstimate.otherMatCost)+Number(standardEstimate.otherLabourCost)+Number(standardEstimate.capitalCost)+Number(standardEstimate.conversionCost);

    //   return totalCostNBT;
    // }

    // getTotalCostForVAT(){
    //   const standardEstimate=this.props.standardEstimate;
    //   const totalCostVAT=this.props.getTotalCostForNBT()+standardEstimate.nbtAmount;
    //   return totalCostVAT;
    // }

    // getEstimatedTotalCost(){
    //   const standardEstimate=this.props.standardEstimate;
    //   const estimatedTotalCost=this.props.getTotalCostForVAT()+standardEstimate.taxAmount+standardEstimate.securityDeposit+standardEstimate.addlDeposit;
    //   return estimatedTotalCost;
    // }
    handleBlur(event){
    
      const target = event.target;
      const value = target.value;
      const name = target.name;
      let standardEstimate = this.props.standardEstimate;
      if(value){
        standardEstimate[name] = parseFloat(value).toFixed(2);
      }else{
        standardEstimate[name] =(0).toFixed(2);
      }
      this.setState({standardEstimate},()=>console.log(standardEstimate));
    }
    
    render() {    
      const {currentStep,standardEstimate,pcesthmt,nextStep,prevStep,handleChange,getTotalCostForNBT,getTotalCostForVAT,getEstimatedTotalCost}=this.props;  
     
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
            <Input type="text" name="catCd" id="catCd" value={pcesthmt.catCd} 
                   autoComplete="catCd" required/>
          </div>
        </div>
        
        <div className="form-group row">
          <label for="variableCost" className="col-sm-3 col-form-label">Variable Cost</label>
          <div className="col-sm-3">
            <Input type="number" name="variableCost" id="variableCost" value={(standardEstimate.variableCost!=null)?standardEstimate.variableCost.toFixed(2):(0).toFixed(2)} 
                   min="0" autoComplete="variableCost" className="text-right" readOnly/>
          </div>
          <label for="fundSource" className="col-sm-3 col-form-label">Fund Source & ID</label>
          <div className="col-sm-3">
            <Input type="text" name="fundSource" id="fundSource" value={pcesthmt.fundSource} 
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
            <Input type="number" name="matQty" id="matQty" value={getTotalCostForNBT().toFixed(2)} 
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
            <Input type="number" name="nbtPresent" id="nbtPresent" value={standardEstimate.nbtPresent} 
                   min="0" step=".01" onChange={handleChange} onBlur={(e)=>this.handleBlur(e)} autoComplete="nbtPresent" className="text-right" required/>
          </div>
          <span>%</span>
          {/* <div className="col-sm-3">
            &#215; {standardEstimate.nbtPresent.toFixed(2)} %
          </div> */}
        </div>
        <div className="form-group row">
          <label for="matQty" className="col-sm-3 col-form-label font-weight-bold">Total Cost for VAT</label>
          <div className="col-sm-3">
            <Input type="number" name="matQty" id="matQty" value={getTotalCostForVAT().toFixed(2)} 
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
            <Input type="number" name="taxPresent" id="taxPresent" value={standardEstimate.taxPresent} 
                   min="0" step=".01" onChange={handleChange} onBlur={(e)=>this.handleBlur(e)} autoComplete="taxPresent" className="text-right" required/>
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
          <label for="addlDeposit" className="col-sm-3 col-form-label">Addl Security Deposit</label>
          <div className="col-sm-3">
            <Input type="number" name="addlDeposit" id="addlDeposit" value={standardEstimate.addlDeposit} 
                   min="0" step=".01" onChange={handleChange} onBlur={(e)=>this.handleBlur(e)} autoComplete="addlDeposit" className="text-right" required/>
          </div>
        </div>
        <div className="form-group row">
          <label for="totalCost" className="col-sm-3 col-form-label font-weight-bold">Estimated Total Cost</label>
          <div className="col-sm-3">
            <Input type="number" name="totalCost" id="totalCost" value={standardEstimate.totalCost=getEstimatedTotalCost().toFixed(2)} 
                   min="0" autoComplete="totalCost" className="text-right" readOnly/>
          </div>
        </div>
        <div style={{color:'blue'}}>Variable cost is calculated using <b>{standardEstimate.isStandardVc=="Yes"?"Standard":"Non Standard"}</b> Method</div>
        <br></br>
        <div style={{color:'blue'}}>Estimated with <b>{pcesthmt.estimatedYear}</b> Standard Contruction Rates & <b>{pcesthmt.lbRateYear}</b> Labour Rates</div>

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
      this.handleCheckMaterials=this.handleCheckMaterials.bind(this);
      this.handleCheckMaterialCosts=this.handleCheckMaterialCosts.bind(this);

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

    handleCheckMaterials(matCode) {
      //this.setState({checked: !this.state.checked});
      const selectedMatCodes=this.props.selectedMatCodes;
      console.log(matCode);
      if(selectedMatCodes.includes(matCode)){
        for( var i = 0; i < selectedMatCodes.length; i++){ 
          if ( selectedMatCodes[i] === matCode) {
            selectedMatCodes.splice(i, 1); 
            break;
          }
       }
      }else{
        selectedMatCodes.push(matCode);
      }     
      this.setState({selectedMatCodes},()=>console.log(this.state.selectedMatCodes));      
    }
    
    handleCheckMaterialCosts(resCode) {
      //this.setState({checked: !this.state.checked});
      const selectedResCodes=this.props.selectedResCodes;
      console.log(resCode);
      if(selectedResCodes.includes(resCode)){
        for( var i = 0; i < selectedResCodes.length; i++){ 
          if ( selectedResCodes[i] === resCode) {
            selectedResCodes.splice(i, 1); 
            break;
          }
       }
      }else{
        selectedResCodes.push(resCode);
      }     
      this.setState({selectedResCodes},()=>console.log(this.state.selectedResCodes));      
    }

    render() {    
      const {currentStep,materialCostList,nextStep,prevStep,filteredMaterials,getMaterials,isMaterials,currentPageOfMaterials,
        handleFilterMaterials,handleFilterOnMaterials,handlePageClickMaterials,addToMaterialCosts,removeFromMaterialCosts,handleMaterialCostRow}=this.props;

      const materialCostTable = materialCostList.map(materialCost => {
      
        return <tr >
          <td style={{textAlign:'right'}}><input type="checkbox" class="form-check-input" onChange={()=>this.handleCheckMaterialCosts(materialCost.resCd)} 
              checked={this.props.selectedResCodes.includes(materialCost.resCd)}/></td>
          <td>{materialCost.resCd}</td>
          <td>{materialCost.resType}</td>
          <td>{materialCost.resCat}</td>
          <td>{materialCost.resName}</td>
          <td>{materialCost.uom}</td>
          <td className="text-right">{(materialCost.unitPrice!=null)?materialCost.unitPrice.toFixed(2):(0).toFixed(2)}</td>
          <td><Input type="number" className="text-right" name="estimateQty" value={(materialCost.estimateQty!=null)?materialCost.estimateQty:0} min="0" step=".01" onChange={(e)=>handleMaterialCostRow(materialCost,e)}/></td>
          <td className="text-right">{materialCost.estimateCost.toFixed(2)}</td>
          <td><Input type="number" className="text-right" name="fundQty" value={(materialCost.fundQty!=null)?materialCost.fundQty:0} min="0" step=".01" onChange={(e)=>handleMaterialCostRow(materialCost,e)}/></td>
          <td className="text-right">{materialCost.fundCost.toFixed(2)}</td>
          <td><Input type="number" className="text-right" name="customerQty" value={(materialCost.customerQty!=null)?materialCost.customerQty:0} min="0" step=".01" onChange={(e)=>handleMaterialCostRow(materialCost,e)}/></td>
          <td className="text-right">{materialCost.customerCost.toFixed(2)}</td>

          
        </tr>
      });

      const pageSize = 7;
      const pagesCount = Math.ceil(this.props.filteredMaterials.length / pageSize);
    
      const materialList = filteredMaterials.slice(currentPageOfMaterials*pageSize,
        (currentPageOfMaterials+1)*pageSize).map(material => {
        
        return <tr key={material[0]}>
          <td style={{textAlign:'right'}}><input type="checkbox" class="form-check-input" onChange={()=>this.handleCheckMaterials(material[0])} 
                     checked={this.props.selectedMatCodes.includes(material[0])}/></td>
          <td>{material[0]}</td>
          <td>{material[3]}</td>
          <td>{material[1]}</td>
          <td>{material[2]}</td>
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
              <th width="5%"></th>
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
                <td colspan="8" className="font-weight-bold text-right">Total Cost</td>
                <td className="text-right">{this.getTotalEstimateCost().toFixed(2)}</td>
                <td></td>
                <td className="text-right">{this.getTotalFundCost().toFixed(2)}</td>
                <td></td>
                <td className="text-right">{this.getTotalCustomerCost().toFixed(2)}</td>
              </tr>
            </tbody>
        </Table>
        <button className="btn btn-primary" type="button" onClick={removeFromMaterialCosts}>Remove Material Costs</button>
        <br></br>
        <br></br>
        <hr className="line"></hr>
        <button type="button" class="btn btn-link" onClick={getMaterials}>Add Other Materials</button>
        {(()=>{
          if(isMaterials){
            return(
              <div>
                <br></br>
                <div className="form-group row">
                  <label for="filterMaterials" className="col-sm-1 col-form-label">Filter</label>
                  <div className="col-sm-4">
                    <Input type="text" name="filterMaterials" id="filterMaterials" onChange={handleFilterMaterials} placeholder={(this.props.filterOnMaterials=='matCode')?'Search for Mat Codes':'Search for Mat Names'} value={this.props.filterMaterials}/>
                  </div>
                  <label for="filterOnMaterials" className="col-sm-2 col-form-label" style={{textAlign:'right'}}>Filter On</label>
                  <div className="col-sm-4 col-form-label">
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="filterOnMaterials" id="matCode" value="matCode"
                        checked={this.props.filterOnMaterials==="matCode"} onChange={handleFilterOnMaterials} required/>
                      <label className="form-check-label" for="matCode">Material Code</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="filterOnMaterials" id="matName" value="matName"
                        checked={this.props.filterOnMaterials==="matName"} onChange={handleFilterOnMaterials} />
                      <label className="form-check-label" for="matName">Material Name</label>
                    </div>
                  </div>
        
                </div>
                <div className="pagination-wrapper">
          
                  <Pagination aria-label="Page navigation example">
            
                    <PaginationItem disabled={currentPageOfMaterials <= 0}>
              
                      <PaginationLink
                        onClick={e => handlePageClickMaterials(e, currentPageOfMaterials - 1)}
                        previous
                        href="#"
                      />
              
                    </PaginationItem>

                    {[...Array(pagesCount)].map((page, i) => 
                      <PaginationItem active={i === currentPageOfMaterials} key={i}>
                        <PaginationLink onClick={e => handlePageClickMaterials(e, i)} href="#">
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    )}

                    <PaginationItem disabled={currentPageOfMaterials >= pagesCount - 1}>
              
                      <PaginationLink
                        onClick={e => handlePageClickMaterials(e, currentPageOfMaterials + 1)}
                        next
                        href="#"
                      />
              
                    </PaginationItem>
            
                  </Pagination>
                </div>

            
                <Table className="mt-4 table-bordered" id="materialsTable">
                  <thead>
                    <tr>
                      <th width="5%"></th>
                      <th width="15%">Material Code</th>
                      <th width="50%">Material Name</th>
                      <th width="15%">UOM</th>
                      <th width="15%">Unit Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {materialList}
                  </tbody>
                </Table>
                <button className="btn btn-primary" type="button" onClick={addToMaterialCosts}>Add to Material Costs</button>
              </div>
            )
          }    
          })()}
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
      // this.state={
      //   // labourRates:[],
      //   // currentPage:0,
      //   // isLabourRates:false,
      //   // filter:'',
      //   // filteredLabourRates:[],
      //   // filterOn:'labourCode',
        // selectedLabourCodes:this.props.selectedLabourCodes
      // }
      this.getTotalLabourHrs=this.getTotalLabourHrs.bind(this);
      this.getTotalcebLabourCost=this.getTotalcebLabourCost.bind(this);
      // this.getLabourRates=this.getLabourRates.bind(this);
      // this.handlePageClick=this.handlePageClick.bind(this);
      // this.handleFilter=this.handleFilter.bind(this);
      // this.filterLabourTable=this.filterLabourTable.bind(this);
      // this.handleFilterOn=this.handleFilterOn.bind(this);
      this.handleCheckLabourRates=this.handleCheckLabourRates.bind(this);
      this.handleCheckLabourCosts=this.handleCheckLabourCosts.bind(this);
      // this.addToLabourCosts=this.addToLabourCosts.bind(this);
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

    // handlePageClick(e, index) {
    //   e.preventDefault()
    //   this.setState({
    //     currentPageOfLabourRates: index
    //   });
      
    // }

    // async getLabourRates(){
    //     // labourRates=this.props.labourRates
    //     var year= new Date().getFullYear();
    //     // const labourRates = await (await fetch(`/labour/findByIdDeptIdAndIdYear?deptId=${this.props.idGroup.costCenter}&year=${year}`)).json();
    //     // this.setState({labourRates},()=>console.log(this.state.labourRates));
    //     await fetch(`/labour/findByIdDeptIdAndIdYear?deptId=${this.props.idGroup.costCenter}&year=${year}`)
    //     .then(response => response.json())
    //     .then(data => this.setState({labourRates: data,filteredLabourRates:data,isLabourRates:true},()=>console.log(this.state.labourRates)));
       

    // }
    // handleFilter(e){
    //   this.setState({filter:e.target.value,currentPage:0},()=>this.filterLabourTable())
    // }

    // handleFilterOn(e){
    //   // this.setState({filterOn:e.target.value, filter:'', filteredLabourRates:this.state.labourRates})
    //   this.setState({filterOn:e.target.value,currentPage:0},()=>this.filterLabourTable())

    // }

    // filterLabourTable(){
    //   console.log(this.state.filter)
    //   var filter,data, i;
    //   var filteredLabourRates=this.props.filteredLabourRates;
    //   filteredLabourRates=[]
    //   const {labourRates}=this.props;
    //   filter = this.state.filter.toUpperCase();
  
    //   for (i = 0; i < labourRates.length; i++) {
    //     if(this.state.filterOn=='labourCode'){
    //       data = labourRates[i].id.labourCode;
    //     }else{
    //       data = labourRates[i].description;
    //     }
        
    //     if (data.toUpperCase().indexOf(filter) > -1) {
    //       filteredLabourRates.push(labourRates[i]);
    //     } 
    //   }
    //   this.setState({filteredLabourRates})
    //   // console.log(filteredLabourRates);
    // }

    // handleCheck(indexOfLabour) {
    //   //this.setState({checked: !this.state.checked});
    //   const idxList=this.state.idxList;
    //   console.log(indexOfLabour);
    //   if(idxList.includes(indexOfLabour)){
    //     for( var i = 0; i < idxList.length; i++){ 
    //       if ( idxList[i] === indexOfLabour) {
    //         idxList.splice(i, 1); 
    //         break;
    //       }
    //    }
    //   }else{
    //     idxList.push(indexOfLabour);
    //   }     
    //   this.setState({idxList},()=>console.log(this.state.idxList));      
    // }

    handleCheckLabourRates(labourCode) {
      //this.setState({checked: !this.state.checked});
      const selectedLabourCodes=this.props.selectedLabourCodes;
      console.log(labourCode);
      if(selectedLabourCodes.includes(labourCode)){
        for( var i = 0; i < selectedLabourCodes.length; i++){ 
          if ( selectedLabourCodes[i] === labourCode) {
            selectedLabourCodes.splice(i, 1); 
            break;
          }
       }
      }else{
        selectedLabourCodes.push(labourCode);
      }     
      this.setState({selectedLabourCodes},()=>console.log(this.state.selectedLabourCodes));      
    }

    handleCheckLabourCosts(labourCode) {
      //this.setState({checked: !this.state.checked});
      const selectedLabourCosts=this.props.selectedLabourCosts;
      console.log(labourCode);
      if(selectedLabourCosts.includes(labourCode)){
        for( var i = 0; i < selectedLabourCosts.length; i++){ 
          if ( selectedLabourCosts[i] === labourCode) {
            selectedLabourCosts.splice(i, 1); 
            break;
          }
       }
      }else{
        selectedLabourCosts.push(labourCode);
      }     
      this.setState({selectedLabourCosts},()=>console.log(this.state.selectedLabourCosts));      
    }

    // addToLabourCosts(){
    //   const labourCostList=this.props.labourCostList;
    //   const {idxList,filteredLabourRates}=this.state;
    //   for(var i=0;i<idxList.length;i++){
    //     const labour=filteredLabourRates[idxList[i]];
    //     const labourCost={
    //       labourCode:labour.id.labourCode,
    //       activityDescription:labour.description,
    //       unitLabourHrs:labour.labourHours,
    //       cebUnitPrice:labour.unitPrice
    //     }
    //     labourCostList.push(labourCost);
    //   }
    //   this.setState({labourCostList});
    // }

    // addToLabourCosts(){
    //   const {labourCostList, labourRates}=this.props;
    //   var {selectedLabourCodes}=this.state;
    //   var isLabour=false;
    //   for(var i=0;i<labourRates.length;i++){
    //     if(selectedLabourCodes.includes(labourRates[i].id.labourCode)){
    //       console.log(labourRates[i].id.labourCode)
    //       for(var j=0;j<labourCostList.length;j++){
    //         console.log(labourCostList[j].labourCode);
    //         if(labourCostList[j].labourCode==labourRates[i].id.labourCode){
    //           console.log("equals");
    //           isLabour=true;
    //           break;
    //         }else{
    //           isLabour=false;
    //         }
    //       }
    //       if(isLabour==false){
    //         const labour=labourRates[i];
    //         const labourCost={
    //          labourCode:labour.id.labourCode,
    //          activityDescription:labour.description,
    //          unitLabourHrs:labour.labourHours,
    //          cebUnitPrice:labour.unitPrice
    //         }
    //         labourCostList.push(labourCost);
    //       }
    //     }
    //   }
    //   selectedLabourCodes=[];
    //   this.setState({labourCostList,selectedLabourCodes},()=>console.log(this.state.selectedLabourCodes));
    // }
    
    render() {    
      const {currentStep,labourCostList,prevStep,filteredLabourRates,getLabourRates,isLabourRates,currentPageOfLabourRates,handleFilterLabourRates,
        handleFilterOnLabourRates,handlePageClickLabourRates,addToLabourCosts,removeFromLabourCosts,handleLabourCostRow,handleSubmit}=this.props;
     
      const labourCostTable = labourCostList.map(labourCost => {
      
        return <tr>
          <td style={{textAlign:'right'}}><input type="checkbox" class="form-check-input" onChange={()=>this.handleCheckLabourCosts(labourCost.labourCode)} 
                     checked={this.props.selectedLabourCosts.includes(labourCost.labourCode)}/></td>
          <td>{labourCost.labourCode}</td>
          <td>{labourCost.activityDescription}</td>
          <td className="text-right">{(labourCost.unitLabourHrs!=null)?labourCost.unitLabourHrs:0}</td>
          <td className="text-right">{(labourCost.cebUnitPrice!=null)?labourCost.cebUnitPrice:0}</td>
          <td><Input type="number" className="text-right" name="itemQty" value={(labourCost.itemQty!=null)?labourCost.itemQty:0} min="0" step=".01" onChange={(e)=>handleLabourCostRow(labourCost,e)}/></td>
          <td className="text-right">{(labourCost.labourHours!=null)?labourCost.labourHours.toFixed(2):(0).toFixed(2)}</td>
          <td className="text-right">{(labourCost.cebLabourCost!=null)?labourCost.cebLabourCost.toFixed(2):(0).toFixed(2)}</td>
          
        </tr>
      });

      // const {currentPage} = this.state;
      const pageSize = 7;
      const pagesCount = Math.ceil(this.props.filteredLabourRates.length / pageSize);
    
      const labourList = filteredLabourRates.slice(currentPageOfLabourRates*pageSize,
        (currentPageOfLabourRates+1)*pageSize).map(labour => {
        
        return <tr key={[labour.id.labourCode,labour.id.deptId,labour.id.year]}>
          <td style={{textAlign:'right'}}><input type="checkbox" class="form-check-input" onChange={()=>this.handleCheckLabourRates(labour.id.labourCode)} 
                     checked={this.props.selectedLabourCodes.includes(labour.id.labourCode)}/></td>
          <td>{labour.id.labourCode}</td>
          {/* <td>{labour.labourName}</td>
          <td>{labour.applicationType}</td> */}
          <td>{labour.description}</td>
          <td>{labour.labourHours}</td>
          <td>{labour.unitPrice}</td>
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
              <th width="5%"></th>
              <th width="10%">Labour Code</th>
              <th width="30%">Description</th>
              <th width="10%">Unit Labour Hrs.</th>
              <th width="10%">Labour Rate</th>
              <th width="15%">Qty.</th>
              <th width="10%">Total Labour Hrs.</th>
              <th width="10%">Labour Cost</th>
            </tr>
            </thead>
            <tbody>
              {labourCostTable}
              <tr>
                <td colspan="6" className="font-weight-bold text-right">Total Cost</td>
                <td className="text-right">{this.getTotalLabourHrs().toFixed(2)}</td>
                <td className="text-right">{this.getTotalcebLabourCost().toFixed(2)}</td>
              </tr>
            </tbody>
        </Table>
        <button className="btn btn-primary" type="button" onClick={removeFromLabourCosts}>Remove Labour Costs</button>
        <br></br>
        <br></br>
        <hr className="line"></hr>
        <button type="button" class="btn btn-link" onClick={getLabourRates}>Add Other Labour Activities</button>
        {/* <br></br> */}
        {(()=>{
          if(isLabourRates){
            return(
              <div>
                <br></br>
                <div className="form-group row">
                  <label for="filterLabourRates" className="col-sm-1 col-form-label">Filter</label>
                  <div className="col-sm-4">
                    <Input type="text" name="filterLabourRates" id="filterLabourRates" onChange={handleFilterLabourRates} placeholder={(this.props.filterOnLabourRates=='labourCode')?'Search for Labour Codes':'Search for Description'} value={this.props.filterLabourRates}/>
                  </div>
                  <label for="filterOnLabourRates" className="col-sm-2 col-form-label" style={{textAlign:'right'}}>Filter On</label>
                  <div className="col-sm-4 col-form-label">
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="filterOnLabourRates" id="labourCode" value="labourCode"
                        checked={this.props.filterOnLabourRates==="labourCode"} onChange={handleFilterOnLabourRates} required/>
                      <label className="form-check-label" for="labourCode">Labour Code</label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input className="form-check-input" type="radio" name="filterOnLabourRates" id="description" value="description"
                        checked={this.props.filterOnLabourRates==="description"} onChange={handleFilterOnLabourRates} />
                      <label className="form-check-label" for="description">Description</label>
                    </div>
                  </div>
        
                </div>
                <div className="pagination-wrapper">
          
                  <Pagination aria-label="Page navigation example">
            
                    <PaginationItem disabled={currentPageOfLabourRates <= 0}>
              
                      <PaginationLink
                        onClick={e => handlePageClickLabourRates(e, currentPageOfLabourRates - 1)}
                        previous
                        href="#"
                      />
              
                    </PaginationItem>

                    {[...Array(pagesCount)].map((page, i) => 
                      <PaginationItem active={i === currentPageOfLabourRates} key={i}>
                        <PaginationLink onClick={e => handlePageClickLabourRates(e, i)} href="#">
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    )}

                    <PaginationItem disabled={currentPageOfLabourRates >= pagesCount - 1}>
              
                      <PaginationLink
                        onClick={e => handlePageClickLabourRates(e, currentPageOfLabourRates + 1)}
                        next
                        href="#"
                      />
              
                    </PaginationItem>
            
                  </Pagination>
                </div>

            
                <Table className="mt-4 table-bordered" id="labourRatesTable">
                  <thead>
                    <tr>
                      <th width="5%"></th>
                      <th width="15%">Labour Code</th>
                      {/* <th>Labour Name</th>
                      <th>Application Type</th> */}
                      <th width="50%">Description</th>
                      <th width="15%">Unit Labour Hrs.</th>
                      <th width="15%">Labour Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {labourList}
                  </tbody>
                </Table>
                <button className="btn btn-primary" type="button" onClick={addToLabourCosts}>Add to Labour Costs</button>
              </div>
            )
          }    
          })()}
        <br></br>
        <button className="btn btn-secondary" type="button" onClick={prevStep}>Previous</button>
        <button className="btn btn-success float-right" type="button" onClick={handleSubmit}>Submit</button>
      </React.Fragment>
      );
    }  
  
  }
export default JobRevise;
